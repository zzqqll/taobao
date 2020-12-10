<?php
//查询数据库，找到有多少种分类就可以了
$link = mysqli_connect('localhost','root','root','bk2004');
mysqli_query($link,'SET NAMES utf8');
//把数据库里面的数据cat_one_id 这个字段进行分类
//把每一条数据值拿出第一条
$sql = "SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id`";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

//返回结果给前端
echo json_encode(array(
  "message" => "获取一类分类列表成功",
  "code" => 1,
  "list" => $data
));
?>