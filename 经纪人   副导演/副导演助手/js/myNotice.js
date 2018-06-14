$(function () {
    $(".notice-tab").on("click",function(e){
        console.log("kk");
        if(!$(".notice-tab").hasClass("active")) {
            $(".notice-tab").removeClass("active");
            $(this).addClass("active");
            var $index = $(this).index();
            $(".notice-tab .imgIng").eq($index).addClass("disNone");
            $(".notice-tab .imgEd").eq($index).removeClass("disNone");
            $(".tabDown>div").removeClass("actives");
            $(".tabDown>div").eq($index).addClass("actives");
            e.stopPropagation()
        }
    });
    $.ajax({
        type : "get",
        url : "http://www.kaishiapp.com/WX/wx_allproductiontypes/1/null",
        dataType : "jsonp",
        // jsonp: "jsonpCallback",
        success : function(data){

            var dataOne=data;
            console.log(data);
            var str = $('.btnOne').html()
            for(var i=0;i<dataOne.length;i++){
                str += '<li class="btn" id="'+data[i].id+'">'+data[i].name+'</li>'
            }
            $('.btnOne').html(str)



        },
        error:function(){
            alert('fail');
        }
    });
    $.ajax({
        type : "get",
        url : "http://www.kaishiapp.com/WX/wx_allrolecategories/1/null",
        dataType : "jsonp",
        // jsonp: "jsonpCallback",
        success : function(data){
            var dataTwo=data;
            console.log(data);
            var str = $('.btnTwo').html();
            for(var i=0;i<dataTwo.length;i++){
                str += '<li class="btn" id="'+data[i].id+'">'+data[i].name+'</li>'
            }
            $('.btnTwo').html(str)
        },
        error:function(){
            alert('fail');
        }
    });

    // 全部
    var productiontype="null",
        rolecategory="null",
        area="null",
        isregistered="null",
        page=1,
        name="null",
        time=new Date();

    var url="http://www.kaishiapp.com/WX/wx_allpositions/";
    function ajaxEs () {
        $.ajax({
            type : "get",
            url : url+ productiontype +"/"+rolecategory+"/"+area+"/"+isregistered+"/"+page+"/"+name+"/"+time,
            dataType : "jsonp",
            // jsonp: "jsonpCallback",
            success : function(data){
                console.log(data)
                var All=data;

                var html = template('artTemplate', {
                        notices: All});
                $('.notice-small').html(html)
            },
            error:function(){
                alert('fail');
            }
        });

    }
    ajaxEs ();

    //项目类别
    $(".btnOne").on("click","li",function () {
        productiontype=$(this).attr("id");
        console.log(productiontype);
        ajaxEs ()
    });
    //人员需求
    $(".btnTwo").on("click","li",function () {
       rolecategory=$(this).attr("id");
        console.log(rolecategory);
        ajaxEs ()
    });
// 认证
    $(".btnThree").on("click","li",function () {
        isregistered=$(this).attr("id");
        console.log(isregistered);
        ajaxEs ()


    });
    $(document).click(function() {
        if($(".notice-tab").hasClass("active")){
            $(".imgEd").addClass("disNone");
            $(".imgIng").removeClass("disNone");
            $(".notice-tab").removeClass("active");
            $(".tabDown>div").removeClass("actives")
        }
    });

});
