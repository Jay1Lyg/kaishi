/**
 * Created by Admin on 2017/7/26.
 */
$(function(){
    $('.nav-tab').on('click', function () {
        $(this)
            .addClass('tab-active')
            .siblings('div')
            .removeClass('tab-active');
        var $index = $(this).index();
        console.log($index)
        $(".manage-main>div")
            .eq($index)
            .addClass("main-select")
            .siblings('.main-select')
            .removeClass("main-select");
    });


var user_id="597b3046be4dee926aa36652";
var url ="http://www.kaishiapp.com/WX/wx_searchapplyposition/";
var first=1;
var currentPage=1;
var time=new Date();
$('.nav-tab').on('click', function () {
    $(this)
        .addClass('tab-active')
        .siblings('div')
        .removeClass('tab-active');
    var $index = $(this).index();
    var index = $(this).index()+1;
    $(".manage-main>div")
        .eq($index)
        .addClass("main-select")
        .siblings('.main-select')
        .removeClass("main-select");
    $.ajax({
        type : "get",
        url : url+user_id+"/"+currentPage+"/"+index+"/"+time,
        dataType : "jsonp",
        // jsonp: "jsonpCallback",
        success : function(data){
            var All=data;
            $(".none_div").css("display","none")
            if(All.length==""){
                $(".none_div").css("display","block")
            }else{
                if(index==1){
                    $('.main-contain').empty();
                    var str = $('.main-contain').html();
                    for(var i=0;i<All.length;i++){
                        str+='<div class="All"><div class="all_delivery"> <p>《'+All[i].crews_name+'》<span class="border_delivery">'+All[i].category+'</span><span class="time_delivery">'+All[i].registration_date+'</span></p> </div> <div class="fen_delivery"> <p>角色/职位： <span>'+All[i].role_name+'</span></p> <p>见组地址： <span>'+All[i].address_name+'</span></p> </div> <div class="delivery_ed"> <p class="is_receive'+All[i].is_receive+'"></p> </div> <div class="hui" style="width: 100%;height: 10px;background: #eee;clear: both"></div> </div>'
                    }
                    $('.main-contain').html(str);
                    $(".is_receive1").html("【面试邀约】");
                    $(".is_receive0").html("【投递成功】");
                    $(".is_receive2").html("【不合适】");
                }else if(index==2){
                    $('.main-interview').empty();
                    var str1 = $('.main-interview').html();
                    for(var i=0;i<All.length;i++){
                        str1+='<div class="All"><div class="all_delivery"> <p>《'+All[i].crews_name+'》 <span class="border_delivery">'+All[i].category+'</span><span class="time_delivery">'+All[i].registration_date+'</span></p> </div> <div class="fen_delivery"> <p>角色/职位： <span>'+All[i].role_name+'</span></p> <p>见组地址： <span>'+All[i].address_name+'</span></p> </div> <div class="delivery_ed"> <p class="is_receive">【面试邀约】</p> </div> <div class="hui" style="width: 100%;height: 10px;background: #eee;clear: both"></div> </div>'
                    }
                    $('.main-interview').html(str1);
                }else if(index==3){
                    $('.main-pase').empty();
                    var str2 = $('.main-pase').html();
                    for(var i=0;i<All.length;i++){
                        str2+='<div class="All"><div class="all_delivery"> <p>《'+All[i].crews_name+'》 <span class="border_delivery">'+All[i].category+'</span><span class="time_delivery">'+All[i].registration_date+'</span></p> </div> <div class="fen_delivery"> <p>角色/职位： <span>'+All[i].role_name+'</span></p> <p>见组地址： <span>'+All[i].address_name+'</span></p> </div> <div class="delivery_ed"> <p class="is_receive">【不合适 】</p> </div> <div class="hui" style="width: 100%;height: 10px;background: #eee;clear: both"></div> </div>'
                    }
                    $('.main-pase').html(str2);
                }
            }
            console.log(All);
        },
        error:function(){
            alert('fail');
        }
    });
});
$.ajax({
    type : "get",
    url : url+user_id+"/"+currentPage+"/"+first+"/"+time,
    dataType : "jsonp",
    // jsonp: "jsonpCallback",
    success : function(data){
        var All=data;
        console.log(All)
        $('.main-contain').empty();
        var str = $('.main-contain').html();
        for(var i=0;i<All.length;i++){
            str+='<div class="All"><div class="all_delivery"> <p>《'+All[i].crews_name+'》 <span class="border_delivery">'+All[i].category+'</span><span class="time_delivery">'+All[i].registration_date+'</span></p> </div> <div class="fen_delivery"> <p>角色/职位： <span>'+All[i].role_name+'</span></p> <p>见组地址： <span>'+All[i].address_name+'</span></p> </div> <div class="delivery_ed"> <p class="is_receive'+All[i].is_receive+'">【投递成功】</p> </div> <div class="hui" style="width: 100%;height: 10px;background: #eee;clear: both"></div> </div>'
        }
        $('.main-contain').html(str);
        $(".is_receive1").html("【面试邀约】");
        $(".is_receive0").html("【投递成功】");
        $(".is_receive2").html("【不合适】");
    },
    error:function(){
        alert('fail');
    }
});
})