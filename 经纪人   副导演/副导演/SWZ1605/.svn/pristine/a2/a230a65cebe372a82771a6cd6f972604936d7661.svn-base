apiready = function(){
	//alert(JSON.stringify(api.pageParam)) //{"type":1}
	var news_id = api.pageParam.news_id; //1-8  新闻类型字段
	var new_type = api.pageParam.new_type;
	//"http://api.dagoogle.cn/news/get-news?tableNum="+ new_type
	var base_url = "http://api.dagoogle.cn/news/single-news";
	
	api.showProgress({
	    style: 'default',
	    animationType: 'fade',
	    title: '努力加载中...',
	    text: '先喝杯茶...',
	    modal: false
	});
	
	api.ajax({
	    url: base_url + "?tableNum=" + new_type + "&news_id=" + news_id,
	    method: 'get'
	}, function(ret, err) {
	    if (ret) {
	    	//ret -> {"data":[]}
	    	var data = []
	    	
	    	//将时间戳转换成年月日
	    	function getLocalTime(nS) {
	    		var d = new Date(parseInt(nS) * 1000)
    			return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日"
			}
	    	
	    	ret.data.edit_time = getLocalTime(ret.data.edit_time)
	    	
	    	var tml = $api.byId('new-tml').text;
	    	var tmlFn = doT.template(tml)
	    	$api.html($api.byId('news'),tmlFn(ret.data))
	    	api.hideProgress();
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


