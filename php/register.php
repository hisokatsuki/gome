<?php
    header('content-type:text/html;charset=utf-8');
    // 引入数据库连接
    include 'conn.php'; 
    // 第一次失去焦点，能够获取name值
    // 第二次点击注册按钮时，第二次发送请求，没有发送name值。
    // 添加@进行容错
    if(isset($_POST['username']) || isset($_POST['submit'])){
        $name=@$_POST['username'];
    }else{
        exit('非法操作');
    }
    $result=mysql_query("select username from userinfo where username='$name'");
    if(mysql_fetch_array($result)){ //有重复的用户名
        echo true;
    }else{
        echo false;
    };
    // 判断是否点击注册，通过name值来获取数据，然后添加到数据库中
    if(isset($_POST['submit'])){
        $username=$_POST['username'];
        $password=sha1($_POST['password']);
        $mobile=$_POST['mobile'];
        mysql_query("insert userinfo values(null,'$username','$password','$mobile',NOW())");
        header('location:../login.html'); //跳转到登录页面
    }
?>