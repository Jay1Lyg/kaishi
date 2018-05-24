var keystone = require('keystone');


exports = module.exports = function (req, res) {     
	//var openid=req.params.openid;
	//var appid=req.params.appid;
	var appid = 'wx7ab53b0dfd9deb2e';
	var openid = 'oEmOv0g7yY0thCKnBmy5FuAzUSMo';
	res.render('payment_page_1',{
      openid : openid,
      appid : appid
    });

};