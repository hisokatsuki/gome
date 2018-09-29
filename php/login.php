<?php
    include 'conn.php';
    // 判断传送过来的用户名和密码是否存在
    if(isset($_POST['name']) && isset($_POST['pass'])){
        $name=$_POST['name'];
        $pass=sha1($_POST['pass']);
    }else{
        exit('非法操作！');
    };
    $result=mysql_query("select * from userinfo where username='$name' and password='$pass'");
    if(mysql_fetch_array($result)){ //用户名存在数据库
        echo true;
    }else{
        echo false;
    };
?>