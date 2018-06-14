apiready = function() {
	//alert(JSON.stringify(api.pageParam)) //{"type":1}
	var news_id = api.pageParam.news_id; //1-8  新闻类型字段
	var new_type = api.pageParam.new_type;
	var headerH = $api.offset($api.dom('header')).h
	//打开子窗口承载列表内容
	api.openFrame({
		name: 'news_content_frame',
		url: './news_content_frame.html',
		rect: {
			x: 0,
			y: headerH,
			w: 'auto',
			h: api.winHeight - headerH
		},
		//将本页面接受的参数传给frame
		pageParam: {
			news_id: news_id,
			new_type: new_type
		},
		bounces: true,
		bgColor: 'rgba(0,0,0,0)',
		vScrollBarEnabled: true,
		hScrollBarEnabled: false
	});
};