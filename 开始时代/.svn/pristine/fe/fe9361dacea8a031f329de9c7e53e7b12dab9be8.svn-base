var keystone = require('keystone'),
	ActorTemplate = keystone.list('ActorTemplate'),
	ActorTemplateInUser = keystone.list('ActorTemplateInUser');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var fs = require('fs');
var util = require('../../query/util/util.js');
var md5 = require('md5');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
var merchant = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/Merchant.json', 'utf-8'));
var xml2js  = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true})
var builder = new xml2js.Builder();
var parser = new xml2js.Parser();
	  crypto = require('crypto');
var request = require('request');
var urllib = require('url');
var config = require('../../public/conf/common.js');
exports = module.exports = function (req, res) { 
  //统一下单参数
  console.log('---------req.body---------');
  console.log(req.body);
  console.log('---------req.body---------');
  var openid = req.body.openid;
  var appid = req.body.appid;
  var total_fee = req.body.total_fee * 100;//产品价格，单位为分(*100为元)
  var obj = {};
  obj.openid =openid;
  obj.appid =appid;
  obj.total_fee =total_fee;
  obj.mch_id =merchant.mch_id;//商户号;
  obj.content ='Casting照片消费';
  obj.key =merchant.key;//key为商户平台设置的密钥key
  obj.nonce_str =Math.random().toString(36).substr(2, 15); //随机数;
  obj.notify_url =config.homeEntry.url+'/payment/notify_url';//回调地址
  obj.out_trade_no = new Date().getTime()+openid.substr(9,15);//订单号
  obj.spbill_create_ip = '39.104.58.139';
  obj.trade_type = 'JSAPI';//交易类型
  unifiedOrder(obj,function(err,info){
     if(err){
       throw new Error(err);
     }else{
       var params = urllib.parse(req.url,true); 
       if (params.query && params.query.callback) {	
          var str =  params.query.callback + '(' + JSON.stringify(info) + ')';//jsonp
          res.send(str);	          
       } 

     }
  });
}
  

var unifiedOrder = function(obj,callback){
    //第一次签名
  var stringA = "appid="+obj.appid+"&body="+obj.content+"&mch_id="+obj.mch_id+"&nonce_str="+obj.nonce_str+"&notify_url="+obj.notify_url+"&openid="+obj.openid+"&out_trade_no="+obj.out_trade_no+"&sign_type=MD5&spbill_create_ip="+obj.spbill_create_ip+"&total_fee="+obj.total_fee+"&trade_type="+obj.trade_type;
  var stringSignTemp=stringA+"&key="+obj.key; //注：key为商户平台设置的密钥key
  console.log('--------------stringSignTemp---------------');
  console.log(stringSignTemp);
  console.log('--------------stringSignTemp---------------');
  var sign=md5(stringSignTemp).toString().toUpperCase();//注：MD5签名方式
  //var timestamp = new Date().getTime();
  var body = '<xml> ' +
	 '<appid>'+obj.appid+'</appid> ' +
	 '<body>'+obj.content+'</body> ' +
	 '<mch_id>'+obj.mch_id+'</mch_id> ' +
	 '<nonce_str>'+obj.nonce_str+'</nonce_str> ' +
	 '<notify_url>'+obj.notify_url+'</notify_url>' +
	 '<openid>'+obj.openid+'</openid> ' +
	 '<out_trade_no>'+obj.out_trade_no+'</out_trade_no>'+
	 '<spbill_create_ip>'+obj.spbill_create_ip+'</spbill_create_ip> ' +
	 '<total_fee>'+obj.total_fee+'</total_fee> ' +
	 '<trade_type>'+obj.trade_type+'</trade_type> ' +
     '<sign_type>MD5</sign_type> ' +
	 '<sign>'+sign+'</sign> ' + // 此处必带签名， 否则微信在验证数据的时候是不通过的
	 '</xml>';
  var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
  request({  
    url: url,  
    method: 'POST',  
    body: body  
   }, function(err, response, body) {
     if (!err && response.statusCode == 200) {  
       //将xml转换成json
       xmlParser.parseString(body, function (err, result) {
       console.log('--------------result---------------');
       console.log(result);
       console.log('--------------result---------------');
		   var data = {};//网页端调起支付所需参数
		   data.appid = obj.appid;
		   data.timeStamp = new Date().getTime();
		   data.nonceStr = obj.nonce_str;
		   data.prepay_id = result.xml.prepay_id;
		   data.signType = "MD5";
	       //第二次签名
	       var stringB = "appId="+obj.appid+"&nonceStr="+obj.nonce_str+"&package=prepay_id="+data.prepay_id+"&signType=MD5"+"&timeStamp="+data.timeStamp;
	       var stringSignTemp1 = stringB+"&key="+obj.key;
	       var paySign = md5(stringSignTemp1).toString().toUpperCase();//注：MD5签名方式
	       data.paySign = paySign;//MD5微信签名
	       callback(null,data);
	   })

     }  
     
  })
}


