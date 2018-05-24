var keystone = require('keystone'),
	ActorTemplate = keystone.list('ActorTemplate'),
	ActorTemplateInUser = keystone.list('ActorTemplateInUser');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var urllib = require('url');
var async = require('async');

exports = module.exports = function(req, res){
  //var appid = req.params.appid;
  User.model.find()
   .where('allok',true)
   //.where('appid',appid)
   .exec(function(err,ret){
     if(err){
       throw new Error(err);
     }else{
       async.eachSeries(ret,function(item,next){
       	 async.waterfall([
       	   function(callback){//青春绿茵
             ActorTemplateInUser.model.findOne()
	         .where('actorTemplate_id','5aa8cc41689a88630a88478f')
	         .where('user_id',item._id)
	         .exec(function(err,ret1){
	            if(err){
	              throw new Error(err);
	            }else{
	              if(ret1==null){
	                ActorTemplateInUser.model.create({
	                   actorTemplate_id:'5aa8cc41689a88630a88478f',
	                   user_id:item._id,
	                   ifCanBeUsed:true,
	                   ifUsed : 1,
	                },function(err,ret2){
	                   if(err){
	                     throw new Error(err);
	                   }else{
	                     callback(null);
	                   }
	                })
	              }else{
	              	callback(null);
	              }
	            }
	         })
       	   },function(callback){//大气蓝调
             ActorTemplateInUser.model.findOne()
	         .where('actorTemplate_id','5aa8cc50689a88630a884790')
	         .where('user_id',item._id)
	         .exec(function(err,ret1){
	            if(err){
	              throw new Error(err);
	            }else{
	              if(ret1==null){
	                ActorTemplateInUser.model.create({
	                   actorTemplate_id:'5aa8cc50689a88630a884790',
	                   user_id:item._id,
	                   ifCanBeUsed:true,
	                   ifUsed : 2,
	                },function(err,ret2){
	                   if(err){
	                     throw new Error(err);
	                   }else{
	                     callback(null);
	                   }
	                })
	              }else{
	              	 callback(null);
	              }
	            }
	         })
       	   },function(callback){//时尚达人
              ActorTemplateInUser.model.findOne()
		         .where('actorTemplate_id','5aa8cc5f689a88630a884791')
		         .where('user_id',item._id)
		         .exec(function(err,ret1){
		            if(err){
		              throw new Error(err);
		            }else{
		              if(ret1==null){
		                ActorTemplateInUser.model.create({
		                   actorTemplate_id:'5aa8cc5f689a88630a884791',
		                   user_id:item._id,
		                   ifCanBeUsed:false,
		                   ifUsed : 2,
		                },function(err,ret2){
		                   if(err){
		                     throw new Error(err);
		                   }else{
		                     callback(null);
		                   }
		                })
		              }else{
		              	 callback(null);
		              }
		            }
		         })
       	   }
       	 ],function(err){
            if(err){
              throw new Error(err);
            }else{
              next();
            }
       	 })
        
       },function(err){
          if(err){
            throw new Error(err);
          }else{
          	res.send('success!');
          }
       });
     }
   })



}