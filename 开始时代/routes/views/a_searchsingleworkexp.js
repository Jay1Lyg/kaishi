var async = require('async');
var format = require('../../query/save_and_get_data_in_MongoDB/resume/format.js');
var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
var  User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var CareerInResume = keystone.list('CareerInResume');
var format = require('../../query/save_and_get_data_in_MongoDB/resume/format.js');
var urllib = require('url');

//var config = require('../../public/conf/common.js');
exports = module.exports = function(req, res) {
   var userid=req.params.userid;
   var appid=req.params.appid;
   var careerInResume_id=req.params.careerInResume_id;
    CareerInResume.paginate({
      page: 1,
      perPage: 20,
      maxPages: 10000
    })
    .where('user_id', userid)
    .populate('pro_object role')
    .where('_id',careerInResume_id)
    .exec(function(err,rsm){
      console.log("Info:"+JSON.stringify(rsm));
        format.getWorkExpByhand(rsm,function(err,ret){//查询手填的参演经历
           if(err){
              throw new Error(err);
           }else{
                console.log(ret);
                
                var params = urllib.parse(req.url,true);
            if(ret== null){
                //console.log('请求1:'+params);
              if (params.query && params.query.callback) {
                  //console.log('请求2:'+params.query);
                  var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
                res.send(str);
              } else {
                res.send(JSON.stringify({}));//普通的json
              }
            }else{
              if (params.query && params.query.callback) {
                  //console.log('请求2:'+params.query); 
                   var str =  params.query.callback + '(' + JSON.stringify(ret) + ')';//jsonp
                 res.send(str);           
              } 
          }
      }
        });
    })
}

