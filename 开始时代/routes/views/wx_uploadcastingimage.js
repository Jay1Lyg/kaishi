var keystone = require('keystone'),
  Compress_Casting = keystone.list('Compress_Casting');
var fs = require("fs");
var query = require('../../query/util/downImageToNative.js');
var config = require('../../public/conf/common.js');
// var packData=function(imageLocation,userid,callback){
//   var array = [];
//   Compress_Casting.model.findOne()
//   .where('user_id',userid)
//   .exec(function(err, casting) {
//      if(err){
//        throw new Error(err);
//      }else{
//         if(imageLocation == '1'){
//           var path='images/compress_frontimage';
//           var path1='images/compress_frontimage/';
//           var compress_frontimage = casting.compress_frontimage;
//           array=[path,path1,compress_frontimage];
//           callback(null,array);
//         }else if(imageLocation == '2'){
//           var path='images/compress_leftimage45';
//           var path1='images/compress_leftimage45/';
//           var compress_leftimage45 = casting.compress_leftimage45;
//           array=[path,path1,compress_leftimage45];
//           callback(null,array);
//         }else if(imageLocation == '3'){
//           var path='images/compress_rightimage45';
//           var path1='images/compress_rightimage45/';
//           var compress_rightimage45 = casting.compress_rightimage45;
//           array=[path,path1,compress_rightimage45];
//           callback(null,array);
//         }else if(imageLocation == '4'){
//           var path='images/compress_rightimage90';
//           var path1='images/compress_rightimage90/';
//           var compress_rightimage90 = casting.compress_rightimage90;
//           array=[path,path1,compress_rightimage90];
//           callback(null,array);
//         }else if(imageLocation == '5'){
//           var path='images/compress_leftimage90';
//           var path1='images/compress_leftimage90/';
//           var compress_leftimage90 = casting.compress_leftimage90;
//           array=[path,path1,compress_leftimage90];
//           callback(null,array);
//         }else if(imageLocation == '6'){
//           var path='images/compress_frontimagewaist';
//           var path1='images/compress_frontimagewaist/';
//           var compress_frontimagewaist = casting.compress_frontimagewaist;
//           array=[path,path1,compress_frontimagewaist];
//           callback(null,array);
//         }else if(imageLocation == '7'){
//           var path='images/compress_frontimageall';
//           var path1='images/compress_frontimageall/';
//           var compress_frontimageall = casting.compress_frontimageall;
//           array=[path,path1,compress_frontimageall];
//           callback(null,array);
//         }else if(imageLocation == '8'){
//           var path='images/compress_frontimagehead';
//           var path1='images/compress_frontimagehead/';
//           var compress_frontimagehead = casting.compress_frontimagehead;
//           array=[path,path1,compress_frontimagehead];
//           callback(null,array);
//         }else if(imageLocation == '9'){
//           var path='images/compress_artimage';
//           var path1='images/compress_artimage/';
//           var compress_artimage = casting.compress_artimage;
//           array=[path,path1,compress_artimage];
//           callback(null,array);
//         }     
//      }
//   })
// }

