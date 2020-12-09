<?php
    header("content-type:text/html;charset=utf-8");
    $username = $_GET["username"];
    $password = $_GET["password"];
    $conn = mysqli_connect("localhost","root","root","lwq");
    $sql = "INSERT INTO user (username,password) VALUES ('$username','$password')";
    $result = mysqli_query($conn,$sql);
    if ($result) {
        echo json_encode(array('error' => 1, "msg" => "用户名注册成功"));
    } else {
        echo json_encode(array('error' => 0, "msg" => "用户名注册失败"));
    }
    
?>