; (function () {
    var $shopId = location.hash.slice(1);
    var $content = $('#content');
    var $shoppingInfo = null;
    $.ajax({
        url: "../../php/detail.php",
        data: {
            shopId: $shopId
        },
        type: 'get',
        dataType: 'json',
        success(data) {
            $shoppingInfo = data.data;
            $content.html(`
            <figure class="figure col-4">
            <div class="mirror-left">
            <img style="width:350px;height:350px" src="${data.data.goods_big_logo}" alt="">
            <div class="glass"></div>
            </div>
            <div class="mirror-right"><img style="width:800px;height:800px" src="${data.data.goods_big_logo}" alt=""></div>
            <figcaption class="figure-caption text-left" style="margin-left:20px;">收藏宝贝</figcaption>
            </figure>
        <div class="col-8 cdetail">
            <h3 class="detail-title">${data.data.goods_name}</h3>
            <div class="d-flex justify-content-between align-items-center datail-price">
                <div class="bgl">
                    <span>价格</span>
                    <strong>
                        <i>￥</i>
                        <i>${data.data.goods_price}</i>
                    </strong>
                </div>
            </div>
            <p class="discount"><span>优惠</span><span>淘金币可抵 <em>${(Math.random() + 1).toFixed(2)}</em> 元</span></p>
            <p class="distribution"><span>配送</span> <span>江苏南通</span> <i>至</i> <span>广东广州</span> <span>快递
                    免运费</span> <i>付款后48小时内发货</i></p>
            <p class="dnumber"><span>数量</span> <span>100件(库存${data.data.goods_number}件)</span></p>
            <div class="pabtn">
                <button class="purchase">立即购买</button>
                <button class="addCart">加入购物车</button>
            </div>
        </div>
        <script>
        var $glass = $('.glass');
            var $mirrorLeft = $('.mirror-left');
            var $mirrorRight = $('.mirror-right');
            var $mirrorRightImg = $('.mirror-right img');
            $mirrorLeft.mouseenter(function(){
                $glass.show();
                $mirrorRight.show();
            })
            $mirrorLeft.mousemove(function(e){
                var x = e.pageX - $mirrorLeft.offset().left - $glass.width() / 2;
                var y = e.pageY - $mirrorLeft.offset().top - $glass.width() / 2;
                var maskMax = $mirrorLeft.width() - $glass.width();
                var bigpicMax = $mirrorRightImg.width() - $mirrorRight.width();
                if (x < 0) {
                    x = 0;
                } else if (x > maskMax) {
                    x = maskMax
                }
                if (y < 0) {
                    y = 0;
                } else if (y > maskMax) {
                    y = maskMax
                }
                $glass.css({
                    left: x,
                    top: y
                })
                $mirrorRightImg.css({
                    left: -x / (maskMax / bigpicMax),
                    top: -y / (maskMax / bigpicMax)
                })
            })
            $mirrorLeft.mouseleave(function(){
                $glass.hide();
                $mirrorRight.hide();
            })
        </script>
            `);
        },
    })
    // 因为事件还未生成 所以用委托模式来绑定事件
    // 减少事件数量 预言未来元素
    // 减少内层泄露
    $content.on("click",'.addCart',function(){
        // 第一件事情 把当前页面所显示的商品的详细信息放入本地存储
        // 把本地存储的内容取出来
        var $shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log($shoppingCart);
        var $isExist = $shoppingCart.find(function(value){
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
        localStorage.setItem("cart",  JSON.stringify($shoppingCart));
        // 第二件事情 跳转到购物车页面
        location.href = "./shopping.html";
    })
    var $logina = $('#logina');
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
        location.href = "./login.html";
    })
})();