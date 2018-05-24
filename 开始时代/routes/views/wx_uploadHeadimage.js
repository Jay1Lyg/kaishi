var keystone = require('keystone'),
  User = keystone.list('User');

var fs = require("fs");
var query = require('../../query/util/downImageToNative.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
  var userid = req.body.userid;
  var imgData = req.body.imgData;
  var newdate = new Date().getTime();
  var location = userid+'/'+newdate+'.jpg';
  var medianame = newdate+'.jpg';
  var path='images/users/';
  var item={};
  if(userid==undefined){
      res.status(403).send('parameter undefined');
  }else{
      var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");//过滤掉data:image/jpg;base64
      var dataBuffer = new Buffer(base64Data, 'base64');//将图片转换成base64
      var dataArray = [path,userid,location,dataBuffer];
      query.saveCutPictureToServer(dataArray,function(err){//将图片保存到服务器
         if(err){
            res.send(err);
         }else{//将图片保存到数据库
           User.model.findOne()
            .where('_id',userid)
            .exec(function(err,ret){
               if(err){
                  throw new Error(err);
               }else{
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
                console.log(ret);
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
                  if(ret.images.length==0){

                       item.filename=location;
                       item.originalname=medianame;
                       item.path=path;
                       ret.images.push(item);
                       console.log(ret);
                       ret.save(function(err){
                          if(err){
                            res.send(err);
                          }else{
                            res.send(config.homeEntry.url+'/WX/image/users/'+location);
                          }
                       })
                  }else{
                     var location1 = ret.images;
                     //console.log(process.cwd()+'/images/users/'+location1[0].filename);
                       fs.unlink('/data/images/users/'+location1[0].filename, function(err) {
                           // if (err) {
                           //   return console.error(err);
                           //   }
                              console.log("deleted");
                             
                              item.filename=location;
                              item.originalname=medianame;
                              item.path=path;
                              var ss=ret.images.shift();
                              ret.images.push(item);
                              console.log(ret.images);
                              ret.save(function(err){
                                if(err){
                                  res.send(err);
                                }else{
                                  var  imagesURL = config.homeEntry.url+'/WX/image/users/'+ location;
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

}

