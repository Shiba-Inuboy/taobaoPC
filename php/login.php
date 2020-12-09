<?php
    header("content-type:text/html;charset=utf-8");
    $username = $_GET["username"];
    $password = $_GET["password"];
    $conn = mysqli_connect("localhost","root","root","lwq");
    $sql = "SELECT * FROM user WHERE username='$username' and password='$password'";
    $result = mysqli_query($conn,$sql);
    $num = mysqli_num_rows($result);
    if($num == 0){
        echo json_encode(array('error' => 0, "msg" => "用户名或密码错误"));
    }else{
        // setcookie
        setcookie($username,"2",time()+3600,"/");
        setcookie("isLogin","1",time()+3600,"/");
        echo json_encode(array('error' => 1, "msg" => "登录成功"));
    }
    
?>