var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
exports = module.exports = function (req, res) {
  var userid=req.params.userid;
  var old_actorTemplateInUser_id = req.params.old_actorTemplateInUser_id;
  var new_actorTemplateInUser_id = req.params.new_actorTemplateInUser_id;
  var appid = req.params.appid;
    res.render('page_useAtmosphericBluesActorTemplate', {
        userid : userid,
        old_actorTemplateInUser_id : old_actorTemplateInUser_id,
        new_actorTemplateInUser_id : new_actorTemplateInUser_id,
        appid : appid
    });
};