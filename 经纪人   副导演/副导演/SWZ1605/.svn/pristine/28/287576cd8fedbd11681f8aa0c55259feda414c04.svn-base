apiready = function() {
	//避免电池电量条压住header
	var $header = $api.dom('header');
	$api.fixStatusBar($header);
	//$api.fixIos7Bar($header);
	//设置电池电量条，主题色
	api.setStatusBarStyle({
    	style : 'light'
    });
	var header = $api.dom('header');
	var headerH = $api.offset(header).h;
	var section = $api.dom('section');
	var sectionH = $api.offset(section).h;
	api.openFrameGroup({
		name : 'main',
		background : '#fff',
		scrollEnabled : false,
		rect : {
			x : 0,
			y : headerH,
			w : 'auto',
			h : sectionH
		},
		index : 0,
		frames : [{
			name : 'swz_index',
			url : 'swz_index.html',
			bounces:true, 
			bgColor : '#fafafa'
		}, {
			name : 'courses',
			url : 'courses.html',
			bgColor : '#fff'
		}, {
			name : 'shows',
			url : 'shows.html',
			bgColor : '#fff'
		}]
	}, function(ret, err) {
		var index = ret.index;
	});
	
	//退出应用
	exitApp()
};
//点击footer按钮切换frame
var btns = $api.domAll('#footer li');
function changeTab(index) {
	for (var i = 0; i < btns.length; i++) {
		$api.removeCls(btns[i], 'active')
	}
	$api.addCls(btns[index], 'active')
	api.setFrameGroupIndex({
		name : 'main',
		index : index,
		scroll : false
	});
}
//点击头像打开侧滑栏
function openSlid(){
	api.openSlidPane({
	    type: 'left'
	});
}
//打开更多页面
function openMore(){
	api.openWin({
	    name: 'more',
	    url: './more.html'
	});
}

/*
//退出应用方法一
function exitApp(){
	api.addEventListener({
	    name: 'keyback'
	}, function(ret, err) {
		api.closeWidget({
		    id: 'A6933527292618',
		    retData: {
		        name: 'closeWidget'
		    },
		    animation: {
		        type: 'flip',
		        subType: 'from_bottom',
		        duration: 500
		    }
		});
	});
}
*/

function exitApp(){
	api.addEventListener({
	    name: 'keyback'
	}, function(ret, err) {
		api.toast({
		    msg: '再按一次退出应用',
		    duration: 2000,
		    location: 'bottom'
		});
		api.addEventListener({
		    name: 'keyback'
		}, function(ret, err) {
			api.closeWidget({
                id: 'A6933527292618',
                retData: {
                    name: 'closeWidget'
                },
                silent:true,
                animation: {
                    type: 'flip',
                    subType: 'from_bottom',
                    duration: 500
                }
            });
		});
		setTimeout(function(){
            exitApp();
        },3000)
	});
}


