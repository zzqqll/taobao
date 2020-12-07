<?php
 $username = $_POST['username'];
 $password = $_POST['password'];

 $link = mysqli_connect('127.0.0.1','root','root','bk2004');
 mysqli_query($link,'SET NAMES utf8');
 $sql = "SELECT * FROM `users` WHERE `username`=`$username` AND `password`=`$password`";
 $res = mysqli_query($link,$sql);//单独查询某一个
 $data = mysqli_fetch_all($res,MYSQLI_ASSOC);//获取数据
 mysqli_close($link)//关闭先前打开的数据库

if(count($data)){
    echo json_endcode(array(//php里的字符串转数组   (或者对象)
      "message" => "用户登录成功",
      'code' => 1,
      "nickname" => $data[0]['nickname']
    ));
}else{
    echo json_encode(array(
        "nessage" => "用户名密码错误",
        "code" => 0
    ));
}







>