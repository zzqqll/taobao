<?php
$username = $_POST['username'];
$password = $_POST['password'];

$link = mysqli_connect('127.0.0.1','root','root','bk2004');
mysqli_query($link,'SET NAMES utf8');
// mysql_query($link, "set names 'utf8'");
$app = "SELECT * FROM `users` WHERE `username` ='$username'";
// mysqli_select_db('bk2004')


// $sql = "insert into bk2004 (id,username,password,nickname)  values(null,'$Id','$userName','$password','$nickname')";
$res = mysqli_query($link,$app);
if (!$res){
        echo mysqli_error($link);
}
$row = mysqli_fetch_assoc($res);

if($row){
//   echo '{"type":"error", "message":"用户名重复"}';

}else{
    $sql = " INSERT INTO `users` values(null,'$username','$password',null)";
$res = mysqli_query($link,$sql);

if(!$res){
    echo mysqli_error($link);
}else{
    echo '{"type":"success","message":"注册成功"}';
}
}

// echo "添加一条记录";
echo json_encode(array(
    // "message" => "添加一条记录",
    "code" => 1,
  ));
 //关闭连接

// mysql_close($link)

?>