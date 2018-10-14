<?php
    header('content-type:text/html;charset=utf-8');
    include 'conn.php';
    $result=mysql_query("select * from listimgs");
    $cartdata=array();
    for($i=0;$i<mysql_num_rows($result);$i++){
        $cartdata[$i]=mysql_fetch_array($result,MYSQLI_ASSOC);
    }
    echo json_encode($cartdata);
?>