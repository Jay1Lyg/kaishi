/**
 * Created by Admin on 2017/7/11.
 */
/**
 * Created by Admin on 2017/7/10.
 */


var index=true;
var flag=true;
function checkPhone(){
    var phone = $('#phone').val();
    var pattern = /^1[0-9]{10}$/;
    if(phone == '') {
        alert('请输入手机号码');
        index=false

    }
    if(!pattern.test(phone)){
        alert('请输入正确的手机号码');
        index=false;
    }
}
//倒计时
function pa () {
    if($("#pa").val().length<6){
        alert("密码长度不能小于6位");
        flag=false;
    }
}

// function setCookie(){ //设置cookie    
//
//     var loginCode = $("#phone").val(); //获取用户名信息    
//     var pwd = $("#pa").val(); //获取登陆密码信息   
//     var userId;
//         $.fn.cookie("login_code",loginCode,{ path: '/', expires: 10000 });//调用jquery.cookie.js中的方法设置cookie中的用户名    
//         $.fn.cookie("pwd",pwd,{ path: '/', expires: 10000});//调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密    
//         $.fn.cookie("userId",userId,{ path: '/', expires: 10000});
// }
// 登录
function signIn(){
    checkPhone(); //验证手机号码
    pa() ;   //验证密码
    if(index&&flag){
        var loginCode = $("#phone").val(); //获取用户名信息    
        var pwd = $("#pa").val(); //获取登陆密码信息 
        // var url=!{JSON.stringify(url)};
        $.ajax({
            url: 'http://www.kaishiapp.com/WX/wx_signin',
            data: {
                phone:loginCode,
                password:pwd,
                // url:url
            },
            type: "post",
            dataType: "text",
            success: function (data) {
                console.log(typeof data);
                var userId=data.id;
                //添加cookie 
                $.fn.cookie("userId",userId,{ path: '/', expires: 10000});

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求失败");
            }
        });
    };
};
