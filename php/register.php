<?php
    header('content-type:text/html;charset=utf-8');
    include 'conn.php'; 
    if(isset($_POST['name']) || isset($_POST['submit'])){
        $name=@$_POST['name'];
    }else{
        exit('非法操作！');
    }
    $result=mysql_query("select * from userinfo where username='$name'");
    if(mysql_fetch_array($result)){ 
        echo true;
    }else{
        echo false;
    };
    if(isset($_POST['submit'])){
        $username=$_POST['username'];
        $password=sha1($_POST['password']);
        $mobile=$_POST['mobile'];
        mysql_query("insert userinfo values(null,'$username','$password','$mobile',NOW())");
        header('location:../src/index.html'); 
    }
?>