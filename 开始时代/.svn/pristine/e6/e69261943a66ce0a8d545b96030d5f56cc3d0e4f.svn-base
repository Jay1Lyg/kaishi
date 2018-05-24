var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var userid=req.params.userid;
  var old_actorTemplateInUser_id = req.params.old_actorTemplateInUser_id || '';
  var new_actorTemplateInUser_id = req.params.new_actorTemplateInUser_id || '';
  var appid = req.params.appid;
  var openid = req.params.openid;
    res.render('page_payFashionInsiderActorTemplate', {
        userid : userid,
        old_actorTemplateInUser_id : old_actorTemplateInUser_id,
        new_actorTemplateInUser_id : new_actorTemplateInUser_id,
        appid : appid,
        openid : openid
    });
};