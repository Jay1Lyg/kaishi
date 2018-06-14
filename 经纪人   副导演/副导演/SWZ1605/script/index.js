apiready = function () {
	api.openSlidLayout({
	    type: 'left',
	    fixedPane: {
	        name: 'user',
	        url: 'html/user.html',
	        bgColor: '#fff',
	        bounces: false,
	        vScrollBarEnabled: true,
	        hScrollBarEnabled: false
	    },
	    slidPane: {
	        name: 'main',
	        url: 'html/main.html',
	        bgColor: '#fff',
	        bounces: false,
	        vScrollBarEnabled: true,
	        hScrollBarEnabled: false
	    }
	}, function(ret, err) {
	
	});
}