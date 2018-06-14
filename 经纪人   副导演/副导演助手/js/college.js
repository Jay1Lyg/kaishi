/**
 * Created by Admin on 2017/7/3.
 */
$(function() {
    $(".font-color").blur(function(){
        var $thisOne=$(this).parent().prev();
//  	console.log($inputVal)
// 		console.log($(this))
        if($(this).val()===""){
  		console.log("不能为空")
            $thisOne.addClass('active');
            $thisOne.prev().removeClass('active');
        }else{
            // alert("kkk")
            $thisOne.removeClass('active');
            $thisOne.prev().addClass('active');
            $(".span-none").addClass('active');
            $(".font-color").css("color","black");
        }
    });
    $(".submit-save").click(function () {
        if($(".font-color").val()===""){
            console.log("没有填完");
        }else {
            $("form").submit();
        }

    });

})
