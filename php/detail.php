<?php
// 当前接口用于返回一条商品信息
    header("content-type:text/html;charset=utf-8");
    $shopId = $_GET["shopId"];
    $conn = mysqli_connect("localhost","root","root","lwq");
    $sql = "SELECT * FROM goods WHERE goods_id='$shopId'";
    $result = mysqli_query($conn,$sql);

    // 抽取一条数据
    $obj = mysqli_fetch_assoc($result);
    if($obj){
        echo json_encode(array("error"=>1,"data"=>$obj));
    }else{
        echo json_encode(array("error"=>0,"data"=>"没有该条数据"));
    }
?>