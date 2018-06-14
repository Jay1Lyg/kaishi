/**
 * Created by Admin on 2017/7/10.
 */
    var phone=$("#phone").val();
    var password=$("#pasd").val();
    var hash=hex_md5(password);
    console.log(hash)
    var isPhone = 1;

    function getCode(e){
        checkPhone(); //验证手机号码
        pasw()      //验证密码

        if(isPhone){
            resetCode(); //倒计时

            $.ajax({
                type : "post",
                url : "http://www.kaishiapp.com/WX/SMSverification",
                dataType : "jsonp",
                data : {
                    telephone:phone,
                    password:hash
                },
                success : function(data){
                    console.log(data)
                }
            });
        }else{
            $('#phone').focus();
        }

    };
    function checkPhone(){
        var phone = $('#phone').val();
        var pattern = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/;
        isPhone = 1;
        if(phone == '') {
            alert('请输入手机号码');
            isPhone = 0;
            return;
        }
        if(!pattern.test(phone)){
            alert('请输入正确的手机号码');
            isPhone = 0;
            return;
        }
    }
//倒计时
    function resetCode(){
        $('#J_getCode').hide();
        $('#J_second').html('60');
        $('#J_resetCode').show();
        var second = 60;
        var timer = null;
        timer = setInterval(function(){
            second -= 1;
            if(second >0 ){
                $('#J_second').html(second);
            }else{
                clearInterval(timer);
                $('#J_getCode').show();
                $('#J_resetCode').hide();
            }
        },1000);
    };
function pasw () {
    var pasd = $('#pasd').val();
    var pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,16})$/;
    isPhone = 1;
    if(pasd == '') {
        alert('请输入密码');
        isPhone = 0;
        return;
    }
    if(!pattern.test(pasd)){
        alert('6-16位，字幕数字混合');
        isPhone = 0;
        return;
    }

};


