var keystone = require('keystone'),
  CareerImage = keystone.list('CareerImage'),
  CareerInResume = keystone.list('CareerInResume');
var fs = require("fs");
var query = require('../../query/util/downImageToNative.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
  //var appid = req.body.appid;
  var userid = req.body.userid;
  var careeInResumeid = req.body.careerInResume_id;
  var index = req.body.index;
  var imgData = req.body.imgData;
  var newdate = new Date().getTime();
  var location = userid+'/'+newdate+'.jpg';
  var medianame = newdate+'.jpg';
  var path='images/careerimage/';
  var item={};
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
  console.log(req.body);
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
 //将图片保存到数据库
       // if(careeInResumeid==null||careeInResumeid=='null'||careeInResumeid==''){//第一次上传
        if(careeInResumeid==undefined||index==undefined){
            res.status(403).send('parameter undefined');
        }else{
          var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
          var dataBuffer = new Buffer(base64Data, 'base64');
          var dataArray = [path,userid,location,dataBuffer];
           CareerInResume.model.findOne()
            .where('_id',careeInResumeid)
            .exec(function(err,ret){
               if(err){
                 throw new Error(err);
               }else{
                if(index==1){
                   item.filename=location;
                   item.originalname=medianame;
                   item.path=path;
                   console.log(ret);
                   ret.images.push(item);           
                   console.log(ret.images);
                   ret.save(function(err){
                      if(err){
                        res.send(err);
                      }else{
                         query.saveCutPictureToServer(dataArray,function(err){//从官方服务器下载图片到自己服务器
                             if(err){
                                res.send(err);
                             }else{
                               var imagesURL=config.homeEntry.url+'/WX/career/careerimage/'+ userid+'/'+ medianame+'.jpg';;
                               res.send(imagesURL);
                             }
                         })
                      }
                   })
                }else{
                  console.log('====================================');
                  console.log(ret);
                  console.log(ret.images.length==0);
                  console.log('====================================');
                      var location1 = ret.images[0];
                      console.log(location1);
                      if(ret.images.length==0){
                         item.filename=location;
                         item.originalname=medianame;
                         item.path=path;
                         console.log(ret);
                         ret.images.push(item);           
                         console.log(ret.images);
                         ret.save(function(err){
                            if(err){
                              res.send(err);
                            }else{
                               query.saveCutPictureToServer(dataArray,function(err){//从官方服务器下载图片到自己服务器
                                   if(err){
                                      res.send(err);
                                   }else{
                                     var imagesURL=config.homeEntry.url+'/WX/career/careerimage/'+ userid+'/'+ medianame+'.jpg';;
                                     res.send(imagesURL);
                                   }
                               })
                            }
                         })
                      }else{
                         fs.unlink('/data/images/careerimage/'+location1.filename, function(err) {
                            // if (err) {
                            //   return console.error(err);
                            // }else{
                              console.log('删除成功');
                                ret.images[0].filename=location;
                                ret.images[0].originalname=medianame;
                                ret.images[0].path=path;
                                ret.save(function(err){
                                  query.saveCutPictureToServer(dataArray,function(err){//从官方服务器下载图片到自己服务器
                                       if(err){
                                          res.send(err);
                                       }else{
                                         var imagesURL=config.homeEntry.url+'/WX/career/careerimage/'+ userid+'/'+ medianame+'.jpg';;
                                         res.send(imagesURL);
                                       }
                                  })
                                })
                             
                            // }

                         });
                   }
                }
                 
              }
            })
        }
}



  