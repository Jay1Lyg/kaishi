'use strict';


//touch

var cutSendMsg=function(ratio,opt,url1,dataS){//ratio裁剪宽高比 opt透明度 url1裁剪的图  url2正常的图
    var ded = $.Deferred();
    choPto().then(function(picUrl,imgSize){   
        openPic(ratio,opt,url1,dataS,picUrl).then(function(data1){
            console.log(data1);
            var msg = {};
            msg.data1=data1;
            msg.picUrl = picUrl;
            ded.resolve(msg,msg.picUrl,data1);
            
        })
    })
    return ded.promise();
}//.then(msg,imgUrl)=>{返回一个对象 第一个裁剪图片返回的数据 msg.data1 大图的数据msg.picUrl}

// 发送大图
var sendBig = function(src,url,opt,dataK){
    var ded = $.Deferred();
    // changeBase64(src,opt).then(function(data){
        dataK.imgData=src;
        // $.ajax({
        //     type:"POST",
        //     url:url,
        //     data:dataK,
        //     dataType:'json'
        // }).then(function(data){
        //     ded.resolve(data);
        // })
        var fd = new FormData();
    
        // fd.append("userid",dataK.userid);
        console.log(dataK);
        $.each(dataK,function(index,item){
            fd.append(index,item);
            console.log(fd)
        })

        // fd.append("imgData",data);
        console.log(dataK);
        $.ajax({
            url: url,
            type: "POST",
            data: fd,
            processData: false,  // 不处理数据
            contentType: false   // 不设置内容类型
        }).then(function(data){
            console.log(data)
            $(".outImgCover").remove();
            ded.resolve(data);
        },function(){
            $(".outImgCover").remove();
            $.alert("上传失败请重新上传")
        })
    // })
    return ded.promise();
}//.then(data)=>{返回的数据}


