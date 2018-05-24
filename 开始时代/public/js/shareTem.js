/**
 * Created by Carry on 3/16/2018.
 */
var Templete = function (config) {
    this.imgurl = config.imgurl;
    this.initTem();
}
var tem;
var templete;
var overlyTem;
Templete.prototype = {
    initTem: function () {
        var msg=new Array;
        msg.push('<div id="tem">');
        msg.push('</div>');
        tem=$(msg.join(''));
        console.log(tem);
        $('body').append(tem);

        var over=new Array;
        over.push('<div class="shareoverly">');
        over.push('</div>');
        overlyTem=$(over.join(''));
        overlyTem.css({
            position: 'fixed',
            top:'0',
            left: '0',
            right:'0',
            bottom:'0',
            background: 'black',
            opacity: '0.5',
            display: 'none',
            'z-index': '201',
        });
        $('body').append(overlyTem);
        console.log(overlyTem);

        templete = '<div class="share_templete"><img src="'+this.imgurl+'" alt=""><div class="share_btn"><button class="btn">分享当前模板</button><button class="xiugai">修改当前模板</button></div></div>';
        $('#tem').append(templete);

    },
    share: function () {
        $(".shareoverly").css({display:'block'});
        $('#tem').fadeIn();
    },
    notshare: function () {
        $('#tem').empty();

        $(".shareoverly").css({display:'none',opacity:'0'})
    }
}