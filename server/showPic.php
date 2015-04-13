<?php
	header('Content-type:text/html;charset=UTF-8');
	
	include('include/conn.php');

	$data_array = array();
	$data_array['files'] = array();

	if(isset($_POST['user'])){
		$user = $_POST['user'];
	}

	if(isset($_POST['datePicker'])){
		$datePicker = $_POST['datePicker'];
	}
	if(isset($_POST['startDate'])){
		$startDate = strtotime($_POST['startDate']);
	}
	if(isset($_POST['endDate'])){
		$endDate = strtotime($_POST['endDate']);
	}

	

	if($user) {

		if($datePicker == '1') {
			$result = mysql_query("SELECT * FROM files WHERE user='$user' AND time >= $startDate AND time <= $endDate ORDER BY id DESC" );
		} else {
			$result = mysql_query("SELECT * FROM files WHERE user='$user' ORDER BY id DESC" );
		}

		$result_rows = mysql_num_rows($result);

		if($result_rows>0) {

			for($i=0; $i<$result_rows; $i++){
				$row = mysql_fetch_array($result);

				if(sprintf("%.2f", $row['size']/(1000*1000))<1) {
					$f_size = sprintf("%.2f", $row['size']/1000).'KB';
				}else {
					$f_size = sprintf("%.2f", $row['size']/(1000*1000)).'MB';
				}

				$file['size'] = $f_size;
				$file['user'] = $row['user'];
				$file['name'] = $row['name'];
				$file['time'] = date('Y-m-d H:i:s',$row['time']);
				$file['type'] = ereg_replace('.+\.','',$file['name']);
				array_push($data_array['files'],$file);
			}

		}

		echo(json_encode($data_array));
	}


	
?>