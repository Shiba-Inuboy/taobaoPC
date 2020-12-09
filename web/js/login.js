; (function () {
    // 密码登录
    $('#psw').click(function () {
        $('#phoneregister').hide();
        $('#register,.ftp,.ftu').show();
        $('#msg').removeClass('psw-active');
        $('#psw').addClass('psw-active');
    })
    // 短信登录
    $('#msg').click(function () {
        $('#phoneregister').show();
        $('#psw').removeClass('psw-active');
        $('#msg').addClass('psw-active');
        $('#register,.ftp,.ftu').hide();
    })
    $('#loginBtn').click(function () {
        var $user = $('#username').val();
        var $pass = $('#password').val();
        if ($user === "" || $pass === "") {
            alert("请输入用户名或者密码")
            return;
        }
        localStorage.setItem("username", JSON.stringify($user));
        $.ajax({
            url: "../../php/login.php",
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
                    alert(data.msg)
                    setTimeout(function () {
                        location.href = "../../index.html";
                        // location.href = localStorage.getItem("url") || "../../index.html";
                    }, 500)
                }

            },
        })
    })
})();