/**
 * Created by Admin on 2017/6/30.
 */
$(function(){
    var $androidDialog2 = $('#androidDialog2');
	var $androidDialog1 = $('#androidDialog1');
	 var $actoring=$(".actoring");
	 var $actored=$(".actored");
	 var index=false;
    function black() {
        if($(".font-color").val()!=""){
            $(".span-none").addClass('active');
            $(".font-color").css("color","black");
            $(".imging").addClass('active');
            $(".imged").removeClass('active');
        }
        console.log('变色')
    }
    black()
    $('#dialogs').on('click', '.weui-dialog__btn', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });

    $('#showAndroidDialog2').on('click', function(){
        $androidDialog2.fadeIn(200);
    });
    $('#dialogss').on('click', '.weui-dialog__btn', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });

    $('#showAndroidDialog1').on('click', function(){
        $androidDialog1.fadeIn(200);
    });
    // 电影类型
    $(".moveType").bind("click","span",function(){
    	$(".moveType span").removeClass("actives");
    	$(this).addClass("actives");
    	$(".movebtn").click(function(){
            // $moveing.addClass('active');
            // $moved.removeClass('active');
    		$("#moveType").val($(".actives").html());
    	})
    });
	// 角色类型
    $(".actor-class").bind("click","span",function(){
    	// console.log($(".actor-class span"));
        $(".actor-class span").removeClass("actorshow");
        $(this).addClass("actorshow");
        $(".actor-btn").click(function(){
            $actoring.addClass('active');
            $actored.removeClass('active');
            $("#moveActor").val($(".actorshow").html());
        })
    })
    $(".font-color").blur(function(){
    	var $thisOne=$(this).parent().prev();
//  	console.log($inputVal)
// 		console.log($(this))
    	if($(this).val()===""){
//  		alert("不能为空")
    		$thisOne.addClass('active');
    		$thisOne.prev().removeClass('active');

    	}else{
    		$thisOne.removeClass('active');
    		$thisOne.prev().addClass('active');
            $(".span-none").addClass('active')
            $(".font-color").css("color","black")

    	}
    })
    $(".submit-save").click(function () {
        if($(".font-color").val()===""){
            console.log("没有填完");
            index=false;
        }else {
            $("form").submit();
            index=true
        }

    });


});
