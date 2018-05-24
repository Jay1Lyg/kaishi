var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var userid=req.params.userid;
  var appid = req.params.appid;
    res.render('page_previewGreenshadeofyouthActorTemplate', {
        userid : userid,
        appid : appid
    });
};