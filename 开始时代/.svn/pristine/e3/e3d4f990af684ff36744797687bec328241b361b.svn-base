var keystone = require('keystone'),
	ActorTemplate = keystone.list('ActorTemplate'),
	ActorTemplateInUser = keystone.list('ActorTemplateInUser');
var urllib = require('url');
exports = module.exports = function(req, res){
   var name = req.params.name;
   ActorTemplate.model.create({
   	  name:name
   },function(err){
     if(err){
        throw new Error(err);
     }else{
     	res.send('success');
     }
   })

}