<?php
    header("content-type:text/html;charset=utf-8");
    $page = $_GET["page"];
    $num = $_GET["num"];
    $conn = mysqli_connect("localhost","root","root","lwq");
    $skipNum = $page * $num;
    $sql = "SELECT * FROM goods limit $skipNum,$num";
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result) == 0){
        echo json_encode(array("error"=>1,"data"=>"没有数据了"));
    }else{
    // 把查询出来的都放入数组

        $arr = mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo json_encode(array("error"=>0,"data"=>$arr));
    }

?>