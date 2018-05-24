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


var savePictureToServer = function(dataArray,callback){
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
//测试图片的保存
var saveTestPictureToServer = function(dataArray,callback){
   console.log('-----------```-------------');
   console.log(dataArray[0]);
   console.log(process.cwd()+dataArray[0]);
   console.log('-----------```-------------');
   // path='/data/testimage/image/';
   // location = new Date().getTime()+'.jpg';
   // var dataArray = [path,location,dataBuffer];
   
   // mkdirs(dataArray[0],function(err){
   //   if (!fs.existsSync(dataArray[0]+dataArray[1])) {
   //       fs.mkdirSync(dataArray[0]+dataArray[1]);
   //       console.log('创建成功！');
   //   }else{
   //       console.log('文件路径已经存在，无需创建!');
   //   }     
   //   mkdirs(dataArray[0]+dataArray[1],function(err){
   //      if(err){
   //        throw new Error(err);
   //      }else{
           fs.writeFile(dataArray[0]+dataArray[1], dataArray[2], "binary", function(err){
              if(err){
                  throw new Error(err);
                  console.log("fail");
              }else{
                  console.log("success");
                  callback(null);
              }
           });
  //       }
  //    });
  // });       
}

module.exports = {
  savePictureToServer : savePictureToServer,
  mkdirs : mkdirs ,
  saveTestPictureToServer : saveTestPictureToServer
}