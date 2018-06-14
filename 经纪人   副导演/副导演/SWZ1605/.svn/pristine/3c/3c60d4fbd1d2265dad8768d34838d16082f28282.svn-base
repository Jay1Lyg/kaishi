apiready = function() {
	//图片轮播的模块,需要在官网添加对应模块,然后自定义loader
	var UIScrollPicture = api.require('UIScrollPicture'); 	//引入模块
	//打开轮播图模块
	UIScrollPicture.open({
		rect : {
			x : 0,
			y : 0,
			w : api.winWidth,
			h : api.winWidth*23 / 64 	//这里实际情况可以通过image.onload计算高度
		},
		data : {
			//图片路径数组
			paths : ['widget://image/banner_1.jpg', 'widget://image/banner_2.jpg', 'widget://image/banner_3.jpg'],
			//图片说明文字的数组
			captions : ['HTML5', 'AngularJS', 'NodeJS']
		},
		styles : {
			//说明文字的样式
			caption : {
				height : 24,
				color : '#E0FFFF',
				size : 13,
				bgColor : 'rgba(0,0,0,.5)',
				position : 'overlay'
			},
			//指示器样式
			indicator : {
				align : 'center',
				color : 'rgba(255,255,255,.7)',
				activeColor : '#072f76'
			}
		},
		placeholderImg : 'widget://image/banner_1.jpg', 	//占位图片
		contentMode : 'scaleToFill',
		interval : 5,
		fixedOn : api.frameName,
		loop : true,
		fixed : false
	}, function(ret, err) {
		if (ret) {
			//alert(JSON.stringify(ret));
		} else {
			//alert(JSON.stringify(err));
		}
	});
	$api.css($api.dom('body'),'padding-top:'+(api.winWidth*23 / 64 + 10)+'px')
	
}