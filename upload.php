<?php

include('server/include/config.php');

// sleep(3);
session_start();

$options = array(
    'delete_type' => 'POST',
    'db_host' => DB_HOST,
    'db_user' => DB_USER,
    'db_pass' => DB_PASS,
    'db_name' => DB_NAME,
    'db_table' => DB_TABLE
);

ini_set('display_errors', '0');
error_reporting(E_ALL | E_STRICT);
require('server/UploadHandler.php');


class CustomUploadHandler extends UploadHandler {

	/* 随机数 */
    private function random_no() {
        $chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ';
        $length = 10;
        $max_i = strlen($chars)-1;
        $rand_value = '';
        for ($i=0;$i<$length;$i++)
        {
            $rand_value .= $chars{mt_rand(0,$max_i)};
        }
           return $rand_value;
    }


    /* 更改文件名 */
    protected function trim_file_name($name, $type) {
        $name = parent::trim_file_name($name, $type);
        $ext_index = strrpos($name, '.');
        $ext = substr($name, $ext_index);
        $name = date("YmdHis").'_'.$this->random_no().$ext;
        return $name;
    }

    /* 文件名数据库存储 start */
    protected function initialize() {
    	$this->db = new mysqli(
    		$this->options['db_host'],
    		$this->options['db_user'],
    		$this->options['db_pass'],
    		$this->options['db_name']
    	);
        parent::initialize();
        $this->db->close();
    }

     protected function handle_form_data($file, $index) {
    	$file->title = @$_REQUEST['title'][$index];
        $file->description = @$_REQUEST['description'][$index];
        $file->user = $_SESSION['user_info'][1];
        $file->time = time();
        $file->original_name = $this->get_file_name_param();
        $file->category = @$_REQUEST['category'][$index];
    	// $file->time = date("Y-m-d H:i:s");
    }

    protected function handle_file_upload($uploaded_file, $name, $size, $type, $error,
            $index = null, $content_range = null) {
        $file = parent::handle_file_upload(
        	$uploaded_file, $name, $size, $type, $error, $index, $content_range
        );
        if (empty($file->error)) {
			$sql = 'INSERT INTO `'.$this->options['db_table']
				.'` (`name`, `size`, `type`, `title`, `description`, `user`, `time`, `original_name`, `category`)'
				.' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
	        $query = $this->db->prepare($sql);
	        $query->bind_param(
	        	'sisssssss',
	        	$file->name,
	        	$file->size,
	        	$file->type,
	        	$file->title,
                $file->description,
                $file->user,
                $file->time,
                $file->original_name,
	        	$file->category
	        );
	        $query->execute();
	        $file->id = $this->db->insert_id;
        }
        return $file;
    }

    /*protected function set_additional_file_properties($file) {
        parent::set_additional_file_properties($file);
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        	$sql = 'SELECT `id`, `type`, `title`, `description`, `user`, `time` FROM `'
        		.$this->options['db_table'].'` WHERE `name`=?';
        	$query = $this->db->prepare($sql);
 	        $query->bind_param('s', $file->name);
	        $query->execute();
	        $query->bind_result(
	        	$id,
	        	$type,
	        	$title,
                $description,
                $user,
	        	$time
	        );
	        while ($query->fetch()) {
	        	$file->id = $id;
        		$file->type = $type;
        		$file->title = $title;
                $file->description = $description;
                $file->user = $user;
        		$file->time = $time;
    		}
        }
    }*/

    /*public function delete($print_response = true) {
        $response = parent::delete(false);
        foreach ($response as $name => $deleted) {
        	if ($deleted) {
	        	$sql = 'DELETE FROM `'
	        		.$this->options['db_table'].'` WHERE `name`=?';
	        	$query = $this->db->prepare($sql);
	 	        $query->bind_param('s', $name);
		        $query->execute();
        	}
        }
        return $this->generate_response($response, $print_response);
    } */
    /* 文件名数据库存储 end */

}

$upload_handler = new CustomUploadHandler($options);