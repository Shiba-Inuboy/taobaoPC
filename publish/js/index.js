"use strict";!function(){var t=$("#prevBtn"),e=$("#nextBtn"),a=$("#body-list"),n=[],o=$("#logina");function i(t){$.ajax({url:"./php/getGoodsInfo.php",data:{page:t,num:55},type:"get",dataType:"json",success:function(t){if(!t.error){n=t.data;var o="";$.each(t.data,function(t,e){o+='\n                       <div class="card cartColor" style="width: 236px;height:368px;border: 1px solid #f2f2f2;">\n                       <a href="./web/html/detail.html#'+e.goods_id+'" style="text-decoration: none;">\n                       <img src="'+e.goods_small_logo+'"" class="card-img-top cardimg" style="width: 198px;height: 198px;margin:18px 18px 0 18px;">\n                       </a>\n                       <div class="card-body">\n                       <a href="./web/html/detail.html#'+e.goods_id+'" style="text-decoration: none;">\n                           <h5 class="card-title text-truncate" style="font-size: 14px;color: #9b9b9b;">'+e.goods_name+'</h5>\n                           <p style="font-size: 18px;color: #fd3f31;">￥'+e.goods_price+'</p>\n                           </a>\n                           <p style="font-size: 12px;color: #9b9b9b;border-bottom:1px solid #f2f2f2;padding-bottom:8px;";><svg style="margin-right:5px;" class="icon" aria-hidden="true">\n                           <use xlink:href="#iconqijiandian1"></use></svg>小凌旗舰店</p>\n                           <p class="float-left jrCart" style="font-size: 20px;margin-top:-15px!important;" data-goodsId="'+e.goods_id+'" >\n                           <a href="javascript:;"><svg class="icon" aria-hidden="true"><use xlink:href="#iconche1"></use></svg></a>\n                           </p>\n                           <p class="float-right" style="font-size: 12px;color: #9b9b9b;line-height:5px">月销 '+e.goods_number+"</p>\n                       </div>\n                   </div>\n                       "}),a.html(o)}}})}var s=Math.floor(12*Math.random());if(i(s),t.click(function(){e.removeAttr("disabled"),0!==s?i(--s):t.attr("disabled","true")}),e.click(function(){t.removeAttr("disabled"),12!==s?i(++s):e.attr("disabled","true")}),a.on("click",".jrCart",function(){var e=$(this).attr("data-goodsId"),o=n.find(function(t){return t.goods_id===e}),t=JSON.parse(localStorage.getItem("cart"))||[],a=t.find(function(t){return t.goods_id===o.goods_id});a?a.cart_number++:(o.cart_number=1,t.push(o)),localStorage.setItem("cart",JSON.stringify(t))}),$("#list-c").mouseenter(function(){$("#list-c").show()}),$("#ulcontent,#list-c").mouseleave(function(){$("#list-c").hide()}),$("#ulcontent>li").mouseenter(function(){$("#list-c").show();var t=$(this).index();$(".list-content1").eq(t).removeClass("selected").siblings("div").addClass("selected")}),$(function(){$("#mhbtn").click(function(){var t=$("#keywords").val();$.ajax({type:"GET",url:"./php/search.php?keywords="+t,dataType:"json",success:function(t){localStorage.setItem("cat_id",JSON.stringify(t)),""!==$("#keywords").val()&&(location.href="./web/html/search.html")}})})}),$.cookie("isLogin")){var r=JSON.parse(localStorage.getItem("username"));o.html('<a class="text-danger">'+r+'欢迎你</a><a class="data_btn">退出</a>')}$(".data_btn").click(function(){$.removeCookie("isLogin",{path:"/"}),alert("退出成功"),o.html('<a href="./web/html/login.html" class="activeColor">亲,请登录</a>\n    <a href="./web/html/regist.html">免费注册</a>'),localStorage.removeItem("username"),localStorage.removeItem("url"),location.href="./web/html/login.html"})}();