var keystone = require('keystone'),
  User = keystone.list('User');

var fs = require("fs");
var query = require('../../query/util/savePictureToServer.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
  var userid = req.body.userid;
  //var appid = req.body.appid;
  var imgData = req.body.imgData;
  console.log(req.body);
  var newdate = new Date().getTime();
  var location = userid+'/'+newdate+'.jpg';
  var medianame = newdate+'.jpg';
  var path='images/compress_users/';
  var item={};
  if(userid==undefined){
      res.status(403).send('parameter undefined');
  }else{
    //res.header('Access-Control-Allow-Origin', '*');
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");//过滤掉data:image/jpg;base64
    var dataBuffer = new Buffer(base64Data, 'base64');//将图片转换成base64
    var dataArray = [path,userid,location,dataBuffer];
    query.savePictureToServer(dataArray,function(err){
       if(err){
         throw new Error(err);
       }else{
           User.model.findOne()
          .where('_id',userid)
          .exec(function(err,ret){
             if(err){
                throw new Error(err);
             }else{
               if(ret.compress_images.length==0){//第一次添加
                   item.filename=location;
                   item.originalname=medianame;
                   item.path=path;
                   ret.compress_images.push(item);
                   console.log(ret);
                   ret.save(function(err){
                      if(err){
                        res.send(err);
                      }else{
                          var  imagesURL = config.homeEntry.url+'/WX/image/compress_users/'+ userid+'/'+ medianame;
                          var data = {};
                          data.imagesURL = imagesURL;
                          console.log(imagesURL);
                          res.send(data);
                      }
                   })
                }else{//重新上传
                   var location1 = ret.compress_images;
                   console.log('/data/images/compress_users/'+location1[0].filename);
                     fs.unlink('/data/images/compress_users/'+location1[0].filename, function(err) {
                         // if (err) {
                         //   return console.error(err);
                         // }
                            console.log("deleted");                          
                            item.filename=location;
                            item.originalname=medianame;
                            item.path=path;
                            var ss=ret.compress_images.shift();//把数组的第一个元素从其中删除，并返回第一个元素的值
                            ret.compress_images.push(item);
                            console.log(ret.compress_images);
                            ret.save(function(err){
                              if(err){
                                res.send(err);
                              }else{
                                  var  imagesURL = config.homeEntry.url+'/WX/image/compress_users/'+ userid+'/'+ medianame;
                                  var data = {};
                                  data.imagesURL = imagesURL;
                                  console.log(imagesURL);
                                  res.send(data);
                              }
                            })
                      });

                }
             }
          })
       }
    });
  } 

}