var saveImage=function(imageLocation,userid,callback){
  var item={};
  Casting.model.findOne()
  .where('user_id',userid)
  .exec(function(err, casting) {
        if(imageLocation=='1'){
           var date = new Date().getTime();
           var location = userid+'/'+date+'.jpg';
           var medianame = date+'.jpg';
           var path='images/frontimage';
           var path1='images/frontimage/';
           var dataArray = [path1,userid,location];
          if(casting==null){
              Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.frontimage.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/frontimage/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
          }else{
             item.filename=location;
             item.originalname=medianame;
             item.path=path;
             casting.frontimage.push(item);
             casting.save(function(err){
                if(err){
                  res.send(err);
                }else{
                  var url=config.homeEntry.url+'/WX/casting/frontimage/'+userid+'/'+medianame;
                  callback(null,url,dataArray);
                }
             })
          }
          
        }if(imageLocation=='2'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/leftimage45';
            var path1='images/leftimage45/';
            var dataArray = [path1,userid,location];
            if(casting==null){
              Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.leftimage45.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/leftimage45/'+userid+'/'+date+'.jpg';
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               casting.leftimage45.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                   // res.send('http://kaishi.viphk.ngrok.org/WX/casting/leftimage45/'+userid+'/'+mediaId+'.jpg');
                    var url=config.homeEntry.url+'/WX/casting/leftimage45/'+userid+'/'+date+'.jpg';
                    callback(null,url,dataArray);
                  }
               })
            }
            
          
        }if(imageLocation=='3'){
           var date = new Date().getTime();
           var location = userid+'/'+date+'.jpg';
           var medianame = date+'.jpg';
           var path='images/rightimage45';
           var path1='images/rightimage45/';
           var dataArray = [path1,userid,location];
          if(casting==null){
              Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.rightimage45.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/rightimage45/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 casting.rightimage45.push(item);
                 casting.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      //res.send('http://kaishi.viphk.ngrok.org/WX/casting/rightimage45/'+userid+'/'+mediaId+'.jpg');
                      var url=config.homeEntry.url+'/WX/casting/rightimage45/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
            }
           
          
        }if(imageLocation=='4'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/rightimage90';
            var path1='images/rightimage90/';
            var dataArray = [path1,userid,location];
             if(casting==null){
              Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.rightimage90.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/rightimage90/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               casting.rightimage90.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                    //res.send('http://kaishi.viphk.ngrok.org/WX/casting/rightimage90/'+userid+'/'+mediaId+'.jpg');
                    var url=config.homeEntry.url+'/WX/casting/rightimage90/'+userid+'/'+ medianame;
                    callback(null,url,dataArray);
                  }
               })
            }
          
        }if(imageLocation=='5'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/leftimage90';
            var path1='images/leftimage90/';
            var dataArray = [path1,userid,location];
            if(casting==null){             
              Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.compress_leftimage90.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/leftimage90/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               casting.leftimage90.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                    //res.send('http://kaishi.viphk.ngrok.org/WX/casting/leftimage90/'+userid+'/'+mediaId+'.jpg');
                    var url=config.homeEntry.url+'/WX/casting/leftimage90/'+userid+'/'+medianame;
                    callback(null,url,dataArray);
                  }
               })
          
            }
        }if(imageLocation=='6'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/frontimagewaist';
            var path1='images/frontimagewaist/';
            var dataArray = [path1,userid,location];
             if(casting==null){
              Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.frontimagewaist.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/frontimagewaist/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 casting.frontimagewaist.push(item);
                 casting.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/frontimagewaist/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
          
            }
          
        }if(imageLocation=='7'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/frontimageall'; 
            var path1='images/frontimageall/'; 
            var dataArray = [path1,userid,location];
            if(casting==null){
              Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.frontimageall.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/frontimageall/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 casting.frontimageall.push(item);
                 casting.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/frontimageall/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
            }
          
        }if(imageLocation=='8'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/frontimagehead'; 
            var path1='images/frontimagehead/'; 
            var dataArray = [path1,userid,location];
            if(casting==null){
              Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.frontimagehead.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/frontimagehead/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               casting.frontimagehead.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                    //res.send('http://kaishi.viphk.ngrok.org/WX/casting/frontimagehead/'+userid+'/'+mediaId+'.jpg');
                    var url=config.homeEntry.url+'/WX/casting/frontimagehead/'+userid+'/'+medianame;
                    callback(null,url,dataArray);
                  }
               })
            }
          
        }if(imageLocation=='9'){
            var date = new Date().getTime();
            var location = userid+'/'+date+'.jpg';
            var medianame = date+'.jpg';
            var path='images/artimage'; 
            var path1='images/artimage/'; 
            var dataArray = [path1,userid,location];
           if(casting==null){
              
              Casting.model.create({user_id:userid},function(err,ret){
                 item.filename=location;
                 item.originalname=medianame;
                 item.path=path;
                 ret.artimage.push(item);
                 ret.save(function(err){
                    if(err){
                      res.send(err);
                    }else{
                      var url=config.homeEntry.url+'/WX/casting/artimage/'+userid+'/'+medianame;
                      callback(null,url,dataArray);
                    }
                 })
              })
            }else{
               item.filename=location;
               item.originalname=medianame;
               item.path=path;
               console.log('----------@-----------');
               console.log(item);
               console.log(casting);
               console.log('----------@-----------');
               casting.artimage.push(item);
               casting.save(function(err){
                  if(err){
                    res.send(err);
                  }else{
                    //res.send('http://kaishi.viphk.ngrok.org/WX/casting/artimage/'+userid+'/'+mediaId+'.jpg');
                     var url=config.homeEntry.url+'/WX/casting/artimage/'+userid+'/'+medianame;
                     callback(null,url,dataArray);
                  }
               })
            }
          
        }         
    });

}

