var keystone = require('keystone');
var getInfo= require('../redis_cache/RedisCache.js');
var async = require('async'); 
//var query = require('../get_auth_info/GetGlobalAccessToken.js');
var request = require('request');
var fs = require('fs');
var http = require("http");
var path = require("path");
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/WX_ServerrNO_info.json', 'utf-8'));
var User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var User_Openid=keystone.list('User_Openid');
//裁剪照片上传服务器（不使用微信上传）
var saveCutPictureToServer = function(dataArray,callback){
   console.log('-----------```-------------');
   console.log(dataArray[0]);
   //console.log(process.cwd()+dataArray[0]);
   console.log('-----------```-------------');

   mkdirs('/data/'+dataArray[0],function(err){
     if (!fs.existsSync('/data/'+dataArray[0]+dataArray[1])) {
         fs.mkdirSync('/data/'+dataArray[0]+dataArray[1]);
         console.log('创建成功！');
     }else{
         console.log('文件路径已经存在，无需创建!');
     }     
     mkdirs('/data/'+dataArray[0]+dataArray[1],function(err){
        if(err){
          throw new Error(err);
        }else{
           fs.writeFile('/data/'+dataArray[0]+dataArray[2], dataArray[3], "binary", function(err){
              if(err){
                throw new Error(err);
                  console.log("fail");
              }else{
                  console.log("success");
                  callback(null);
              }
           });
        }
     });
  });       
}

