<?php
    header('content-type:text/html;charset=utf-8');
    include 'conn.php';
    // 详情页数据
    if(isset($_GET['sid'])){
        $sid=@$_GET['sid'];
    }
    $result=mysql_query("select * from listimgs where sid='$sid'");
    $detailslist=array();
    for($i=0;$i<mysql_num_rows($result);$i++){
        $detailslist[$i]=mysql_fetch_array($result,MYSQLI_ASSOC);
    }
    echo json_encode($detailslist);
?>