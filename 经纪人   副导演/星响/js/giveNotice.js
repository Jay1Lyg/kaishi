/**
 * Created by Admin on 2017/7/5.
 */


    $(".look-over").click(function () {
        var code=$("#start").attr("data-code");
        var production_name=$(".production_name").val();
        var category_id=$(".category_id").val();
        var areaCode=$(".areaCode").val();
        var production_companies=$(".production_companies").val();
        var iss_companies=$(".iss_companies").val();
        var account=$(".account").val();
        var date=$(".date").val();

        if($(".actorData").val()===""){
            console.log("没有填完");
            alert("没有完善信息")

        }else {

            // $.ajax({
            //     type:"post",
            //     url:"http://www.kaishiapp.com/WX/wx_publishpositionInfo",
            //     data:JSON.stringify( {
            //         "production_name":production_name,
            //         "category_id":category_id,
            //         "areaCode":areaCode,
            //         "code":code,
            //         "production_companies":production_companies,
            //         "iss_companies":iss_companies,
            //         "account":account,
            //         "date":date
            //     }),
            //     dataType:"jsonp",
            //     processData:false,
            //     contentType:"application/json",
            //     success : function(data){
            //         console.log("hjgds")
            //     },error: function(xhr, type){
            //         alert('Ajax error!')
            //     }
            // });
            // $.ajax({
            //     type: 'POST',
            //     url: 'http://www.kaishiapp.com/WX/wx_publishpositionInfo',
            //     data: JSON.stringify({
            //         "production_name":production_name,
            //         "category_id":category_id,
            //         "areaCode":areaCode,
            //         "code":code,
            //         "production_companies":production_companies,
            //         "account":account,
            //         "iss_companies":iss_companies,
            //         "date":date
            //     }),
            //     processData: false,
            //     contentType: 'application/json',
            //     dataType: 'jsonp'
            // }).then(function(ret){
            //     alert(ret);
            // });
            $(window).attr('location','http://www.jb51.net');
         }
    });
    $(".production_name").blur(function () {
         $(".actor-data").html($(".production_name").val());
    });


