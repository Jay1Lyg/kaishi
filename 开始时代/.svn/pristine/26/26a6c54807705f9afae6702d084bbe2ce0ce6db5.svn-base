
var urllib = require('url');
var keystone = require('keystone'),
	User = keystone.list('User');
var async = require('async');

exports = module.exports = function(req, res) {
  var name = req.params.name;
  User.model.findOne()
  .where('artname',name)
  .exec(function(err,ret){
    if(err){
      throw new Error(err);
    }else{
      if(ret==null){
        User.model.findOne()
        .where('realname',name)
        .exec(function(err,ret1){
          if(err){
            throw new Error(err);
          }else{
             if(ret1==null){
               throw new Error('no body');
             }else{
             	ret1.allok = false;
             	ret1.save(function(err){
                   if(err){
		              throw new Error(err);
		           }else{
		           	res.send('success!');
		           }
             	});
             }
          }
        })
      }else{
      	ret.allok = false;
      	ret.save(function(err){
           if(err){
              throw new Error(err);
           }else{
           	res.send('success!');
           }
      	});
      }
      	
    }
  })

}