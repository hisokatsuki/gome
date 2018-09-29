<?php
    header('content-type:text/html;charset=utf-8');
    define('USERNAME','root');
    define('PASSWORD','');
    define('HOST','localhost');
    $conn=@mysql_connect(HOST,USERNAME,PASSWORD);
    if(!$conn){
        die('数据库连接失败'.mysql_error());
    }
    mysql_select_db('gome');
    mysql_query('set names utf8');
?>