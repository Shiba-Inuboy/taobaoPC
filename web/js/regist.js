; (function () {
    var $username = $('#username');
    var $password = $('#password');
    var $testPassword = $('#testPassword');
    var $usernameTips = $('#usernameTips');
    var $passwordTips = $('#passwordTips');
    var $testPasswordTips = $('#testPasswordTips');
    var $submitBtn = $('#submitBtn');
    var $usernameLock = false;
    var $passwordLock = false;
    // 验证用户名
    $username.blur(function () {
        // 获取用户输入的名字
        var $text = $username.val();
        if ($text === "") {
            $usernameTips.html("").css("");
        }
        var $reg = /^1[3456789]\d{9}$/;
        // 验证
        var $result = $reg.test($text);
        $usernameTips.html($result ? "" : "×手机号码格式错误").css($result ? { 'color': "" } : { 'color': "red" });
        if (!$result) {
            $usernameLock = false;
            return;
        }
        // 发送ajax请求 检查这个用户名是否可以使用
        $.ajax({
            url: "../../php/checkusername.php",
            data: {
                username: $text,
            },
            type: 'get',
            dataType: 'json',
            success(data) {
                if (!data.error) {
                    $usernameLock = true;
                    $usernameTips.html("√用户名可以使用").css({ 'color': "green" });
                } else {
                    $usernameLock = false;
                    $usernameTips.html("×用户名已存在").css({ 'color': "red" });
                }
            }
        })
    })
    // 验证密码
    $password.blur(function () {
        // 获取用户输入的密码
        var $val = $password.val();
        if ($val === "") {
            $passwordTips.html("").css("");
        }
        // 定义正则
        var $reg =/^[0-9a-zA-Z]{6,24}$/g;
        // 验证
        var $result = $reg.test($val);
        $passwordTips.html($result ? "√密码可以使用" : "×密码只能为6-24位的数字和字母").css($result ? { 'color': "green" } : { 'color': "red" });
    })
    $password.focus(function () {
        $testPassword.val("");
        $testPasswordTips.html("");
    })
    $testPassword.blur(function () {
        // 获取第一次输入的密码
        var $val = $password.val();
        // 获取第二次输入的密码
        var $val1 = $testPassword.val();
        if ($val1 === "") {
            testPasswordTips.html("").css("");
        }
        // 定义正则
        var $reg =/^[0-9a-zA-Z]{6,24}$/g;
        // 验证
        var $result = $reg.test($val1);
        if (!$result) {
            $passwordLock = false;
            $testPasswordTips.html("×密码只能为6-24位的数字和字母").css({ 'color': "red" });
            return;
        }
        $testPasswordTips.html($val === $val1 ? "√两次密码相同" : "×两次密码不一致！").css($val === $val1 ? { 'color': "green" } : { 'color': "red" });
        $passwordLock = $val === $val1;
    })
    $submitBtn.click(function () {
        if(!($usernameLock && $passwordLock)){
            alert("请重新检查用户名或密码");
            return
        }
        // 获取用户名
        var $user = $username.val();
        // 获取密码
        var $pass = $password.val();
        // 发送ajax到注册接口
        $.ajax({
            url: "../../php/regist.php",
            data: {
                username: $user,
                password: $pass
            },
            type: 'get',
            dataType: 'json',
            success(data) {
                if (!data.error) {
                    alert(data.msg);
                } else {
                    alert(data.msg);
                    setTimeout(function(){
                        location.href = "../html/login.html";
                    },500)
                }
            }
        })
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
        location.href = "./web/html/login.html";
    })
})();