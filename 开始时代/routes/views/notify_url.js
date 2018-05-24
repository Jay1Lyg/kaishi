//支付成功后，给微信发送通知
exports = module.exports = function (req, res) { 
	var body = '<xml>'+
	 '<return_code><![CDATA[SUCCESS]]></return_code>'+
	 '<return_msg><![CDATA[OK]]></return_msg>'+
	'</xml>'
	res.send(body);
}