//打开图片 总的事件
var openPic=function(ratio,opt,url,dataS,picUrl) //ajax picUrl ratio opt
{   
    var 
        rat   = ratio,
        dataK = dataS,
        url1  = url,
        // url2  =  optData.navUrl,
        html  =`
        <div class="outImgCover">
            <div class="opt op1"></div>
            <div class="opt op2"></div>
            <div class="opt op3"></div>
            <div class="opt op4"></div>
            <div>
                <div class="cover"><img data-img="cut" src="${picUrl}" alt=""></div>
            </div>
            <a id="cutImg" style=" ">完成</a>
            <a id="cancel">取消</a>
        </div>
    `;

    var ded = $.Deferred();

    $('body').append(html);

    var 
        $outCov = $(".outImgCover"),  //最外层DIV
        $img=$('[data-img=cut]'),
        $cov = $('.cover'),
        $op1=$('.op1'),$op2=$('.op2'),$op3=$('.op3'),$op4=$('.op4'),$opt=$('.opt'),  //透明条
        ratt=rat||1.875,// 1 宽/高
        coverWidth,coverHeight,myDelay,
        timeStart,timeEnd,Δx,Δy,vX,vY,hash=[],hashT=[],
        rate=5;//图片放大倍率
    //varEnd
    //触摸事件
    function bindtouch()
    {   var  $img=$('[data-img=cut]');
        var img = $img[0];
        var $document = $(".outImgCover");
        $document.on('touchstart',function(e)
        {
            // Opt1();
            
                e.stopPropagation()
                var 
                    imgX=$img.position().left,
                    imgY=$img.position().top,
                    imgWid=$img.width(),           //宽
                    imgHei = $img.height(),
                    fingers=e.originalEvent.touches.length,
                    touch1 = e.originalEvent.touches[0], 
                    touch2 = e.originalEvent.touches[1],
                    staX1=touch1.clientX, staY1=touch1.clientY ,
                    centX,centY,lenSta,
                    coverWidth,coverHeight,myDelay,
                    timeStart,timeEnd,Δx,Δy,vX,vY,hash=[],hashT=[],
                    rate=5;//图片放大倍率
                //varEnd

        
                    
            //求和的平方
                var POW2 = function(x1,x2){
                    var x=parseFloat(x1);
                    var y=parseFloat(x2)
                    return (Math.pow((x-y),2));
                }

            if(fingers==2)
                {
                    var staX2=touch2.clientX,
                        staY2=touch2.clientY;
                    
                    centX=(staX2-staX1)/2+staX1;
                    centY=(staY2-staY1)/2+staY1;
                    lenSta = Math.pow((POW2(staX1,staX2)+POW2(staY1,staY2)),1/2);
                    //   console.log(lenSta);
                }
                $document.on('touchmove',function(e)
                {
                    e.stopPropagation()
                    var
                        touch1 = e.originalEvent.touches[0],
                        touch2 = e.originalEvent.touches[1],  // 第二根手指touch事件
                        MoveFigs=e.originalEvent.touches.length,
                        endX1 = touch1.clientX,
                        endY1 = touch1.clientY,
                        endImgX=imgX+(endX1-staX1),
                        endImgY=imgY+(endY1-staY1);
                    //varEnd    
                    // console.log(touch1.clientX);
                        
                        // console.log('dx1 : '+endX1+', dy2 : '+endY1)

                        if(MoveFigs==1)
                        {
                            $img.css('left',endImgX);
                            $img.css("top",endImgY);
                        }else if(MoveFigs==2)
                        {
                            // if(!lenSta)
                            // {
                            //     var lenSta = Math.pow((POW2(endX1,endX2)+POW2(endY1,endY2)),1/2);
                            // }
                            // if(!fingers==MoveFigs){
                            //     (lenSta)&&(lenSta=Math.pow((POW2(endX1,endX2)+POW2(endY1,endY2)),1/2))
                            // }
                            // console.log(lenSta)
                            var
                                endX2=touch2.clientX,
                                endY2=touch2.clientY,
                                lenEnd = Math.pow((POW2(endX1,endX2)+POW2(endY1,endY2)),1/2),
                                difRate = lenEnd/lenSta,
                                lastWid = imgWid*difRate,

                                difVal=(lenEnd-lenSta),
                                // natwidth = parseFloat(img.naturalWidth),        //图片自然宽度
                                // natHeight = parseFloat(img.naturalHeight),          //图片自然高度
                                // widHeiK=natwidth/natHeight,    

                                // subHeit=(difVal+imgWid)/widHeiK-imgWid/widHeiK,
                                dx=(lastWid>=coverWidth*rate)?0:$cov.offset().left,
                                dy=(lastWid>=coverWidth*rate)?0:$cov.offset().top,
                                // heightEnd =  imgHei + subHeit,
                                isS = (lastWid > coverWidth*0.5)
                                // &&(heightEnd > coverHeight*0.8)
                                // &&(heightEnd < coverHeight * 5.5),                
                                    &&(lastWid < coverWidth * rate),
                                sizeRate = lastWid/imgWid,
                                
                                centXEnd=(endX2-endX1)/2+endX1,
                                centYEnd=(endY2-endY1)/2+endY1;
                                
                                endImgX = centXEnd-(centX-imgX)*sizeRate-dx*(1-sizeRate);
                                endImgY = centYEnd-(centY-imgY)*sizeRate-dy*(1-sizeRate);
                            //varEnd  
                            //console.log(lenSta);                
                            console.log("1："+lastWid);
                            
                            // if(isS&&difRate){
                                console.log(lastWid);
                            // console.log(endImgY);
                                $img.css({
                                    'width':lastWid,
                                    "left":endImgX,
                                    "top":endImgY
                                });
                            // }
                        }

                        Δx=endImgX-imgX;
                        Δy=endImgY-imgY;
                        timeStart = new Date();
                        if(timeStart-hashT[0]>=50)
                        {
                            hash.unshift(Δx);
                            hash.unshift(Δy);
                            hashT.unshift(timeStart);
                            hash.length=4;
                            hashT.length=2;
                        }
                        
                });
                $document.on('touchend',function()
                {
                    timeEnd = new Date();
                    
                    // var Δt2 = Math.pow((timeEnd - timeStart)/1000,2);
                    // console.log(hash);
                    // console.log(hashT);
                    
                    vX = (hash[2]-hash[0])/((hashT[1]-hashT[0]));
                    vY = (hash[3]-hash[1])/((hashT[1]-hashT[0]));
                    // console.log(vX)
                    // console.log(vY)
                    function moveA(){
                    var timer = setInterval(function(){
                            var imgX =  $img.position().left,imgY = $img.position().top;
                            vX-=10;vY-=10;
                            imgX+=vX/10;
                            imgY+=vY/10;
                            $img.css({'left':imgX,'top':imgY});
                            // console.log(imgX)
                            if(vX<20||vY<20){
                                clearInterval(timer)
                            }
                        },100)
                    }
                    // moveA();
                    
                    e.stopPropagation();
                    $document.unbind("touchstart");
                    $document.unbind('touchmove');
                    $document.unbind('touchend');
                    // myDelay=setTimeout(function ()
                    //     {
                    //         opt6();
                    //     },1000);
                    // opt6();
                
                    // var timer = setInterval(function(){
                    //     ax=ax*0.8;
                    //     if(ax<100);
                    //     clearInterval(timer);
                    //     // console.log(ax);
                    // },100)
                    onCheck();  
                    bindtouch();
                });   
                return false;
        })
    }

    //检查
    function onCheck() 
    {      
        
        var 
            $outCov = $(".outImgCover"),
            outWid = $outCov.width(),
            minWid = coverWidth;
        
        //varEnd
        var    
            //目前图片状态
            imgX =  $img.position().left,//左
            imgY = $img.position().top,//上
            imgHei = $img.height(), //每次检查重新赋值 
            imgWid = $img.width(),
            pxRate=imgWid/imgHei,

            maxWid = rate*minWid,//最宽
            minTop =  coverHeight-imgHei,
            minLeft = coverWidth-imgWid;//用left来计算最右
        //varEnd
        pxRate>ratio&&
            (minWid = coverWidth*pxRate);

        pxRate>ratio&&
            (maxWid = coverWidth*rate*pxRate);
            
        // console.log(imgHei)
        // console.log(maxWid)

        function checkSize(){
            //检查放大情况
            if(imgWid>maxWid)
            {
                $img.width(maxWid)
            }else if(imgWid<minWid)
            {
                $img.width(minWid);
            }

        }

        function checkCoor(){
            //检查平移情况
            if(imgX>0){
                $img.css('left',0);
            }else if(imgX<minLeft){
                $img.css('left',minLeft);
            }

            if(imgY>0){
                $img.css('top',0);
            }else if(imgY<minTop){
                // console.log(-minTop)
                $img.css('top',minTop)
            }
        }

        checkSize();
        checkCoor();
    }

    //初始化
    function resert(ratio)
    {
        var
            $cov = $('.cover'),
            $img=$('[data-img=cut]'),
            $outCov = $(".outImgCover"),
            $op1=$('.op1'),$op2=$('.op2'),$op3=$('.op3'),$op4=$('.op4'),$opt=$('.opt'),  //透明条

            queding = $('#cutImg'),
            quxiao = $('#cancel'),

            ratio=ratio||1.875, //宽高比
            WinHei = $(window).height(),
            outWid = $outCov.width(),
            inrWid = 0.8*outWid,
            inrHei = inrWid/ratio,
            topHei = (WinHei-inrHei)/2,
            imgWid = $img.width(),
            imgHei = $img[0].naturalHeight/($img[0].naturalWidth/imgWid),
            krtio  = $img[0].naturalWidth/$img[0].naturalHeight
            ;

            //设置最外层div的高
            $outCov.height(WinHei);          
        //varEnd                          
        /*初始化透明条*/
        var opk = function()
        {
            $op1.css({                                          //上左
                'width':outWid*0.1,
                'height':WinHei-topHei
            });

            $op2.css({                                          //上右
                'width':outWid*0.9,
                'height':topHei
            });

            $op3.css({                                           //下右
                "width":outWid*0.1,
                "height":WinHei-topHei
            });

            $op4.css({                                          //下左
                'width':outWid*0.9,
                'height':topHei
            })
        };

        /*初始化内层边框*/
        var resCov = function()
        {
            $cov.width(inrWid); 
            $cov.height(inrHei);
        };

        var resImg = function()
        {
            //cover 100*300    r=0.33
            //img   100*10    k=10
            var minWid=inrWid;

            if(imgHei<inrHei){
                // console.log('ratio>krtio:imgWid'+imgWid+" inrHei:"+inrHei+" imgHei"+imgHei+"ratio "+ratio+"krtio"+krtio);
                if(ratio>krtio){
                    minWid = imgWid*(inrHei/imgHei)*(ratio/krtio);

                }else{
                    minWid = imgWid*(inrHei/imgHei);
                }

            }

            $img.css({
                "top":(-(minWid/krtio-inrHei)/2),
                "left":(-(minWid-inrWid)/2),
                "width":minWid
            });
            // console.log("top:"+(-(minWid/krtio-inrHei)/2))
            // console.log("left:"+(-(minWid-inrWid)/2))
            // console.log('width:'+minWid)
        };

        //笔记：宽750 高1334
        //初始化按钮
        queding.css({
            "height":outWid*0.1,
            "fontSize":outWid*0.04444,
            "lineHeight":outWid*0.1+'px',
            "width":0.24*outWid,
            "left":outWid*0.6533333,
            "top":WinHei*0.9025,
        });

        quxiao.css({
            "height":outWid*0.1,        
            "fontSize":outWid*0.044444,
            "lineHeight":outWid*0.1+'px',
            "left":outWid*0.1,
            "width":0.24*outWid,
            "top":WinHei*0.9025,
            
        })
        resCov();
        opk();
        resImg();

        queding.on('touchend',function(){
            cutImg().then(function(data){
                // console.log(data);
            })
        })
        quxiao.on('touchend',function(){
            $outCov.remove();
        })
    }
    //初始化数据
    setTimeout(function(rat)
    {
        resert(ratt);  //初始化尺寸
        coverWidth = $cov.width();
        coverHeight = $cov.height();     //高;
        bindtouch() //绑定touch
        onCheck();
    },6);

    $('#cutImg').on('touchend',function()
    {
        if(!opt){
            opt=1
        }
        cutImg(opt).then(function(data){
            console.log(data);
            dataK.imgData=data;
            console.log(dataK)
            if(url1){
                $.ajax(
                    {
                        type:"POST",
                        url:url1,
                        data:dataK,
                        dataType:'json'
                    }).then(function(data2){
                        console.log(data2);
                        ded.resolve(data);
                    })
            }
        });
    });
    return ded.promise();
};//.then(data)=>{data=>返回的数据}




//裁剪事件 发送
