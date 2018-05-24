var keystone = require('keystone'),
	ActorTemplate = keystone.list('ActorTemplate'),
	ActorTemplateInUser = keystone.list('ActorTemplateInUser');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var urllib = require('url');

exports = module.exports = function(req, res){
  var user_id = req.body.user_id || '';
 // var user_id = '5a97cb0319fac0fa0626ae51';
 console.log(req.body);
  async.waterfall([
  	function(callback){//关联默认免费使用模板1
      var data = {};
      data.name = '青春绿荫';
      data.user_id = user_id;
      search.createActorTemplateInUser(data,function(err){
        if(err){
          throw new Error(err);
        }else{
          console.log('step1');
          callback(null);
        }
      });
  	},function(callback){//关联免费模板2
      var data = {};
      data.name = '大气蓝调';
      data.user_id = user_id;
      search.createActorTemplateInUser(data,function(err){
        if(err){
          throw new Error(err);
        }else{
          console.log('step2');
          callback(null);
        }
      });
  	},function(callback){//关联付费模板
      var data = {};
      data.name = '时尚达人';
      data.user_id = user_id;
      search.createActorTemplateInUser(data,function(err){
        if(err){
          throw new Error(err);
        }else{
          console.log('step3');
          callback(null);
        }
      });
  	},
  	function(callback){//查询各模板状态
       ActorTemplateInUser.model.find()
       .where('user_id',user_id)
       .exec(function(err,ret){
         if(err){
           throw new Error(err);
         }else{
           search.getActorTemplateStatus(ret,function(err,info){
              if(err){
                 throw new Error(err);
              }else{
              	console.log('step4');
              	 callback(null,info);
              }
           });
         }
       })
  	}
  ],function(err,arg){
     if(err){
       throw new Error(err);
     }else{
       console.log('step5');
       var params = urllib.parse(req.url,true);
       //res.send(arg);
       if(arg == null){
         if (params.query && params.query.callback) {
            //console.log('请求2:'+params.query);
            var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
            res.send(str);
         }else {
            res.send(JSON.stringify({}));//普通的json
         }
       }else{
         if (params.query && params.query.callback) {
              //console.log('请求2:'+params.query); 
             var str =  params.query.callback + '(' + JSON.stringify(arg) + ')';//jsonp
             res.send(str);           
         } 
       }
     }
  })
  
}