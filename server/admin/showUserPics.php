<?php
error_reporting(0);
	header('Content-type:text/html;charset=UTF-8');
	
	include('../include/conn.php');

	$data = array();
	$data['files'] = array();
	

	if(isset($_GET['user'])){
		$user = $_GET['user'];
		$files_result = mysql_query("SELECT * FROM files WHERE user='$user' ORDER BY id DESC " );
	} else {
		$files_result = mysql_query("SELECT * FROM files ORDER BY id DESC " );
	}

	$files_result_rows = mysql_num_rows($files_result);

	if($files_result_rows>0) {
		for($i=0; $i<$files_result_rows; $i++){
			$row = mysql_fetch_array($files_result);

			if(sprintf("%.2f", $row['size']/(1000*1000))<1) {
				$f_size = sprintf("%.2f", $row['size']/1000).'KB';
			}else {
				$f_size = sprintf("%.2f", $row['size']/(1000*1000)).'MB';
			}

			$file['size'] = $f_size;
			$file['user'] = $row['user'];
			$file['name'] = $row['name'];
			$file['time'] = date('Y-m-d H:i:s',$row['time']);
			array_push($data['files'],$file);
		}
	}

	echo(json_encode($data));


	
?>