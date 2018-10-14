<?php
    header('content-type:text/html;charset=utf-8');
    include 'conn.php';
    // 楼层第一个tab页数据
    $result4=mysql_query("select * from selection_hot");
    $floorfirst=array();
    for($i=0;$i<mysql_num_rows($result4);$i++){
        $floorfirst[$i]=mysql_fetch_array($result4,MYSQLI_ASSOC);
    }
	echo json_encode($floorfirst);
?>