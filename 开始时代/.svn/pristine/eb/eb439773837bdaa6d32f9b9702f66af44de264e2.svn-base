exports = module.exports = function (req, res) {
	var token="weixin_code";
	var signature = req.query.signature;
	var timestamp = req.query.timestamp; 
	var echostr   = req.query.echostr; 
	var nonce     = req.query.nonce;
	console.log('------------------------');
    console.log(req.query);
	console.log('------------------------');
	console.log( signature +"   "+timestamp+"   "+echostr+"  "+nonce);
	var oriArray = new Array();
	oriArray[0] = nonce;
	oriArray[1] = timestamp;
	oriArray[2] = token;
	oriArray.sort();
	
	var original = oriArray.join('');
	console.log(original);
	var scyptoString = sha1(original);
	console.log('scyptoString:'+ scyptoString);
	if(signature == scyptoString){ 
		console.log('验证成功');
		//res.send('验证成功');
       res.send(echostr);
    } else{
		console.log('验证失败');
		//res.render('test');
		res.send('验证失败');
	}	
	
};


 function sha1(str) {
	 var md5sum = crypto.createHash("sha1");
	 md5sum.update(str);
	 str = md5sum.digest("hex");
	 return str;
 }