/**
 * Created by Admin on 2017/7/7.
 */
$(function(){
    $('.container-tab').on('click', function () {
        $(this)
            .children('p')
            .addClass('tab-active')
            .parent()
            .siblings('div')
            .children('.tab-active')
            .removeClass('tab-active');
        var $index = $(this).index();
        $(".contain-page>div")
            .eq($index)
            .addClass("page-select")
            .siblings('.page-select')
            .removeClass("page-select");
    });
});
window.onload=function(){
    $(".one").on("click","div",function (){
        var $this=$(this);
        first=$(this).index();
        console.log(first)
        console.log($this.children("img").attr("src"));
        if($this.children("img").attr("src")===""){
        }else{
            console.log("重新上传");
            wxchooseImage1()
        }
    })
};