<?php
    header('content-type:text/html;charset=utf-8');
    include 'conn.php';
    // 楼层其他tab页数据
    $result=mysql_query("select * from listimgs");
    $floorlist=array();
    for($i=0;$i<mysql_num_rows($result);$i++){
        $floorlist[$i]=mysql_fetch_array($result,MYSQLI_ASSOC);
    }
    echo json_encode($floorlist);
?>