function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            console.log('存在');
            callback(null);
        } else {
            console.log('不存在，要新建');
              fs.mkdirSync(dirname);
              callback(null);          
        }
    });
}
/*旧--使用微信上传图片


var downlodeImage=function(mediaId,imageLocation,userid,appid,callback){
  var data={};
  //var appid=info[1].AppID;
  //console.log(appid);
  async.waterfall([
    //  function(callback){
    //    getAppid(userid,function(err,ret){
    //        if(err){
    //           throw new Error(err);
    //        }else{
    //         callback(null,ret);
    //        }
    //    });
    // },
    //获取access token
        function(callback){//判断authorizer_access_token是否过期，过期重新获取
          query.JudgeAuthToken(appid,function(err,ret){
           if(err){
             throw new Error(err);
            }else{
              callback(null,ret);
              console.log('***************************');
              console.log(ret);
              console.log('***************************');
            }
         });
 
     },function(arg,callback){//在腾讯服务器下载图片保存到自己服务器
          var url='http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='+arg.authorizer_access_token+'&media_id='+mediaId;
          console.log(url);
          http.get(url, function(res){
              var imgData = "";
              res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
              res.on("data", function(chunk){
                  imgData+=chunk;
              });
              res.on("end", function(){
                    if(imageLocation=='1'){
                          mkdirs('/data/images/frontimage/',function(err){
                          if (!fs.existsSync('/data/images/frontimage/'+userid)) {
                            fs.mkdirSync('/data/images/frontimage/'+userid);
                            console.log('创建成功！');
                          }else{
                            console.log('文件路径已经存在，无需创建!');
                          }


                          mkdirs('/data/images/frontimage/'+userid,function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile('/data/images/frontimage/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success1");
                                        callback(null);
                                    }
                                 });
                              }
                          });
                      });
                    }
                     if(imageLocation=='2'){
                       mkdirs('/data/images/leftimage45/',function(err){

                          if (!fs.existsSync('/data/images/leftimage45/'+userid)) {
                            fs.mkdirSync('/data/images/leftimage45/'+userid);
                            console.log('创建成功！');
                          }else{
                            console.log('文件路径已经存在，无需创建!');
                          }

                          mkdirs('/data/images/leftimage45/'+userid,function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile('/data/images/leftimage45/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success2");
                                        callback(null);
                                    }
                                 });
                              }
                          });
                       });
                    }
                     if(imageLocation=='3'){
                       mkdirs('/data/images/rightimage45/',function(err){
                          //mkdirs(process.cwd()+'/images/rightimage45/'+userid,function(err){
                            if (!fs.existsSync('/data/images/rightimage45/'+userid)) {
                              fs.mkdirSync('/data/images/rightimage45/'+userid);
                              console.log('创建成功！');
                            }else{
                              console.log('文件路径已经存在，无需创建!');
                            }
                            mkdirs('/data/images/rightimage45/'+userid,function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile('/data/images/rightimage45/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success3");
                                        callback(null);
                                    }
                                 });
                              }
                            });
                          //});
                       });
                    } 

                     if(imageLocation=='4'){
                        mkdirs('/data/images/rightimage90/',function(err){

                          if (!fs.existsSync('/data/images/rightimage90/'+userid)) {
                              fs.mkdirSync('/data/images/rightimage90/'+userid);
                              console.log('创建成功！');
                            }else{
                              console.log('文件路径已经存在，无需创建!');
                            }

                          mkdirs('/data/images/rightimage90/'+userid,function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile('/data/images/rightimage90/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success5");
                                        callback(null);
                                    }
                                 });
                              }
                          });
                        });
                    }
                     if(imageLocation=='5'){
                        mkdirs('/data/images/leftimage90/',function(err){

                          if (!fs.existsSync('/data/images/leftimage90/'+userid)) {
                              fs.mkdirSync('/data/images/leftimage90/'+userid);
                              console.log('创建成功！');
                            }else{
                              console.log('文件路径已经存在，无需创建!');
                            }

                          mkdirs('/data/images/leftimage90/'+userid,function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile('/data/images/leftimage90/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success6");
                                        callback(null);
                                    }
                                 });
                              }
                          });
                        });
                    }
                     if(imageLocation=='6'){
                        mkdirs('/data/images/frontimagewaist/',function(err){

                           if (!fs.existsSync('/data/images/frontimagewaist/'+userid)) {
                              fs.mkdirSync('/data/images/frontimagewaist/'+userid);
                              console.log('创建成功！');
                            }else{
                              console.log('文件路径已经存在，无需创建!');
                            }


                          mkdirs('/data/images/frontimagewaist/'+userid,function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile('/data/images/frontimagewaist/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success7");
                                        callback(null);
                                    }
                                 });
                              }
                          });
                        });
                    }
                     if(imageLocation=='7'){
                       mkdirs('/data/images/frontimageall/',function(err){

                          if (!fs.existsSync('/data/images/frontimageall/'+userid)) {
                              fs.mkdirSync('/data/images/frontimageall/'+userid);
                              console.log('创建成功！');
                            }else{
                              console.log('文件路径已经存在，无需创建!');
                            }

                          mkdirs('/data/images/frontimageall/'+userid,function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile('/data/images/frontimageall/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success8");
                                        callback(null);
                                    }
                                 });
                              }
                          });
                       });
                    }
                     if(imageLocation=='8'){
                        mkdirs('/data/images/frontimagehead/',function(err){



                          if (!fs.existsSync('/data/images/frontimagehead/'+userid)) {
                              fs.mkdirSync('/data/images/frontimagehead/'+userid);
                              console.log('创建成功！');
                            }else{
                              console.log('文件路径已经存在，无需创建!');
                            }

                          mkdirs('/data/images/frontimagehead/'+userid,function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile('/data/images/frontimagehead/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success9");
                                        callback(null);
                                    }
                                 });
                              }
                          });
                        });
                    }
                    if(imageLocation=='9'){
                      mkdirs('/data/images/artimage/',function(err){

                         if (!fs.existsSync('/data/images/artimage/'+userid)) {
                              fs.mkdirSync('/data/images/artimage/'+userid);
                              console.log('创建成功！');
                            }else{
                              console.log('文件路径已经存在，无需创建!');
                            }
                          
                        mkdirs('/data/images/artimage/'+userid,function(err){
                            if(err){
                              throw new Error(err);
                            }else{
                               fs.writeFile('/data/images/artimage/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                  if(err){
                                    throw new Error(err);
                                      console.log("down fail");
                                  }else{
                                      console.log("down success4");
                                      callback(null);
                                  }
                               });
                            }
                          });
                        });
                    }
                  
              });
          });
      }],function(err){
          if(err){
             return callback(err);
          }else{
            return callback(null);
          }
      });
}

var downlodeCareeImage=function(mediaId,userid,appid,callback){
  var data={};
  //var appid=info[1].AppID;
 // console.log(appid);
  async.waterfall([
    // function(callback){
    //    getAppid(userid,function(err,ret){
    //        if(err){
    //           throw new Error(err);
    //        }else{
    //         callback(null,ret);
    //        }
    //    });
    // },
    //获取access token
        function(callback){//判断authorizer_access_token是否过期，过期重新获取
          query.JudgeAuthToken(appid,function(err,ret){
           if(err){
             throw new Error(err);
            }else{
              callback(null,ret);
            }
         });
    
     },function(arg,callback){//在腾讯服务器下载图片保存到自己服务器
          var url='http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='+arg.authorizer_access_token+'&media_id='+mediaId;
          console.log(url);
          http.get(url, function(res){
              var imgData = "";
              res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
              res.on("data", function(chunk){
                  imgData+=chunk;
               });
              res.on("end", function(){
                     mkdirs('/data/images/careerimage/',function(err){

                         if (!fs.existsSync('/data/images/careerimage/'+userid)) {
                              fs.mkdirSync('/data/images/careerimage/'+userid);
                              console.log('创建成功！');
                            }else{
                              console.log('文件路径已经存在，无需创建!');
                            }
                          
                        mkdirs('/data/images/careerimage/'+userid,function(err){
                            if(err){
                              throw new Error(err);
                            }else{
                               fs.writeFile('/data/images/careerimage/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                  if(err){
                                    throw new Error(err);
                                      console.log("down fail");
                                  }else{
                                      console.log("down success4");
                                      callback(null);
                                  }
                               });
                            }
                          });
                        });         
              });

          });
      }],function(err){
          if(err){
             return callback(err);
          }else{
            return callback(null);
          }
      });
}

var downlodePoster=function(mediaId,productionid,userid,appid,callback){
  var data={};

  async.waterfall([

    // function(callback){
    //    getAppid(userid,function(err,ret){
    //        if(err){
    //           throw new Error(err);
    //        }else{
    //         callback(null,ret);
    //        }
    //    });

    // },
    //获取access token
        function(callback){//判断authorizer_access_token是否过期，过期重新获取
        query.JudgeAuthToken(appid,function(err,ret){
         if(err){
           throw new Error(err);
          }else{
               callback(null,ret);
          }
       });
     },function(arg,callback){//在腾讯服务器下载图片保存到自己服务器
          var url='http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='+arg.authorizer_access_token+'&media_id='+mediaId;
          console.log(url);
          http.get(url, function(res){
              var imgData = "";
              res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
              res.on("data", function(chunk){
                  imgData+=chunk;

                   if (!fs.existsSync('/data/images/production/')) {
                        fs.mkdirSync('/data/images/production/');
                        console.log('创建路径/images/production/成功！');

                        if (!fs.existsSync('/data/images/production/'+productionid)) {
                          fs.mkdirSync('/data/images/production/'+productionid);
                          console.log('创建海报成功！');
                        }else{
                          console.log('海报经存在，无需创建!');
                        }

                    }else{
                      console.log('文件路径images/production/已经存在，无需创建!');
                        if (!fs.existsSync('/data/images/production/'+productionid)) {
                          fs.mkdirSync('/data/images/production/'+productionid);
                          console.log('创建海报成功！');
                        }else{
                          console.log('海报经存在，无需创建!');
                        }
                    }




                  // mkdirs(process.cwd()+'/images/production/',function(err){
                  //   // mkdirs(process.cwd()+'/images/production/'+productionid,function(err){
                  //   //    if(err){
                  //   //      throw new Error(err);
                  //   //    }else{
                  //   //       console.log('创建成功!');
                  //   //    }
                  //   // });
                  //     if (!fs.existsSync(process.cwd()+'/images/production/'+productionid)) {
                  //       fs.mkdirSync(process.cwd()+'/images/production/'+productionid);
                  //       console.log('创建成功！');
                  //     }else{
                  //       console.log('文件路径已经存在，无需创建!');
                  //     }
                  // });
              });
              res.on("end", function(){
                 
                     fs.writeFile('/data/images/production/'+productionid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                        if(err){
                          throw new Error(err);
                            console.log("down fail");
                        }else{
                            console.log("down success");
                            callback(null);
                        }
                     });                
              });
          });
      }],function(err){
          if(err){
             return callback(err);
          }else{
            return callback(null);
          }
      });
}



var downlodeUserImage=function(mediaId,userid,appid,callback){
  var data={};
 // var appid=info[1].AppID;
 // console.log(appid);
  async.waterfall([
      
    //获取access token
        function(callback){//判断authorizer_access_token是否过期，过期重新获取
          query.JudgeAuthToken(appid,function(err,ret){
           if(err){
             throw new Error(err);
            }else{
                 callback(null,ret);
            }
         });
    
     },function(arg,callback){//在腾讯服务器下载图片保存到自己服务器
          var url='http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='+arg.authorizer_access_token+'&media_id='+mediaId;
          console.log(url);
          http.get(url, function(res){
              var imgData = "";
              res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
              res.on("data", function(chunk){
                  imgData+=chunk;
              });
              res.on("end", function(){
                 mkdirs('/data/images/users/',function(err){
                          if (!fs.existsSync('/data/images/users/'+userid)) {
                              fs.mkdirSync('/data/images/users/'+userid);
                              console.log('创建成功！');
                            }else{
                              console.log('文件路径已经存在，无需创建!');
                            }

                          mkdirs('/data/images/users/'+userid,function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile('/data/images/users/'+userid+'/'+mediaId+'.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success9");
                                        callback(null);
                                    }
                                 });
                              }
                          });
                        });
                  
              });
          });
      }],function(err){
          if(err){
             return callback(err);
          }else{
            return callback(null);
          }
      });
}
*/

