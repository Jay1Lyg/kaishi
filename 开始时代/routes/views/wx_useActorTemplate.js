var keystone = require('keystone'),
	ActorTemplate = keystone.list('ActorTemplate'),
	ActorTemplateInUser = keystone.list('ActorTemplateInUser');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var urllib = require('url');
//立即使用模板接口
//  1.将更换之前的模板状态改为未使用
//  2.将新模板状态改为正在使用
exports = module.exports = function(req, res){
  var user_id = req.body.user_id || '';
  var old_actorTemplateInUser_id = req.body.old_actorTemplateInUser_id || '';
  var new_actorTemplateInUser_id = req.body.new_actorTemplateInUser_id || '';
  console.log(req.body);
  // var user_id = '5a97cb0319fac0fa0626ae51';
  // var old_actorTemplateInUser_id = '5aa9d28951ba8e600eb5e115';
  // var new_actorTemplateInUser_id = '5aa9d28951ba8e600eb5e116';
  var data = {} ;
  ActorTemplateInUser.model.findOne()
  .where('user_id',user_id)
  .where('_id',old_actorTemplateInUser_id)
  .exec(function(err,ret){
     if(err){
       throw new Error(err);
     }else{
       ret.ifUsed = 2;
       ret.save(function(err){
       	 if(err){
            throw new Error(err);
       	 }else{
            ActorTemplateInUser.model.findOne()
    			 .where('user_id',user_id)
    			 .where('_id',new_actorTemplateInUser_id)
    			 .exec(function(err,ret1){
              if(err){
                 throw new Error(err);
              }else{
                if(ret1.ifCanBeUsed == false){//模板不可用
                   throw new Error('ActorTemplate can not be used');
                }else{
                	ret1.ifUsed = 1;
                	ret1.save(function(err){
                     if(err){
                       throw new Error(err);
                     }else{
                        data.actorTemplateInUser_id = ret1._id;
          						  data.actorTemplate_id = ret1.actorTemplate_id;
          						  data.user_id = ret1.user_id;
          						  data.ifCanBeUsed = ret1.ifCanBeUsed;
          						  data.ifUsed = ret1.ifUsed;
          						  //res.send(data);
          						  var params = urllib.parse(req.url,true);
          					       if(data == null){
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
          					             var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
          					             res.send(str);           
          					         } 
          					       }
                     }
                   });
                }
             }
           })
       	 }
       });
     }
  })
}