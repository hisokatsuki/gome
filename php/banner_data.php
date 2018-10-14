<?php
    header('content-type:text/html;charset=utf-8');
    include 'conn.php';
    // banner数据
    $result=mysql_query("select * from bannerimg");
    $bannerlist=array();
    for($i=0;$i<mysql_num_rows($result);$i++){
        $bannerlist[$i]=mysql_fetch_array($result,MYSQLI_ASSOC);
    }
    echo json_encode($bannerlist);
?>