exports = module.exports = function(req, res) {
  var userid = req.body.userid;
  var imgData = req.body.imgData;
  var imageLocation = req.body.imageLocation;
 // var appid = req.body.appid;
  var location;
  var url;
  var item={};
  if(imgData!=undefined){//上传
     var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
     var dataBuffer = new Buffer(base64Data, 'base64');
      if(imageLocation==undefined||userid==undefined){
        res.status(403).send('parameter undefined');
      }else{
          saveImage(imageLocation,userid,function(err,ret,array){
             if(err){
                throw new Error(err);
             }else{
                array.push(dataBuffer);
                query.saveCutPictureToServer(array,function(err){
                   if(err){
                      res.send(err);
                   }else{
                     var data = {};
                     data.imagesURL = ret;
                     res.send(data);
                   }
                });
             }
          });
      }
  }else{//删除
     Casting.model.findOne()
      .where('user_id',userid)
      .exec(function(err, casting) { 
         if(err){
           throw new Error(err);
         }else{
          if(casting==null){
               throw new Error('already deleted');
          }else{
            var location;
              var url;
              if(imageLocation == '1'){
                location = casting.frontimage;
                url = 'frontimage';
              }else if(imageLocation == '2'){
                location = casting.leftimage45;
                url = 'leftimage45';
              }else if(imageLocation == '3'){
                location = casting.rightimage45;
                url = 'rightimage45';
              }else if(imageLocation == '4'){
                location = casting.rightimage90;
                url = 'rightimage90';
              }else if(imageLocation == '5'){
                location = casting.leftimage90;
                url = 'leftimage90';
              }else if(imageLocation == '6'){
                location = casting.frontimagewaist;
                url = 'frontimagewaist';
              }else if(imageLocation == '7'){
                location = casting.frontimageall;
                url = 'frontimageall';
              }else if(imageLocation == '8'){
                location = casting.frontimagehead;
                url = 'frontimagehead';
              }else if(imageLocation == '9'){
                location = casting.artimage;
                url = 'artimage';
              }

              if(location.length != 0){ 
                fs.unlink('/data/images/'+url+'/'+location[0].filename, function(err) {
                    if (err) {
                      return console.error(err);
                    }
                      console.log("deleted");
                });
                  //delete iamge in db
                if(imageLocation == '1'){
                  casting.frontimage = [];        
                }else if(imageLocation == '2'){
                  casting.leftimage45 = [];               
                }else if(imageLocation == '3'){
                  casting.rightimage45 = [];                
                }else if(imageLocation == '4'){
                  casting.rightimage90 = [];                  
                }else if(imageLocation == '5'){
                  casting.leftimage90 = [];                 
                }else if(imageLocation == '6'){
                  casting.frontimagewaist = [];                 
                }else if(imageLocation == '7'){
                  casting.frontimageall = [];
                }else if(imageLocation == '8'){
                  casting.frontimagehead = [];              
                }else if(imageLocation == '9'){
                  casting.artimage = [];
                }
                
                casting.save(function (err) {
                  if (err) console.log('delete images failed');
                   var str = 'success!';
                   console.log('delete success!');
                   res.send(str);
                    
                });   
              } else{
                  throw new Error('already deleted!');
              }
          }
         }
      })   

  }
}

