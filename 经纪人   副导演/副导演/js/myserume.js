/**
 * Created by Admin on 2017/6/30.
 */
$(function () {
    var index=false;
        $(".actorData").on("blur",function () {
            if($(".actorData").val()==="") {
                console.log("不能为空");
            }else if($(".actorData").val()===""){
                $(".actorData").addClass("font-color")
            }
        });
        $(".submit-save").on("click",function () {
            if($(".actorData").val()!=""&&$(".font-color").val()!=""){
                alert("kkk");
                $(".submit-save").addClass("save")
                $("#form").submit();

                index=true;
            }else {
                console.log("没有填完");
                alert("没有完善信息")
            }
        });
    $(".add-college").on( "click",function () {
        if(index){

                window.location.href="college.html";


        }else{
            console.log("没有保存");
            alert("没有保存")
        }

    });
    $(".add-live").on("click",function () {
         if($(".submit-save").hasClass('save')){
            window.location.href="myserume2.html";
        }else{
            console.log("没有保存");
            alert("没有保存")
        }

    })
    console.log($.fn.cookie("userId"));

});

