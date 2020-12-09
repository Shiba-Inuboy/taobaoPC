<?php
    header("content-type:text/html;charset=utf-8");
    $username = $_GET["username"];
    $conn = mysqli_connect("localhost","root","root","lwq");
    $sql = "SELECT * FROM user WHERE username = '$username'";
    $result = mysqli_query($conn,$sql);
    // 查询数据的条数
    $num = mysqli_num_rows($result);
    if ($num == 0) {
        echo json_encode(array('error' => 0, "msg" => "恭喜可以使用"));
    } else {
        echo json_encode(array('error' => 1, "msg" => "用户已存在"));
    }
    
?>