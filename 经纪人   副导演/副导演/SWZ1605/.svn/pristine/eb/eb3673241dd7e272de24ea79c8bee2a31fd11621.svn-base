var new_type;
apiready = function(){
	//alert(JSON.stringify(api.pageParam)) //{"type":1}
	new_type = api.pageParam.type; //1-8  新闻类型字段
	//"http://api.dagoogle.cn/news/get-news?tableNum="+ new_type
	var base_url = "http://api.dagoogle.cn/news/get-news";
	
	api.showProgress({
	    style: 'default',
	    animationType: 'fade',
	    title: '努力加载中...',
	    text: '先喝杯茶...',
	    modal: false
	});
	
	api.ajax({
	    url: base_url + "?tableNum=" + new_type,
	    method: 'get'
	}, function(ret, err) {
	    if (ret) {
	    	//ret -> {"data":[]}
	    	var tml = $api.byId('new-tml').text;
	    	var tmlFn = doT.template(tml)
	    	$api.html($api.byId('news'),tmlFn(ret.data))
	    	
	    	//利用递归函数,及image.onload事件,等所有图片都加载完再去隐藏loading
	    	loadImage(0)
	    	function loadImage(index){
	    		if(ret.data[index].top_image){
	    			var image = new Image();
	    			image.src = ret.data[index].top_image;
	    			image.onload = function(){
	    				if(index < (ret.data.length-1)){
	    					index++;
	    					loadImage(index)
	    				}
	    				api.hideProgress();
	    			}
	    		}else{
	    			index++;
	    			loadImage(index)
	    		}
	    	}
	    } else {
	        api.toast({
			    msg: err.statusCode + "我迷路了~~",
			    duration: 2000,
			    location: 'bottom'
			});
	        api.hideProgress();
	    }
	});
};

function openContent(id){
	api.openWin({
	    name: 'news_content',
	    url: './news_content.html',
	    pageParam: {
	        news_id: id,
	        new_type: new_type
	    }
	});
}
