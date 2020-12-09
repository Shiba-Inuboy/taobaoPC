<?php
header("content-type:text/html;charset=utf-8");
//定义参数
$keywords = $_GET["keywords"];
$conn = mysqli_connect("localhost","root","root","lwq");
  //过滤关键词左右空格
  $keyword = trim($keywords);
  if (empty($keyword)) {
		//如果关键词为空，则返回result=0
		echo "[{\"result\":\"0\"}]";
    }else{
	  $result = mysqli_query($conn,"SELECT * FROM goods WHERE cat_id like '%$keyword%'");
	  $num = mysqli_num_rows($result);
      if ($num) {
		$search_result = array();
          while($row = mysqli_fetch_array($result)){
              $search_result[] = $row;
          }
          // 将数组转成json格式
          echo json_encode($search_result);
  
  }else{
    //如果查询无果，则返回result=1
    echo "[{\"result\":\"1\"}]";
  }
}
?>