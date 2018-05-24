var keystone = require('keystone');
var path = require('path');

exports = module.exports = function(req, res) {
	var mid = req.params.mediaid;
	var imgname = req.params.imagename;
	//res.sendfile( path.resolve('images/usermedia/'+ mid + '/' +imgname));
	var image_path = '/data/images/usermedia/'+mid+'/'+ imagename;
    console.log('^^^^^^^^^^^^^^^^^^^^image_path^^^^^^^^^^^^^^^^^^^^^^^^^');
    console.log(image_path);
    console.log('^^^^^^^^^^^^^^^^^^^^image_path^^^^^^^^^^^^^^^^^^^^^^^^^');
	// res.sendfile( path.resolve('images/users/'+ mid + '/' +imgname));
	//res.sendfile( path.resolve('images/'+location+'/'+ mid + '/' +imgname));
	//res.sendfile( path.resolve('images/'+location+'/'+ mid + '/' +imgname));
	res.sendfile(image_path);
};