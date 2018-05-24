var keystone = require('keystone'),
  CareerImage = keystone.list('CareerImage'),
	CareerInResume = keystone.list('CareerInResume');
var fs = require("fs");
var query = require('../../query/util/downImageToNative.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
  var userid = req.body.userid;
  var mediaId = req.body.media;
  var appid = req.body.appid;
  //var production_id = req.body.production_id;
  var careeInResumeid = req.body.careerInResume_id;
  var index = req.body.index;
  var location = userid+'/'+mediaId+'.jpg';
  var medianame = mediaId+'.jpg';
  var path='images/careerimage/';
  var item={};
  console.log(req.body);
 //将图片保存到数据库
       // if(careeInResumeid==null||careeInResumeid=='null'||careeInResumeid==''){//第一次上传
           CareerInResume.model.findOne()
            .where('_id',careeInResumeid)
            .exec(function(err,ret){
               if(err){
                 throw new Error(err);
               }else{
                if(index==''){
                   item.filename=location;
                   item.originalname=medianame;
                   item.path=path;
                   console.log(ret);
                   //ret.images=[];
                   ret.images.push(item);           
                   console.log(ret.images);
                   ret.save(function(err){
                      if(err){
                        res.send(err);
                      }else{
                         query.downlodeCareeImage(mediaId,userid,appid,function(err){//从官方服务器下载图片到自己服务器
                             if(err){
                                res.send(err);
                             }else{
                               var imagesURL=config.homeEntry.url+'/WX/career/careerimage/'+ userid+'/'+ mediaId+'.jpg';
                               res.send(imagesURL);
                             }
                         })
                      }
                   })
                }else{
                  console.log('====================================');
                  console.log(ret);
                      var location1 = ret.images[index];
                      console.log(location1);
                     fs.unlink('/data/images/careerimage/'+location1.filename, function(err) {
                        if (err) {
                          return console.error(err);
                        }else{
                          console.log('删除成功');
                           //ret.images[index]={};
                           // console.log( ret.images);
                            ret.images.splice(index,1)  
                            // ret.images[index].filename='';
                            // ret.images[index].originalname='';
                            // ret.images[index].path='';
                            ret.save(function(err){
                              res.redirect('/WX/wx_searchsingleworkexp/'+userid+'/'+careeInResumeid+'/'+req.body.appid);
                            })
                         
                        }

                        //  item.filename=location;
                        //  item.originalname=medianame;
                        //  item.path=path;
                        //  //ret.images.push(item);  
                        //  ret.images.splice(index,1,item)        
                        //  ret.save(function(err){
                        //     if(err){
                        //       res.send(err);
                        //     }else{
                        //       var imagesURL='http://kaishi.viphk.ngrok.org/WX/career/careerimage/'+ userid+'/'+ mediaId+'.jpg';
                        //       console.log('kkk');
                        //       res.send(imagesURL);
                        //     }
                        // })

                     });

                      // CareerInResume.model.findOne()
                      //       .where('_id',careeInResumeid)
                      //       .exec(function(err,ret1){
                               
                      //          item.filename=location;
                      //          item.originalname=medianame;
                      //          item.path=path;
                      //          ret1.images.push(item);           
                      //          ret1.save(function(err){
                      //             if(err){
                      //               res.send(err);
                      //             }else{
                      //               var imagesURL='http://kaishi.viphk.ngrok.org/WX/career/careerimage/'+ userid+'/'+ mediaId+'.jpg';
                      //               console.log('kkk');
                      //               res.send(imagesURL);
                      //             }
                      //         })
                      //     })

                }
                 
              }
            })

}


  