"use strict";!function(){var t=location.href;localStorage.setItem("url",t);var c=JSON.parse(localStorage.getItem("cart"))||[],n=$("#table"),e=$("#compute");function o(){var t=c.every(function(t){return t.isChecked});n.html('\n        <thead class="thead-dark">\n                  <tr class="d-flex">\n                    <th scope="col" class="col-2"><input class="all-check" '+(t?"checked":"")+'  type="checkbox"></th>\n                    <th scope="col" class="col-4">商品名称</th>\n                    <th scope="col" class="col-2">商品数量</th>\n                    <th scope="col" class="col-2">商品价格</th>\n                    <th scope="col" class="col-2">操作</th>\n                  </tr>\n                </thead>\n                <tbody>\n        '),c.length?n.append(c.map(function(t){return'\n            <tr class="d-flex">\n            <th scope="row" class="col-2"><input class="single-check" data_goodsId = "'+t.goods_id+'" '+(t.isChecked?"checked":"")+' type="checkbox"></th>\n            <td class="col-4">\n                <p class="text-truncate">\n                    <a href="./detail.html#'+t.goods_id+'">'+t.goods_name+'</a>\n                </p>\n            </td>\n            <td class="col-2">'+t.cart_number+'</td>\n            <td class="col-2">￥'+t.goods_price+'</td>\n            <td class="col-2">\n                <button type="button" data-goodsId='+t.goods_id+' class="btn btn-outline-info cartIncrease">+</button>\n                <button type="button" data-goodsId='+t.goods_id+' class="btn btn-danger cartDel" >删除</button>\n                <button type="button" data-goodsId='+t.goods_id+' class="btn btn-outline-info cartDecrease">-</button>\n            </td>\n          </tr>\n            '})):(n.append("去买点东西吧亲<a href='../../index.html'>选购</a>"),$(".all-check").removeAttr("checked")),n.append("</tbody>")}function a(){var t=c.filter(function(t){return t.isChecked}).reduce(function(t,n){return n.goods_price*n.cart_number+t},0);e.html('\n        <div class="col-4 d-flex">\n        <label class="text-danger">总计:</label><p class="text-secondary">￥'+t+'元</p>\n    </div>\n    <div class="col-3 d-flex justify-content-around">\n    <button type="button" class="btn btn-dark">清空购物车</button>\n      <button type="button" class="btn btn-dark">结算</button>\n      </div>\n        ')}n.on("click",".cartDel",function(){var n=$(this).attr("data-goodsId"),t=c.findIndex(function(t){return t.goods_id===n});c.splice(t,1),localStorage.setItem("cart",JSON.stringify(c)),a(),o()}),n.on("click",".cartIncrease",function(){var n=$(this).attr("data-goodsId");c.find(function(t){return t.goods_id===n}).cart_number++,localStorage.setItem("cart",JSON.stringify(c)),a(),o()}),n.on("click",".cartDecrease",function(){var n=$(this).attr("data-goodsId"),t=c.find(function(t){return t.goods_id===n});if(t.cart_number--,0===t.cart_number){var e=c.findIndex(function(t){return t.goods_id===n});c.splice(e,1),localStorage.setItem("cart",JSON.stringify(c)),a(),o()}localStorage.setItem("cart",JSON.stringify(c)),a(),o()}),n.on("change",".all-check",function(){var e=this;$.each(c,function(t,n){n.isChecked=e.checked,o(),a()})}),n.on("click",".single-check",function(){var n=$(this).attr("data_goodsId");c.find(function(t){return t.goods_id===n}).isChecked=this.checked,o(),a()}),o(),a();var s=$("#logina");if($.cookie("isLogin")){var l=JSON.parse(localStorage.getItem("username"));s.html('<a class="text-danger">'+l+'欢迎你</a><a class="data_btn">退出</a>')}$(".data_btn").click(function(){$.removeCookie("isLogin",{path:"/"}),alert("退出成功"),s.html('<a href="./web/html/login.html" class="activeColor">亲,请登录</a>\n    <a href="./web/html/regist.html">免费注册</a>'),localStorage.removeItem("username"),localStorage.removeItem("url"),location.href="./login.html"})}();