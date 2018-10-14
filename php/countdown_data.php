<?php
    header('content-type:text/html;charset=utf-8');
    include 'conn.php';
    // 美日必抢数据
    $result=mysql_query("select * from imgsinfo where type='countdown'");
    $countdown=array();
    for($i=0;$i<mysql_num_rows($result);$i++){
        $countdown[$i]=mysql_fetch_array($result,MYSQLI_ASSOC);
    }
    echo json_encode($countdown);
?>