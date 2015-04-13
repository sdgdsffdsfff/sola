<?php
	header('Content-type:text/html;charset=UTF-8');
	session_start();

	class PassportTicket{
		public $encryptedTicket;
			function PassportTicket(){
		}
	}

	if(isset($_POST['ticket'])){
		$ticket = $_POST['ticket'];
	}

	if(isset($_POST['loginOut'])) {
		unset($_SESSION);
    	session_destroy();
    	$data['status']='1';
		$data['msg']="注销成功";
		echo(json_encode($data));
	} else {

		if(empty($ticket)){
			if(isset($_SESSION['user_info'])){
				$data['status']='2';
				$data['msg']="登录成功";
				$data['user_info']=$_SESSION['user_info'];
			}else {
				$data['status']='0';
				$data['msg']="参数错误";
			}

		}else{
			$et = new PassportTicket();
			$et->encryptedTicket = $ticket;
			// $mySoap = new SoapClient("http://10.14.12.5/services/passportservice.asmx?WSDL");
			$mySoap = new SoapClient("http://login.oa.com/Services/passportService.asmx?WSDL");
			$soapResult = $mySoap->DecryptTicket($et);

			if(!empty($soapResult->DecryptTicketResult)){
				$user_info[0] = $soapResult->DecryptTicketResult->StaffId;
				$user_info[1] = $soapResult->DecryptTicketResult->LoginName;
				$user_info[2] = $soapResult->DecryptTicketResult->ChineseName;
				$user_info[3] = $soapResult->DecryptTicketResult->DeptId;
				$user_info[4] = $soapResult->DecryptTicketResult->DeptName;
				$user_info[5] = 'http://dayu.oa.com/avatars/'.$user_info[1].'/profile.jpg';
				if($user_info[1] == 'markqin' || $user_info[1] == 'chandleryu' || $user_info[1] == 'jeannewoo') {
					$user_info[6] = 1;
				} else {
					$user_info[6] = 0;
				}
				$data['status']='1';
				$data['msg']="登录成功";
				$data['user_info']=$user_info;
				$_SESSION['user_info'] = $user_info;
			}

		}

		echo(json_encode($data));

	}

?>