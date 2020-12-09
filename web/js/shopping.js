; (function () {
    var url = location.href;
    localStorage.setItem("url",url)
    var $shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];
    var $table = $('#table');
    var $compute = $('#compute');
    function render() {
        // 检查shoppingCart数组中每一个对象是否都有isChecked属性
        var isAllChecked = $shoppingCart.every(function (value) {
            return value.isChecked;
        })
        // console.log(isAllChecked);
        // 渲染表头头部分
        $table.html(`
        <thead class="thead-dark">
                  <tr class="d-flex">
                    <th scope="col" class="col-2"><input class="all-check" ${isAllChecked ? "checked" : ""}  type="checkbox"></th>
                    <th scope="col" class="col-4">商品名称</th>
                    <th scope="col" class="col-2">商品数量</th>
                    <th scope="col" class="col-2">商品价格</th>
                    <th scope="col" class="col-2">操作</th>
                  </tr>
                </thead>
                <tbody>
        `)
        if ($shoppingCart.length) {
            // 渲染购物车的数据
            $table.append($shoppingCart.map(function (value) {
                return `
            <tr class="d-flex">
            <th scope="row" class="col-2"><input class="single-check" data_goodsId = "${value.goods_id}" ${value.isChecked ? "checked" : ""} type="checkbox"></th>
            <td class="col-4">
                <p class="text-truncate">
                    <a href="./detail.html#${value.goods_id}">${value.goods_name}</a>
                </p>
            </td>
            <td class="col-2">${value.cart_number}</td>
            <td class="col-2">￥${value.goods_price}</td>
            <td class="col-2">
                <button type="button" data-goodsId=${value.goods_id} class="btn btn-outline-info cartIncrease">+</button>
                <button type="button" data-goodsId=${value.goods_id} class="btn btn-danger cartDel" >删除</button>
                <button type="button" data-goodsId=${value.goods_id} class="btn btn-outline-info cartDecrease">-</button>
            </td>
          </tr>
            `}))
        } else {
            $table.append("去买点东西吧亲<a href='../../index.html'>选购</a>");
            $('.all-check').removeAttr("checked");
        }
        $table.append(`</tbody>`);
    }
    // 定义一个计算价格的方法
    function count() {
        var $price = $shoppingCart.filter(function (value) {
            return value.isChecked;
        }).reduce(function (pre, value) {
            return value.goods_price * value.cart_number + pre;
        }, 0)
        $compute.html(`
        <div class="col-4 d-flex">
        <label class="text-danger">总计:</label><p class="text-secondary">￥${$price}元</p>
    </div>
    <div class="col-3 d-flex justify-content-around">
    <button type="button" class="btn btn-dark">清空购物车</button>
      <button type="button" class="btn btn-dark">结算</button>
      </div>
        `)
    }
    // 删除
    //  $table.click(function(){
    //      console.log(1);
    //  })
    $table.on("click", ".cartDel", function () {
        // 把本地存储中的数据也同时删掉
        var $goodsId = $(this).attr("data-goodsId");
        var $index = $shoppingCart.findIndex(function (value) {
            return value.goods_id === $goodsId;
        })
        $shoppingCart.splice($index, 1);
        // 将修改的数据重新放回本地存储
        localStorage.setItem("cart", JSON.stringify($shoppingCart));
        count()
        render();
    })
    // 增加
    $table.on("click", ".cartIncrease", function () {
        var $goodsId = $(this).attr("data-goodsId");
        var $goods = $shoppingCart.find(function (value) {
            return value.goods_id === $goodsId;
        })
        $goods.cart_number++;
        localStorage.setItem("cart", JSON.stringify($shoppingCart));
        count()
        render();
    })
    // 减少
    $table.on("click", ".cartDecrease", function () {
        var $goodsId = $(this).attr("data-goodsId");
        var $goods = $shoppingCart.find(function (value) {
            return value.goods_id === $goodsId;
        })
        $goods.cart_number--;
        if ($goods.cart_number === 0) {
            var $index = $shoppingCart.findIndex(function (value) {
                return value.goods_id === $goodsId;
            })
            $shoppingCart.splice($index, 1);
            // 将修改的数据重新放回本地存储
            localStorage.setItem("cart", JSON.stringify($shoppingCart));
            count()
            render();
        }
        localStorage.setItem("cart", JSON.stringify($shoppingCart));
        count()
        render();
    })
    // 全选绑定事件
    $table.on("change", ".all-check", function () {
        $.each($shoppingCart, (index,value)=> {
            value.isChecked = this.checked;
            render();
            count();
        })
    })
    // 单选
    $table.on("click", ".single-check", function () {
            // 找到对应的id
            var $goods_id = $(this).attr("data_goodsId");
            // 根据id去购物车数组中找对应的对象
            var $goods = $shoppingCart.find(function (value) {
                return value.goods_id === $goods_id;
            })
            // 修改状态
            // $goods.attr("isChecked",'checked');
            $goods.isChecked = this.checked;
            // 重新渲染
            render();
            count();
    })
    render()
    count();
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