<?php
error_reporting(0);
	header('Content-type:text/html;charset=UTF-8');
	
	include('../include/conn.php');

	$data = array();
	$user_data = array();
	$data['users_info'] = array(
		'name' => '',
		'count' => ''
	);
	
	$user_array = array();
	$user_result = mysql_query("SELECT user FROM files" );
	$user_result_rows = mysql_num_rows($user_result);

	if($user_result_rows>0) {
		for($i=0; $i<$user_result_rows; $i++){
			$user_row = mysql_fetch_array($user_result);
			array_push($user_array,$user_row[0]);
		}
		$user_data = array_values(array_unique($user_array));
	}

	for($i=0; $i<count($user_data); $i++){
		$user = $user_data[$i];
		$result = mysql_query("SELECT * FROM files WHERE user='$user' ORDER BY id DESC " );
		$rows = mysql_num_rows($result);
		$data['users_info'][$i]['name'] = $user;
		$data['users_info'][$i]['count'] = $rows;
	}


	$files_result = mysql_query("SELECT * FROM files ORDER BY id DESC " );
	$files_result_rows = mysql_num_rows($files_result);
	$data['files_length'] = $files_result_rows;
	$data['user_length'] = count($user_data);

	echo(json_encode($data));

?>