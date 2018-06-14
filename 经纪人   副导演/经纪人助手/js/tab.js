/**
 * Created by Admin on 2017/8/28.
 */
// 点击切换
function TabView(btns,contents){
    var _this = this;
    this.btns = btns;
    this.contents = contents;
    this.len = this.btns.length;
    for(var i=0;i<this.len;i++){
        this.btns[i].index = i;
        this.btns[i].onclick = function(){
            _this.tab(this)
        };
    }
}
TabView.prototype.tab = function(obj){
    var _index = obj.index;
    for(var j=0;j<this.len;j++){
        this.btns[j].classList.remove('active');
        this.contents[j].classList.remove('active');
    }
    obj.classList.add('active');
    this.contents[_index].classList.add('active')
}

// 点击伸缩
function toggle(btn){
    btn.click(function () {
        $(this).next().toggle();
        //console.log($(this).children("p:last-child").children("img:first-child").is(":hidden"));
        var dis=$(this).children("p:last-child").children("img:first-child").is(":hidden");
        if(dis==false){
            $(this).children("p:last-child").children("img:last-child").css("display","block");
            $(this).children("p:last-child").children("img:first-child").css("display","none");
        }else if(dis==true){
            $(this).children("p:last-child").children("img:last-child").css("display","none");
            $(this).children("p:last-child").children("img:first-child").css("display","block");
        }

    })
}
// function Toggle1(btn){
//     var _this=this;
//     this.btn=btn;
//     this.dis=this.btn.children("p:last-child").children("img:first-child").is(":hidden");
//     this.btn.onclick=function(){
//         _this.tab(this);
//         console.log("ll")
//     };
// }
// Toggle1.prototype.tab=function(obj){
//     // _this.btn.next().toggle();
//
//     if(this.dis==false){
//         obj.children("p:last-child").children("img:last-child").css("display","block");
//         obj.children("p:last-child").children("img:first-child").css("display","none");
//     }else if(this.dis==true){
//         obj.children("p:last-child").children("img:last-child").css("display","none");
//         obj.children("p:last-child").children("img:first-child").css("display","block");
//     };
// };
