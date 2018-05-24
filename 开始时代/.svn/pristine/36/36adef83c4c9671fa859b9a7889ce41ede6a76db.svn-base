// //public_payment
//开始选角：
//账号：wx7ab53b0dfd9deb2e
//密钥b09deb8243ab517ed249102376c1fef1
var fs = require('fs');
var crypto = require('crypto');
var MD5 = crypto.createHash('md5');
//var info = JSON.parse( ('./query/WX_ServerNo_Info/WX_ServerNo_Info.json', 'utf-8'));
exports = module.exports = function (req, res) {    
  //统一下单参数
  var openid = req.body.openid;
  var appid = 'wx7ab53b0dfd9deb2e';
  var mch_id = '1499724392';//商户号
  var bodys = '会员充值';
  var nonce_str = Math.random().toString(36).substr(2, 15); //随机数
  console.log('nonce_str:'+nonce_str);
  var notify_url = '';//回调地址
  var out_trade_no = new Date().getTime()+openid.substr(9,15);//订单号
  var spbill_create_ip = req.ip;
  console.log('spbill_create_ip:'+spbill_create_ip);
  var total_fee = '5000';//产品价格，单位为分
  var trade_type = 'JSAPI';//交易类型
  var stringA = "appid="+appid+"&body="+bodys+"&mch_id="+mch_id+"&nonce_str="+nonce_str+"&notify_url="+notify_url+"&openid"+openid+"&out_trade_no"+out_trade_no+"&spbill_create_ip"+spbill_create_ip+"&total_fee"+total_fee+"&trade_type"+trade_type;
  var stringSignTemp=stringA+"&key=192006250b4c09247ec02edce69f6a2d"; //注：key为商户平台设置的密钥key
  var sign=MD5(stringSignTemp).toUpperCase();//注：MD5签名方式
  var body = '<xml> ' +
	 '<appid>'+appid+'</appid> ' +
	 '<body>'+bodys+'</body> ' +
	 '<mch_id>'+mch_id+'</mch_id> ' +
	 '<nonce_str>'+nonce_str+'</nonce_str> ' +
	 '<notify_url>'+notify_url+'</notify_url>' +
	 '<openid>'+openid+'</openid> ' +
	 '<out_trade_no>'+out_trade_no+'</out_trade_no>'+
	 '<spbill_create_ip>'+spbill_create_ip+'</spbill_create_ip> ' +
	 '<total_fee>'+total_fee+'</total_fee> ' +
	 '<trade_type>'+trade_type+'</trade_type> ' +
	 '<sign>'+sign+'</sign> ' + // 此处必带签名， 否则微信在验证数据的时候是不通过的
	 '</xml>';
  var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
  util.sendPostRequest(url,body,function(err,ret){
     if(err){
        throw new Error(err);
     }else{
     	console.log(ret);
     	//该接口返回prepay_id
       var data = {};//网页端调起支付所需参数
       data.appid = appid;
       data.timeStamp = new Date().getTime();
       data.nonceStr = nonce_str;
       data.prepay_id = ret.prepay_id;
       data.signType = "MD5";
       data.paySign = sign;//MD5微信签名
       res.send(data);
     }
  });
 //
}