// exports = module.exports = function(req, res) {
//   var userid = req.body.userid;
//   var imgData = req.body.imgData;
//   var imageLocation = req.body.imageLocation;
//   var appid = req.body.appid;
//   var location;
//   var url;
//   var item={};
//   var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
//   var dataBuffer = new Buffer(base64Data, 'base64');
//   console.log(req.body);
//        Compress_Casting.model.findOne()
//         .where('user_id',userid)
//         .exec(function(err, casting) {          
//             if(casting == null){
//               if(imageLocation==undefined||userid==undefined){
//                 res.status(403).send('parameter undefined');
//               }else{
//                   saveImage(imageLocation,userid,function(err,ret,array){
//                      if(err){
//                         throw new Error(err);
//                      }else{
//                         array.push(dataBuffer);
//                         query.savePictureToServer(array,function(err){
//                            if(err){
//                               res.send(err);
//                            }else{
//                              var data = {};
//                              data.imagesURL = ret;
//                              res.send(data);
//                            }
//                         });
//                      }
//                   });
//               }
//             }else{
//               if(imageLocation==undefined||userid==undefined){
//                 res.status(403).send('parameter undefined');
//               }
//               var location;
//               var url;
//               if(imageLocation == '1'){
//                 location = casting.compress_frontimage;
//                 url = 'compress_frontimage';
//                 console.log('hhhhhhhhhhhhh0000000000hhhhhhhhhhhhhhhhhhh');
//                 console.log(casting);
//                 console.log('hhhhhhhhhhhhh000000000000hhhhhhhhhhhhhhhhhhh');
//               }else if(imageLocation == '2'){
//                 location = casting.compress_leftimage45;
//                 url = 'compress_leftimage45';
//               }else if(imageLocation == '3'){
//                 location = casting.compress_rightimage45;
//                 url = 'compress_rightimage45';
//               }else if(imageLocation == '4'){
//                 location = casting.compress_rightimage90;
//                 url = 'compress_rightimage90';
//               }else if(imageLocation == '5'){
//                 location = casting.compress_leftimage90;
//                 url = 'compress_leftimage90';
//               }else if(imageLocation == '6'){
//                 location = casting.compress_frontimagewaist;
//                 url = 'compress_frontimagewaist';
//               }else if(imageLocation == '7'){
//                 location = casting.compress_frontimageall;
//                 url = 'compress_frontimageall';
//               }else if(imageLocation == '8'){
//                 location = casting.compress_frontimagehead;
//                 url = 'compress_frontimagehead';
//               }else if(imageLocation == '9'){
//                 location = casting.compress_artimage;
//                 url = 'compress_artimage';
//               }
//               console.log(location);
//               if(location.length != 0){ 
//                 fs.unlink(process.cwd()+'/images/'+url+'/'+location[0].filename, function(err) {
//                     if (err) {
//                       return console.error(err);
//                     }
//                       console.log("deleted");
//                 });
//                   //delete iamge in db
//                 if(imageLocation == '1'){
//                   casting.compress_frontimage = [];        
//                 }else if(imageLocation == '2'){
//                   casting.compress_leftimage45 = [];               
//                 }else if(imageLocation == '3'){
//                   casting.compress_rightimage45 = [];                
//                 }else if(imageLocation == '4'){
//                   casting.compress_rightimage90 = [];                  
//                 }else if(imageLocation == '5'){
//                   casting.compress_leftimage90 = [];                 
//                 }else if(imageLocation == '6'){
//                   casting.compress_frontimagewaist = [];                 
//                 }else if(imageLocation == '7'){
//                   casting.compress_frontimageall = [];
//                 }else if(imageLocation == '8'){
//                   casting.compress_frontimagehead = [];              
//                 }else if(imageLocation == '9'){
//                   casting.compress_artimage = [];
//                 }
                
//                 casting.save(function (err) {
//                   if (err) console.log('delete images failed');
//                   console.log('ffffffffffffffffffffffffffffffffffffs');
//                   //res.redirect('/WX/wx_userprofile/'+userid+'/'+req.body.appid);
//                   //var
//                    var str = '';
//                    res.send(str);
//                   //res.send('ok');
                    
//                 });   
//               } else{

//                 saveImage(imageLocation,userid,function(err,ret,array){
//                      if(err){
//                         throw new Error(err);
//                      }else{
//                       console.log('--------------array-------------');
//                       console.log(array);
//                       console.log('--------------array-------------');
//                        array.push(dataBuffer);
//                        query.savePictureToServer(array,function(err){
//                            if(err){
//                               res.send(err);
//                            }else{
//                              var data = {};
//                              data.imagesURL = ret;
//                              res.send(data);
//                            }
//                         });
//                      }
//                   });
//               }

//             }
//         })

// }