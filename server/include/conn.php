<?php

include('config.php');

mysql_connect(DB_HOST,DB_USER,DB_PASS);
mysql_select_db(DB_NAME);

mysql_query("set character set 'utf8'");
mysql_query("set names 'utf8'");
 
?>