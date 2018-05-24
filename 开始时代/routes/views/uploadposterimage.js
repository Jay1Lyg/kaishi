/**
*author@zheng 
*上传影视海报的接口
*
*/
var keystone = require('keystone'),
  	Production = keystone.list('Production');
var fs = require("fs");
var query = require('../../query/util/downImageToNative.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
    var productionid = req.body.production_id;
	//var user_id = req.body.user_id;
	//var appid = req.body.appid;
	var newdate = new Date().getTime();
	var location = productionid+'/'+newdate+'.jpg';
	var imgData = req.body.imgData;
    var medianame = newdate+'.jpg';
    var path='images/production/';
    var item={};
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var dataArray = [path,productionid,location,dataBuffer];
	query.saveCutPictureToServer(dataArray,function(err){//从官方服务器下载图片到自己服务器
	     if(err){
	        res.send(err);
	     }else{//将图片保存到数据库
	       Production.model.findOne()
	        .where('_id',productionid)
	        .exec(function(err,ret){
	           if(err){
	              throw new Error(err);
	           }else{
	           	  if(ret.images.length==0){
                       item.filename = location;
		               item.originalname=medianame;
		               item.path=path;
		               ret.images.push(item);
		               ret.save(function(err){
		                  if(err){
		                    res.send(err);
		                  }else{
		                  	var  imagesURL = config.homeEntry.url+'/WX/poster/production/'+ productionid+'/'+ medianame;
		                    res.send(imagesURL);
		                  }
		               })
	           	  }else{
		                fs.unlink('/data/images/production/'+productionid+'/'+(ret.images)[0].originalname, function(err) {
		                    // if (err) {
		                    //   return console.error(err);
		                    // }
		                      console.log("deleted");
		                      // ret.images=[];
		                      // ret.save(function(err){
		                      // 	 if (err) console.log('delete images failed');
		                      // })
		                		item.filename=location; 
				               	item.originalname=medianame;
				               	item.path=path;
				               	ret.images.shift();
				               	ret.images.push(item);
				               	ret.save(function(err){
				                  if(err){
				                    res.send(err);
				                  }else{
				                  	var imagesURL = config.homeEntry.url+'/WX/poster/production/'+ productionid+'/'+ medianame;
				                    res.send(imagesURL);
				                  }
				               })
		                });


                        
                   }
	               
	           }
	        })
	     }
  	});

}