var getAppid=function(userid,callback){
  console.log('useriduseriduseriduseriduseriduseriduseriduserid');
  console.log(userid);
  // User.model.findOne()
  // .where('_id',userid)
  // .exec(function(err,ret1){
  //    if(ret1==null){
  //        throw new Error(err);
  //    }else{
       // async.each(ret1.openIDArray,function(item,next){
           User_Openid.model.findOne()
            .where('userid',userid)
            .exec(function(err,ret2){
               if(err){
                  throw new Error(err);
               }else{    
                 // if(ret2==null){
                 //   next();
                 // } else{
                     BoundUserAndPublic.model.findOne()
                       .where('openID',ret2.openID)
                       .exec(function(err,ret3){
                           if(err){
                              throw new Error(err);
                          }else{
                            PublicAccount.model.findOne()
                             .where('_id',ret3.appid)
                             .exec(function(err,ret4){
                                 if(err){
                                    throw new Error(err);
                                 }else{
                                   callback(null,ret4);
                                 }
                             })
                          }
                      })
                // }
               }
            })
       // })
           
      }
  //})




module.exports = {
  //downlodeImage : downlodeImage,
  mkdirs : mkdirs,
  // downlodeCareeImage : downlodeCareeImage,
  // downlodePoster : downlodePoster,
  // downlodeUserImage:downlodeUserImage,
  getAppid:getAppid,
  saveCutPictureToServer : saveCutPictureToServer
}