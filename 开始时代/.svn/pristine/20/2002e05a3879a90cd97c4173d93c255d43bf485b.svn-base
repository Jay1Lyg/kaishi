var keystone = require('keystone'),
	ActorTemplate = keystone.list('ActorTemplate'),
	ActorTemplateInUser = keystone.list('ActorTemplateInUser');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var urllib = require('url');

exports = module.exports = function(req, res){
   var userid = req.body.userid;
   var data = {};
   console.log(req.body);
   ActorTemplateInUser.model.findOne()
   .where('user_id',userid)
   .where('ifCanBeUsed',true)
   .where('ifUsed',1)
   .exec(function(err,ret){
      if(err){
        throw new Error(err);
      }else{
        console.log('----------ret-----------------');
        console.log(ret);
        console.log('----------ret-----------------');
        ActorTemplate.model.findOne()
        .where('_id',ret.actorTemplate_id)
        .exec(function(err,ret1){
           if(err){
             throw new Error(err);
           }else{
           	  data.actorTemplateName=ret.name;
           	  data.actorTemplate_id=ret1._id;
           	  data.user_id=userid;
           	  data.ifCanBeUsed =ret.ifCanBeUsed;
           	  data.ifUsed=ret.ifUsed;
           	  data.actorTemplateInUser_id=ret._id;
           	  var params = urllib.parse(req.url,true);
		       //res.send(arg);
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
        })
      }
   })
}