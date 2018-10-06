<?php
    header('content-type:text/html;charset=utf-8');
    include 'conn.php';
    $result1=mysql_query("select * from imgsinfo where type='countdown'");
    $countdown=array();
    for($i=0;$i<mysql_num_rows($result1);$i++){
        $countdown[$i]=mysql_fetch_array($result1,MYSQLI_ASSOC);
    }
    $result2=mysql_query("select * from magnifier");
    $magnifier=array();
    for($i=0;$i<mysql_num_rows($result2);$i++){
        $magnifier[$i]=mysql_fetch_array($result2,MYSQLI_ASSOC);
    }
    class jdata{

	}
	
	$gome=new jdata();//实例化对象
	//给成员赋值。
	$gome->countdown=$countdown;
	$gome->magnifier=$magnifier;
	// $gome->subnavlist=$subnavlist;
	echo json_encode($gome);
?>