var keystone = require('keystone'),
	ActorTemplate = keystone.list('ActorTemplate'),
	ActorTemplateInUser = keystone.list('ActorTemplateInUser');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var urllib = require('url');

exports = module.exports = function(req, res){
  var user_id = req.body.user_id;
  var new_actorTemplateInUser_id = req.body.new_actorTemplateInUser_id || '';
  console.log(req.body);
  ActorTemplateInUser.model.findOne()
  .where('user_id',user_id)
  .where('_id',new_actorTemplateInUser_id)
  .exec(function(err,ret){
    if(err){
       throw new Error(err);
    }else{
       console.log(ret);
       ret.ifCanBeUsed = true;
       ret.save(function(err){
          if(err){
            throw new Error(err);
          }else{
          	var data = {};
          	data.actorTemplateInUser_id = ret._id;
            data.actorTemplate_id = ret.actorTemplate_id;
            data.user_id = ret.user_id;
            data.ifCanBeUsed = true;
            data.ifUsed = ret.ifUsed;
            var params = urllib.parse(req.url,true); 
    		    if (params.query && params.query.callback) {	
    		       var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
    		       res.send(str);	          
    		    } 
          }
       });
    }
  })
}