; (function () {
    var $prevBrn = $('#prevBtn');
    var $nextBtn = $('#nextBtn');
    var $list = $('#body-list');
    var $shoppingInfoArr = [];
    var $logina = $('#logina');
    function sendAjax(page) {
        $.ajax({
            url: "./php/getGoodsInfo.php",
            data: {
                page: page,
                num: 55
            },
            type: 'get',
            dataType: 'json',
            success(data) {
                if (!data.error) {
                    $shoppingInfoArr = data.data;
                    var $context = '';
                    $.each(data.data, function (index, value) {
                        $context += `
                       <div class="card cartColor" style="width: 236px;height:368px;border: 1px solid #f2f2f2;">
                       <a href="./web/html/detail.html#${value.goods_id}" style="text-decoration: none;">
                       <img src="${value.goods_small_logo}"" class="card-img-top cardimg" style="width: 198px;height: 198px;margin:18px 18px 0 18px;">
                       </a>
                       <div class="card-body">
                       <a href="./web/html/detail.html#${value.goods_id}" style="text-decoration: none;">
                           <h5 class="card-title text-truncate" style="font-size: 14px;color: #9b9b9b;">${value.goods_name}</h5>
                           <p style="font-size: 18px;color: #fd3f31;">￥${value.goods_price}</p>
                           </a>
                           <p style="font-size: 12px;color: #9b9b9b;border-bottom:1px solid #f2f2f2;padding-bottom:8px;";><svg style="margin-right:5px;" class="icon" aria-hidden="true">
                           <use xlink:href="#iconqijiandian1"></use></svg>小凌旗舰店</p>
                           <p class="float-left jrCart" style="font-size: 20px;margin-top:-15px!important;" data-goodsId="${value.goods_id}" >
                           <a href="javascript:;"><svg class="icon" aria-hidden="true"><use xlink:href="#iconche1"></use></svg></a>
                           </p>
                           <p class="float-right" style="font-size: 12px;color: #9b9b9b;line-height:5px">月销 ${value.goods_number}</p>
                       </div>
                   </div>
                       `
                    })
                    $list.html($context);
                }
            },
        })
    }
    var $page = Math.floor(Math.random() * 12);
    sendAjax($page);
    $prevBrn.click(function () {
        $nextBtn.removeAttr("disabled");
        if ($page === 0) {
            $prevBrn.attr("disabled", "true");
            return
        }
        $page--;
        sendAjax($page);
    })
    $nextBtn.click(function () {
        $prevBrn.removeAttr("disabled");
        if ($page === 12) {
            $nextBtn.attr("disabled", "true");
            return
        }
        $page++;
        sendAjax($page);
    })
    $list.on("click", '.jrCart', function () {
        var $goodsId = $(this).attr("data-goodsId");
        var $shoppingInfo = $shoppingInfoArr.find(function (value) {
            return value.goods_id === $goodsId;
        })
        // 第一件事情 把当前页面所显示的商品的详细信息放入本地存储
        // 把本地存储的内容取出来
        var $shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];
        // 先看看数据是否存在数组中 如果存在只需要数量加1 不在 再往里放
        var $isExist = $shoppingCart.find(function (value) {
            return value.goods_id === $shoppingInfo.goods_id;
        })
        if ($isExist) {
            $isExist.cart_number++;
        } else {
            $shoppingInfo.cart_number = 1
            // 把数组往数组里存进去
            $shoppingCart.push($shoppingInfo);
        }
        // // 再把数组存回本地存储
        localStorage.setItem("cart", JSON.stringify($shoppingCart));
    })
    $('#list-c').mouseenter(function () {
        $('#list-c').show();
    })
    $('#ulcontent,#list-c').mouseleave(function () {
        $('#list-c').hide();
    })
    $('#ulcontent>li').mouseenter(function () {
        $('#list-c').show();
        var index = $(this).index();
        $('.list-content1').eq(index).removeClass('selected').siblings('div').addClass('selected');
    })
    $(function(){
        $("#mhbtn").click(function(){
            var inputVal = $("#keywords").val();
            $.ajax({
                type:"GET",
                url:"./php/search.php?keywords=" + inputVal,
                dataType:"json",
                success:function(data){
                    localStorage.setItem("cat_id",JSON.stringify(data));
                    if($("#keywords").val() !== ""){
                        location.href = "./web/html/search.html";
                    }
                    
                    // $(function(){
                    //     var con="";
                    //     var arr = []
                    //     $.each(data,function(i,value){
                    //         console.log();
                    //         if (value.result == "0") {
                    //             con+="<p>请输入关键词...</p>"
                    //         }else if(value.result == "1"){
                    //             con+="<p>无结果</p>"
                    //         }else{
                    //             con+="<p>"+value.goods_name+"</p>"
                    //         }
                    //     });
                    //         $("#search_result").html(con);
                    // })
                    // return false; 
                }
            })
        })
    })


    var isLogin = $.cookie("isLogin");
    if (isLogin) {
        var user = JSON.parse(localStorage.getItem("username"));
        $logina.html(`<a class="text-danger">${user}欢迎你</a><a class="data_btn">退出</a>`)
    }

    $('.data_btn').click(function() {
        $.removeCookie('isLogin',{ path: '/'});
        alert("退出成功")
    $logina.html(`<a href="./web/html/login.html" class="activeColor">亲,请登录</a>
    <a href="./web/html/regist.html">免费注册</a>`)
        localStorage.removeItem("username");
        localStorage.removeItem("url");
        location.href = "./web/html/login.html";
    })
})();