// var fs = require('fs');
// var util = require('../../query/util/util.js');
// var md5 = require('md5');
// var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
// var merchant = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/Merchant.json', 'utf-8'));
// var xml2js  = require('xml2js');
// var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true})
// var builder = new xml2js.Builder();
// var parser = new xml2js.Parser();
//     crypto = require('crypto');
// var request = require('request');
// var urllib = require('url');
// var config = require('../../public/conf/common.js');
// exports = module.exports = function (req, res) { 
//   //统一下单参数
//   console.log('---------req.body---------');
//   console.log(req.body);
//   console.log('---------req.body---------');
//   var openid = req.body.openid;
//   var appid = req.body.appid;
//   var total_fee = '1';//产品价格，单位为分
//   var mch_id = merchant.mch_id;//商户号
//   var content = 'Casting照片消费';
//   var key = merchant.key;//key为商户平台设置的密钥key
//   var nonce_str = Math.random().toString(36).substr(2, 15); //随机数
//   var notify_url = config.homeEntry.url+'/payment/notify_url';//回调地址
//   var out_trade_no = new Date().getTime()+openid.substr(9,15);//订单号
//   var spbill_create_ip = '39.104.65.233';
//   var trade_type = 'JSAPI';//交易类型
//   //第一次签名
//   var stringA = "appid="+appid+"&body="+content+"&mch_id="+mch_id+"&nonce_str="+nonce_str+"&notify_url="+notify_url+"&openid="+openid+"&out_trade_no="+out_trade_no+"&sign_type=MD5&spbill_create_ip="+spbill_create_ip+"&total_fee="+total_fee+"&trade_type="+trade_type;
//   var stringSignTemp = stringA+"&key="+key; //注：key为商户平台设置的密钥key
//   var sign=md5(stringSignTemp).toString().toUpperCase();//注：MD5签名方式
//   //var timestamp = new Date().getTime();
//   var body = '<xml> ' +
//    '<appid>'+appid+'</appid> ' +
//    '<body>'+content+'</body> ' +
//    '<mch_id>'+mch_id+'</mch_id> ' +
//    '<nonce_str>'+nonce_str+'</nonce_str> ' +
//    '<notify_url>'+notify_url+'</notify_url>' +
//    '<openid>'+openid+'</openid> ' +
//    '<out_trade_no>'+out_trade_no+'</out_trade_no>'+
//    '<spbill_create_ip>'+spbill_create_ip+'</spbill_create_ip> ' +
//    '<total_fee>'+total_fee+'</total_fee> ' +
//    '<trade_type>'+trade_type+'</trade_type> ' +
//    '<sign_type>MD5</sign_type> ' +
//    '<sign>'+sign+'</sign> ' + // 此处必带签名， 否则微信在验证数据的时候是不通过的
//    '</xml>';
//   var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
//   request({  
//     url: url,  
//     method: 'POST',  
//     body: body  
//    }, function(err, response, body) {  
//      if (!err && response.statusCode == 200) {  
//        //将xml转换成json
//        xmlParser.parseString(body, function (err, result) {
//        var data = {};//网页端调起支付所需参数
//        data.appid = appid;
//        data.timeStamp = Math.round((new Date().getTime())/1000);
//        data.nonceStr = nonce_str;
//        data.prepay_id = result.xml.prepay_id;
//        data.signType = "MD5";
//        console.log(data.timeStamp);
//        //第二次签名
//        var stringB = "appId="+appid+"&nonceStr="+nonce_str+"&package=prepay_id="+data.prepay_id+"&signType=MD5&timeStamp="+ data.timeStamp;
//        var stringSignTemp1 = stringB+"&key="+key;
//        var paySign = md5(stringSignTemp1).toString().toUpperCase();//注：MD5签名方式
//        data.paySign = paySign;//MD5微信签名
//        var params = urllib.parse(req.url,true); 
//        if (params.query && params.query.callback) { 
//           var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
//           res.send(str);            
//        } 
//     });
//      } else {  
//         console.log(err);  
//      }  
//   });
// }
