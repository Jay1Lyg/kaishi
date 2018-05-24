var keystone = require('keystone');
var path = require('path');

exports = module.exports = function(req, res) {
    var location = req.params.location;
	var uid = req.params.userid;
	var imagename = req.params.imagename;
	// console.log('============================`````=============================');
	// console.log(path.resolve('images/'+location+'/'+ uid + '/' +imagename));
	// console.log('============================`````=============================');
	// res.sendfile( path.resolve('images/'+location+'/'+ uid + '/' +imagename));

	var image_path = '/data/images/'+location+'/'+ uid + '/' +imagename;
    console.log('^^^^^^^^^^^^^^^^^^^^image_path^^^^^^^^^^^^^^^^^^^^^^^^^');
    console.log(image_path);
    console.log('^^^^^^^^^^^^^^^^^^^^image_path^^^^^^^^^^^^^^^^^^^^^^^^^');
	res.sendfile(image_path);
};