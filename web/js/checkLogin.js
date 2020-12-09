;(function(){
    // 进行登录判定
    var isLogin = $.cookie("isLogin");
    if (!isLogin) {
        // 如果没有登录就跳转回登录页面
        location.href = "./login.html";
    }
})();