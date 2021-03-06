"use strict";

/***  裁剪图片转出base64  ** */
function cutImg(opt){
    /*得到裁剪起点*/
    var $img = $('[data-img=cut]'),img = $img[0],
        $cover = $('.cover'),
        /*得到压缩的倍率n*/
        natWid = img.naturalWidth,        
        nowWid = $img.width(),       
        n = natWid/nowWid, 
        cutHeight = $cover.height(),       
        cutWidth = $cover.width(),   
        canvas = document.createElement("canvas");   
    //varEnd       
    canvas.width = cutWidth*opt;
    canvas.height = cutHeight*opt;
    var ctx = canvas.getContext("2d");
    var sx=  -parseFloat($img.css('left')),sy = -parseFloat($img.css('top'));
    ctx.drawImage($img[0], sx*n, sy*n,cutWidth*n,cutHeight*n,0,0,cutWidth*opt,cutHeight*opt);
    //ctx.drawImage(img,sx,sy,cutWidth,cutHeight,x,y,width,height);
    var dataURL = canvas.toDataURL("image/jpeg");
    /*根据是否传参来确实是否压缩*/
    var ded = $.Deferred();    
    if(opt==1||opt==undefined){
        ded.resolve(dataURL);
    }else{
        changeBase64(dataURL,opt).then(function(data){
            ded.resolve(data);
        })
    }
    return ded.promise();
}//.then((data)=>{base64})

/*** 上传原图 ***/


/*** 压缩并发送图片
 *  **   src:图片地址 url:AJAX地址 dataK:AJAX中的data  ** */ 
function sendMSG(src,url,dataK,opt){
    var opt = opt||0.3;
    var dataM=dataK;
    changeBase64(src,opt)
    .then(
    function(data)
    {
        dataM.imgData=data;
        console.log(dataM)
        $.ajax(
            {
                type:"POST",
                url:url,
                data:dataM,
                dataType:'json'
            })
        .then(
            function(data){console.log(data)},
            function(){console.log("err")}
        )
    }
    )
}



/*** 弹出input
 * **   选择图片  ** */ 
  function choPto()
  {
      var ded = $.Deferred();
      var inp=document.createElement("input");
      inp.type="file";
      inp.accept="image/gif,image/jpeg,image/jpg,image/png,image/svg";
      $(inp).change(function()
      {
          if(typeof FileReader == 'undefined')
          {
              alert('您的浏览器不支持FileReader，请升级') 
          }else
          {
             

              var reader = new FileReader();
              var pan_src;
              reader.onload = function(e)
              {   
                  pan_src  = e.target.result;
                //   if (!/.(gif|jpg|jpeg|png|GIF|JPG|png|BMP|bmp)$/.test(pan_src)) {       //判断上传图片是否符合格式
                //     alert('上传图片格式不正确，请重新上传!');
                //     return false;
                //   }

                  ded.resolve(pan_src,e)
              }
                  reader.readAsDataURL(inp.files[0]);         
          }
      })
      $(inp).click();
      return ded.promise();
  }// .then((data,file对象)=>{})  data=>base64



/*** 压缩 src
 * ** src:图片地址 opt:清晰度(0-1 可选) data:{}(可选) ** */
function changeBase64(src,opt,data)
{     
    var _data={};
    var ded = $.Deferred();
    _data.data=data;
    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = src;
    image.onload = function()
    {
        var base64 = getBase64Image(image,opt);
        if(!_data.data)
        {
            _data=base64;
        }else
        {
            _data.base64=base64;
        }
            ded.resolve(_data)
    }
    return ded.promise();
}//.then(data) {base64,data}



/***压缩 img
 * ** img:(dom),opt(0-1) ** */
function getBase64Image(img,opt)  
{    
    var op=opt||1;
    var format = "jpeg";
    var canvas = document.createElement("canvas");
    canvas.width = parseFloat(img.width)/2;
    canvas.height = parseFloat(img.height)/2;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width/2, img.height/2);
    if(img.src.length>500){
        var start = img.src.indexOf('/')
        var end = img.src.indexOf(';');
        format = img.src.slice(start,end);
    }
    var dataURL = canvas.toDataURL("image/"+format,op);
    return dataURL;
}//return dataURL base64




/***调用示例
 * 
 * 函数调用
 * choPto()
 *   .then((data)=>{return changeBase64(data,0.1)})
 *   .then((data)=>{console.log(data)})  ----data{data}  
 * 或者
 *  * choPto()
 *   .then((data)=>{return changeBase64(data,0.1,Send)})
 *   .then((data)=>{console.log(data)})  ----data{data.base64:base,data.data:Send}
 * 
 * ***/