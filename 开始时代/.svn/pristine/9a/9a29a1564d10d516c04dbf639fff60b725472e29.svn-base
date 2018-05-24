var keystone = require('keystone');
var path = require('path');

exports = module.exports = function(req, res) {
	var mid = req.params.mediaid;
	var imgname = req.params.imagename;
	var location = req.params.location;
	var image_path = '/data/images/'+location+'/'+ mid + '/' +imgname;
	// res.sendfile( path.resolve('images/users/'+ mid + '/' +imgname));
	//res.sendfile( path.resolve('images/'+location+'/'+ mid + '/' +imgname));
	//res.sendfile( path.resolve('images/'+location+'/'+ mid + '/' +imgname));
	res.sendfile(image_path);
};