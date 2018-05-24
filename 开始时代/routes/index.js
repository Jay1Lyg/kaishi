
/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var cors = require('cors');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};
// Setup Route Bindings
exports = module.exports = function (app) {


    app.use(cors());
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);


	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	/*
	*
	*
	*    微信页面的url
	*
	*
	*/
	app.get('/AuthTestView', routes.views.AuthTestView);//授权页面测试  authod@yizheng

	/*
	*
	*     微信第三方平台的授权认证
	*
	*/
	app.post('/ServerAuth', routes.views.ServerAuth);//第三方平台的授权认证  author@yizheng
	app.post('/getMessage/:APPID?', routes.views.getMessage);//公众号消息与事件接收URL  author@yizheng
	app.all('/crypted', routes.views.crypted);//node.js aes解密测试  author@yizheng
	app.all('/WexinAuth', routes.views.WexinAuth);//微信授权流程逻辑  author@yizheng
	app.all('/SolveAuthCode', routes.views.SolveAuthCode);// 处理预授权码的问题  author@yizheng
	app.all('/GetWeiXinAdminInfo',  routes.views.GetWeiXinAdminInfo);// 拉取授权方管理员的信息 author@yizheng
	app.all('/WebpageAuthorization/:index',  routes.views.WebpageAuthorization);// 网页授权 author@dongjia
    app.all('/serverConfig', routes.views.serverConfig);//微信接口配置
    
    /*

    *
    *       微信js安全接口域名认证
    *
    *
    */
    app.all('/MP_verify_jbYJ26O7GiwqY3wr\.txt', routes.views.MP_verify_jbYJ26O7GiwqY3wr);  //紫螺安全
    app.all('/MP_verify_Tz6FhEU9IYDoAbCX\.txt', routes.views.MP_verify_Tz6FhEU9IYDoAbCX);  //小潘副导演工作室
    app.all('/MP_verify_39nwxlJeiaY4fXMW\.txt', routes.views.MP_verify_39nwxlJeiaY4fXMW);//副导演助手
    app.all('/MP_verify_pZcf884YHBUHNqhS\.txt', routes.views.MP_verify_pZcf884YHBUHNqhS);//副导演王钶的工作室
    app.all('/1382327454\.txt', routes.views.MP_verify_1382327454);
    app.all('/MP_verify_i1kqV2sxnvIseCNX\.txt', routes.views.MP_verify_i1kqV2sxnvIseCNX);   
	 /*
	*
	*     js_SDK 获取config信息
	*
	*/
	app.get('/JssdkConfig',routes.views.JssdkConfig);


    /*
    *
    *    注册登陆相关接口
    *
    */
    app.get('/WX/SMSverification', routes.views.SMSverification);//注册--发送验证码
    app.get('/WX/SMSverificationForChangePsw', routes.views.SMSverificationForChangePsw);//修改密码--发送验证码
    app.post('/WX/wx_sendtelphoneandpassword', routes.views.wx_sendtelphoneandpassword);// 注册后台
    app.post('/WX/wx_signin', routes.views.wx_signin);//登录后台接口
    app.get('/WX/page_register/:index?/:openid/:appid', routes.views.page_register);//注册页面
    app.get('/WX/page_signin/:index?/:openid/:appid', routes.views.page_signin);//登录页面
    app.get('/WX/page_changePassword/:index/:openid/:appid', routes.views.page_changePassword);//修改密码页面
    app.get('/WX/page_alreadySignin', routes.views.page_alreadySignin);//已经登录提示页面
    app.get('/Wx/wx_changeuserpassword', routes.views.wx_changeuserpassword);// 改变用户密码

    
    /*
	*
	*     副导演--简历相关接口
	*
	*/  
    app.all('/WX/wx_JudgeResume', routes.views.wx_JudgeResume);//判断用户是否填写过简历
    app.post('/WX/wx_BasicInfoSave', routes.views.wx_BasicInfoSave);//新---副导演--保存简历第一步，第二步，第三步，第四步与经纪人共用，见经纪人模块
    app.post('/WX/wx_editResumeInfo', routes.views.wx_editResumeInfo);//编辑演员资料
    app.post('/WX/uploadcastingimage', routes.views.wx_uploadcastingimage);//上传casting照片
    app.post('/WX/uploadCompresscastingimage', routes.views.wx_uploadCompresscastingimage);//上传casting照片（缩略图）
    //app.post('/WX/uploadcareerimage', routes.views.uploadcareerimage);//上传剧照
    app.post('/WX/uploadHeadimage', routes.views.wx_uploadHeadimage);//上传封面(大图)
    app.post('/WX/uploadCompressHeadimage', routes.views.wx_uploadCompressHeadimage);//上传封面(缩略图)
    app.get('/WX/casting/:location?/:userid/:imagename', routes.views.wx_showCasting);//显示casting照片
    app.get('/WX/career/:location?/:userid/:imagename', routes.views.wx_showCareerImage);//显示剧照
    app.get('/WX/image/:location?/:mediaid/:imagename', routes.views.wx_showUserIcon);//显示封面照
    //app.get('/WX/compress_users/:mediaid/:imagename', routes.views.wx_showCompressUserIcon);//显示封面照(缩略图)
    app.get('/WX/page/:userid/:appid/:openid',routes.views.page);//点击简历管理跳转的页面，在该页面ajax请求后台接口，判断当前用户是否填写过简历
    app.get('/WX/page_addNewActors/:userid/:appid/:index/:openid', routes.views.page_addNewActors);//新————添加新用户
    app.get('/WX/page_userInfoEdit/:userid/:appid/:openid', routes.views.page_userInfoEdit);//演员详情编辑页面

    //演员选择模板
    //app.get('/WX/page_chooseActorTemplate/:userid/:appid/:openid',routes.views.page_chooseActorTemplate);//选择Casting模板
    app.get('/WX/page_chooseActorTemplate',routes.views.page_chooseActorTemplate);//选择Casting模板
    app.post('/WX/wx_searchActorTemplateStatus',routes.views.wx_searchActorTemplateStatus);//查询演员模板状态
    app.get('/WX/wx_addActorTemplate/:name',routes.views.wx_addActorTemplate);//添加Casting模板
    app.post('/WX/wx_useActorTemplate',routes.views.wx_useActorTemplate);//使用Casting模板
    app.get('/WX/page_useGreenshadeofyouthActorTemplate/:userid/:old_actorTemplateInUser_id/:new_actorTemplateInUser_id/:appid',routes.views.page_useGreenshadeofyouthActorTemplate);//点击可使用但未使用的模板进入青春绿荫预览页面（带“立即使用”按钮）
    app.get('/WX/page_previewGreenshadeofyouthActorTemplate/:userid/:appid',routes.views.page_previewGreenshadeofyouthActorTemplate);//点击正在使用的模板进入青春绿荫预览页面（即分享页面）
    app.get('/WX/page_useAtmosphericBluesActorTemplate/:userid/:old_actorTemplateInUser_id/:new_actorTemplateInUser_id/:appid',routes.views.page_useAtmosphericBluesActorTemplate);//点击可使用但未使用的模板进入大气蓝调预览页面（带“立即使用”按钮）
    app.get('/WX/page_previewAtmosphericBluesActorTemplate/:userid/:appid',routes.views.page_previewAtmosphericBluesActorTemplate);//点击正在使用的模板进入大气蓝调预览页面（即分享页面）
	
    app.get('/WX/page_payFashionInsiderActorTemplate/:userid/:old_actorTemplateInUser_id/:new_actorTemplateInUser_id/:appid/:openid',routes.views.page_payFashionInsiderActorTemplate);//点击付费模板进入付费页面
    app.all('/WX/wx_payActorTemplate',routes.views.wx_payActorTemplate); //付费模板支付
    app.post('/WX/wx_changeActorTemplatePayStatus',routes.views.wx_changeActorTemplatePayStatus); //模板支付成功后改变模板状态
    app.get('/WX/page_usePayFashionInsiderActorTemplate/:userid/:old_actorTemplateInUser_id/:new_actorTemplateInUser_id/:appid',routes.views.page_usePayFashionInsiderActorTemplate);//付费成功后跳转到立即使用页面
    app.get('/WX/page_previewPayFashionInsiderActorTemplate/:userid/:appid',routes.views.page_previewPayFashionInsiderActorTemplate);//点击正在使用的模板进入时尚达人预览页面（即分享页面）
   
    app.post('/WX/wx_searchActorTemplate',routes.views.wx_searchActorTemplate); //查询当前用户选用的模板




    app.post('/WX/wx_resumeBasicInfoSave', routes.views.wx_resumeBasicInfoSave);//旧（没被应用）
	app.post('/WX/wx_savesingleeduexp', routes.views.wx_savesingleeduexp);//旧（没被应用）
	app.post('/WX/wx_savesingleskill', routes.views.wx_savesingleskill);//旧（没被应用）
	app.post('/WX/wx_savemyintroduce', routes.views.wx_savemyintroduce);//旧（没被应用）
	app.post('/WX/wx_savesingleworkexp', routes.views.wx_savesingleworkexp);//旧（没被应用）
	app.get('/WX/wx_searchmyintroduce/:userid', routes.views.wx_searchmyintroduce);//旧（没被应用）
	app.get('/WX/wx_searchsingleeduexp/:userid/:appid', routes.views.wx_searchsingleeduexp);//旧（没被应用）
	app.get('/WX/wx_searchsingleworkexp/:userid/:careerInResume_id/:appid', routes.views.wx_searchsingleworkexp);//旧（没被应用）
	app.get('/WX/wx_searchsingleskill/:userid/:careerInResume_id', routes.views.wx_searchsingleskill);//旧（没被应用）
    app.get('/WX/wx_userprofile/:userid/:appid', routes.views.wx_userprofile);//旧（没被应用）
    app.get('/WX/delete/wx_singleworkexp/:careerinresumeid/:userid/:appId', routes.views.wx_deletesingleworkexp);//旧（没被应用）
    app.get('/page_basicinfo',routes.views.page_basicinfo);//旧（没被应用）
    app.get('/WX/page_work_edit/:userid/:appid',routes.views.page_work_edit);//旧（没被应用）


    /*

    *副导演--发布通告

    */
    app.get('/WX/page_productionDetail/:user_id/:openid/:appid',routes.views.page_productionDetail);//发布通告的通告信息页面 author@zheng
    app.all('/WX/page_posterInfo/:production_id/:production_crews_id/:user_id/:openid/:appid',routes.views.page_posterInfo);//海报页面 author@zheng
    app.all('/WX/wx_publishpositionInfo/:user_id/:openid/:appid', routes.views.wx_publishpositionInfo);// 发布通告---保存剧目信息
    app.post('/WX/uploadposterimage', routes.views.uploadposterimage);//上传海报(大图)
    app.post('/WX/uploadCompressposterimage', routes.views.uploadCompressposterimage);//上传海报（缩略图）
    app.all('/WX/page_roleList/:user_id/:production_id/:production_crews_id/:openid/:appid', routes.views.page_roleList);//发布第三步--（1）层页面 
    app.all('/WX/page_positionDetail/:user_id/:production_crews_id/:openid/:roletag_id/:production_id',routes.views.page_positionDetail);//发布第三步-- 添加角色页面
    app.all('/WX/page_editpositionDetail/:careerincrewid',routes.views.page_editpositionDetail);//发布第三步--编辑角色页面
    app.all('/WX/wx_pubulishpositiondetail/:user_id/:production_crews_id/:openid/:roletag_id', routes.views.wx_pubulishpositiondetail);//将添加的角色信息保存
    app.all('/WX/wx_searchoneroleinfo/:careerincrewid', routes.views.wx_searchoneroleinfo);//发布职位---查询单条角色信息
    app.all('/WX/wx_searchallroleinfo/:production_crews_id', routes.views.wx_searchallroleinfo);//发布职位---查询所有角色信息
    app.all('/WX/wx_editroleinfo/:careerincrewid', routes.views.wx_editroleinfo);//发布职位---编辑单条角色信息
    app.all('/WX/wx_deleteroleinfo/:careerincrewid', routes.views.wx_deleteroleinfo);//发布职位---删除单条角色信息
    app.all('/WX/wx_postposition/:productionid/:userid/:appid/:openid/:production_crews_id', routes.views.wx_postposition);//发布职位--点击发布并筛选--发布通告
    app.all('/WX/wx_searchmatchpositioninfo/:careerincrewid/:page', routes.views.wx_searchmatchpositioninfo);//发布职位--第二次点击发布并筛选--在数据库拿匹配数据
    

    app.all('/WX/wx_Publishingandscreening/:careerincrewsid', routes.views.wx_Publishingandscreening);//发布职位--点击发布并筛选--根据careerincrewsid筛选出相应演员信息
    app.get('/WX/page_crewlistformatching/:productionCrew_id/:user_id', routes.views.page_crewlistformatching);//点击发布并筛选--跳到职位列表页面
    app.get('/WX/page_userlistformatching/:careerincrewsid/:userid', routes.views.page_userlistformatching);//发布并筛选--点击查看演员--跳到演员列表页面
    app.get('/WX/poster/:location?/:productionid/:imagename', routes.views.wx_showPoster);
    //app.get('/WX/compress_poster/:location?/:productionid/:imagename', routes.views.wx_showCompressPoster);//显示缩略图
    app.get('/WX/page_cansee', routes.views.page_cansee);//发布权限提示页面
    app.post('/WX/wx_postproject',routes.views.wx_postproject);// 发布职位中的项目管理方法 （旧，未应用）
    app.get('/WX/wx_searchposter/:productionid/:author/:crewsId', routes.views.wx_searchposter);//（旧，未应用）
    app.post('/WX/uploadPoster', routes.views.wx_uploadPoster);//（旧，未应用）
    app.post('/WX/wx_postpositionInfo',routes.views.wx_postpositionInfo);// 发布职位信息（旧，未应用）
    app.get('/WX/page_uploadPoster/:productionid/:crewsId/:author',routes.views.page_uploadPoster);//（旧，未应用）
    app.all('/WX/page_positionDetail2/:user_id/:production_crews_id/:openid/:firstCreate',routes.views.page_positionDetail2);//发布通告的职位信息页面（旧，未应用）
    //发布并筛选--每天凌晨执行一次 executePositionMatchActorEveryMoring

    /*

    *副导演--通告列表

    */
    app.get('/WX/page_allpositions/:user_id/:appid/:openid', routes.views.page_allpositions);//通告列表---剧组列表渲染页面
    app.all('/WX/wx_allcrewlist/:page?/:appid/:openid/:time?', routes.views.wx_allcrewlist);//通告列表，查询剧组列表
    app.get('/WX/page_positionsDetails/:user_id/:productionCrew_id/:appid/:openid', routes.views.page_positionsDetails);//通告列表---剧目详情渲染页面
    app.all('/WX/wx_searchpositionDetails/:productionCrew_id/:user_id', routes.views.wx_searchpositionDetails);//通告列表，剧目详情--给别人看的，挂起的通告不显示
    app.all('/WX/wx_applyforposition/:user_id?/:author_id?/:careerincrew_id?', routes.views.wx_applyforposition);// 申请职位，关联应聘者
    app.all('/WX/wx_matchproduction/:page?/:appid/:openid/:time/:categoryid/:repertoiretypeid/:isregistered', routes.views.wx_matchproduction);//通告列表，条件筛选
    app.get('/WX/page_searchPositions/:openid?/:appid?/:userid', routes.views.page_searchPositions);//搜索页面--（待定）
    app.all('/WX/wx_allfuzzyquerry/:index?/:name?/:page?/:openid?/:appid', routes.views.wx_allfuzzyquerry);// 模糊搜索项目和职位 index:0全文搜索 1搜项目 2搜职位（待定）
    app.all('/WX/wx_positionList/:productionCrew_id/:user_id', routes.views.wx_positionList);//剧组下职位列表页面（旧，未使用）
    app.all('/WX/page_positionList/:productionCrew_id/:user_id/:appid', routes.views.page_positionList);//剧组下职位列表>>通告列表（旧，未使用）
    app.all('/WX/wx_allpositions/:productiontype?/:rolecategory?/:area?/:isregistered?/:page?/:name?/:appid/:openid/:time?', routes.views.wx_allpositions);//（旧，未使用）
      /*

    *副导演--通告管理

    */

    //1.通过用户id检索其发布过的所有的剧组--采用角色信息里的接口
    //2.查询通告详情--采用通告列表查询通告详情
    app.all('/WX/wx_editpositioninfo/:productionid', routes.views.wx_editpositioninfo);//编辑剧目信息
    app.all('/WX/wx_searchallpositionDetails/:productionCrew_id/:user_id', routes.views.wx_searchallpositionDetails);//通告列表，剧目详情--给自己看的，挂起的通告也显示
    app.all('/WX/wx_hangupOrrecoverypposition/:productionid/:status', routes.views.wx_hangupOrrecoverypposition);//通告挂起/恢复
    //app.all('/WX/wx_recoveryposition/:productionid', routes.views.wx_recoveryposition);//恢复挂起
    app.all('/WX/wx_hangupOrrecoverycareerinfo/:careerincrewid/:status', routes.views.wx_hangupOrrecoverycareerinfo);//挂起/恢复通告的角色
    app.get('/WX/page_searchpublishCrews/:user_id/:openid',routes.views.page_searchpublishCrews);// 渲染页面--通过用户id检索其发布过的所有的剧目
    app.all('/WX/page_editpositioninfo/:productionid/:productioncrew_id/:userid/:openid', routes.views.page_editpositioninfo);//编辑剧目信息页面
    app.all('/WX/page_editcareerincrewinfo/:careerincrewid', routes.views.page_editcareerincrewinfo);//编辑角色信息页面
    app.all('/WX/page_searchmanagepositionDetails/:productionCrew_id/:user_id', routes.views.page_searchmanagepositionDetails);//通告列表，剧目详情(管理员查看)

    //通告模板分享
     app.all('/WX/page_chooseTemplate/:productionCrew_id/:appid', routes.views.page_chooseTemplate);//选择通告模板页面
     app.all('/WX/page_YouthTemplate/:productionCrew_id/:appid', routes.views.page_YouthTemplate);//青春
     app.all('/WX/page_NostalgiaTemplate/:productionCrew_id/:appid', routes.views.page_NostalgiaTemplate);//怀旧
     app.all('/WX/page_ThrillerTemplate/:productionCrew_id/:appid', routes.views.page_ThrillerTemplate);//惊悚
     app.all('/WX/page_RuralTemplate/:productionCrew_id/:appid', routes.views.page_RuralTemplate);//乡村
     app.all('/WX/page_ScienceTemplate/:productionCrew_id/:appid', routes.views.page_ScienceTemplate);//青春
     app.all('/WX/page_RetroTemplate/:productionCrew_id/:appid', routes.views.page_RetroTemplate);//复古

    /*
    *
    *     副导演--演员列表
    *
    */  
    app.get('/WX/page_actorInfo/:appid/:openid/:userid',routes.views.page_actorInfo);//渲染演员搜索页面
    app.get('/WX/page_actorDetail/:user_id/:authorid/:appid',routes.views.page_actorDetail);////渲染演员详情页面

    //app.get('/WX/test1',routes.views.test1);////渲染演员详情页面

    app.all('/WX/wx_getalluserresums/:page?/:age?/:sex?/:appid/:openid', routes.views.wx_getalluserresums);//演员列表--展示每个公众号下的演员
    app.all('/WX/wx_getallActors/:page?/:appid/:openid', routes.views.wx_getallActors);//演员列表--展示平台上所有的演员(湖北襄阳演员只在八都显示，其它公众号均不显示)
    app.all('/WX/wx_getsearchActors/:age?/:sex?/:appid/:openid', routes.views.wx_getsearchActors);//演员列表--通过性别，年龄段筛选演员（展示平台上的演员）
    //app.all('/WX/wx_getScreeningResumes/:page?/:age?/:sex?/:appid/:openid', routes.views.wx_getalluserresums);//筛选简历
    app.all('/WX/wx_getaccurateactor/:page?/:appid/:openid', routes.views.wx_getaccurateactor);//精确筛选演员--筛选范围为公众号下的演员
    app.all('/WX/wx_getAllaccurateactor/:page?/:appid/:openid', routes.views.wx_getAllaccurateactor);//精确筛选演员--筛选范围为平台下的演员
    app.all('/WX/wx_getactorresums/:index?/:user_id', routes.views.wx_getactorresums);
    app.all('/resume/page_defaultTemplate/:appid/:userid', routes.views.page_defaultTemplate);//演员资料--默认模板页面
    //检索演员的简历信息 
      //演员列表---邀请
      app.all('/WX/wx_searchusercareerincrewsisregisterandinvitestate/:inviter_id?/:invited_id?/:page?', routes.views.wx_searchusercareerincrewsisregisterandinvitestate);//返回邀请人发布的职位（旧--未使用）
      app.all('/WX/wx_searchusercareerincrewsgroupbycrew/:inviter_id?/:invited_id?/:page?', routes.views.wx_searchusercareerincrewsgroupbycrew);//返回邀请人发布的职位，以剧组为单位
      app.post('/WX/wx_sendinvitation', routes.views.wx_sendinvitation);//发送邀请

    /*
    *
    *     获取标签
    *
    */  

    app.get('/WX/wx_allproductiontypes/:page?/:name?', routes.views.wx_allproductiontypes);//获取剧目类别标签
    app.get('/WX/wx_allrolecategories/:page?/:name?', routes.views.wx_allrolecategories);//获取角色类别标签
    app.get('/WX/wx_allrepertoiretype/:category_id', routes.views.wx_allrepertoiretype);//根据剧目类别id查询剧目类型
  
  
    /*


    *副导演--角色信息

    */
    app.get('/WX/page_publishCrews/:user_id',routes.views.page_publishCrews);// 渲染页面--通过用户id检索其发布过的所有的剧组
    app.all('/WX/wx_publishCrews/:user_id/:page',routes.views.wx_publishCrews);// 通过用户id检索其发布过的所有的剧组
    app.get('/WX/wx_publishPosition/:production_crewId?/:currentPage?/:time?', routes.views.wx_publishPosition);// 发布管理模块，通过用户id检索其发布过的所有的职位（旧--未使用）
    app.all('/WX/wx_publicMoreposition/:careerInCrews_id/:user_id', routes.views.wx_publicMoreposition);// 报名的详细信息>>发布管理（旧--未使用）
       //我邀请的
        app.all('/WX/page_positioninfo/:productionCrew_id', routes.views.page_positioninfo);//点击我邀请的--进入通告详情
        app.all('/WX/page_Inviterdrecord/:user_id?/:careerincrewid', routes.views.page_Inviterdrecord);//查询用户邀请的演员列表---页面
        app.all('/WX/wx_allsearchmyinvitation/:user_id?/:page?', routes.views.wx_allsearchmyinvitation);// 查询用户邀请别人的信息（旧--待定）
        app.all('/WX/wx_allsearchmyinvitationActor/:careerincrewid/:page/:index', routes.views.wx_allsearchmyinvitationActor);// 查询副导演邀请的演员列表
        app.get('/WX/page_RefuseactorInfo/:userid',routes.views.page_RefuseactorInfo);//拒绝邀请的演员资料（旧--待定）
        app.get('/WX/page_inviteActor/:user_id/:careerincrew_id',routes.views.page_inviteActor);//查询演员详情
        app.get('/WX/wx_searchinviteuserdetails/:userid/:careerincrew_id', routes.views.wx_searchinviteuserdetails);//查询演员详情


       //申请我的
        app.all('/WX/page_positioninfo1/:productionCrew_id', routes.views.page_positioninfo1);//点击申请我的--进入通告详情
        app.get('/WX/page_deliveryActor/:user_id/:careerincrew_id',routes.views.page_deliveryActor);//查询演员详情
        app.get('/WX/page_candidateinfo/:careerincrew_id', routes.views.page_candidateinfo);//申请人列表页面
        app.all('/WX/wx_searchcandidatesinfo/:careerincrew_id?/:currentPage?/:index', routes.views.wx_searchcandidatesinfo);//查询该条职位的候选人
       //查询候选人详细信息-----/agent/a_userprofile/:userid/null
        app.all('/WX/wx_receivecandidates/:user_id?/:careerincrew_id?/:status?', routes.views.wx_receivecandidates);//评阅简历者接收（或拒绝）简历，根据候选人的id检索到相应的简历，更改is_receive的状态码变为1（或2）（请查看Resume模型）
        app.get('/WX/wx_searchapplyuserdetails/:userid/:careerincrew_id', routes.views.wx_searchapplyuserdetails);//查询用户简历详情以及申报情况

    /*地址级联操作的三个接口*/
    app.all('/app/mallnativeplace', routes.views.mallnativeplace);//auther@cincan   获取所有的省份
	app.all('/app/mallcityunderprovince/:parencode?', routes.views.mallcityunderprovince);//auther@cincan   获取省份下面的所有市
	app.all('/app/malldistrictundercity/:parencode?', routes.views.malldistrictundercity);//auther@cincan   获取市下面所有的县和区
    /*

    *副导演--散户--投递记录

    */
    app.all('/WX/page_deliveryRecords/:user_id/:appid',routes.views.page_deliveryRecords);//投递记录页面
    app.all('/WX/wx_searchapplyposition/:user_id?/:currentPage?/:index?/:time?/:appid',  routes.views.wx_searchapplyposition);//投递记录
    app.all('/WX/wx_searchapplypositionDetails/:productionCrew_id/:user_id/:careerincrewid', routes.views.wx_searchapplypositionDetails);//通告列表，剧目详情(申请人查看)
    app.get('/WX/page_searchpositionsDetails/:productionCrew_id/:careerincrewid/:userid', routes.views.page_searchpositionsDetails);//投递记录---剧目详情渲染页面

    /*

    *副导演--散户--受邀记录

    */
    app.all('/WX/page_Invitedrecord/:user_id/:appid', routes.views.page_Invitedrecord);
    app.all('/WX/wx_allsearchmybeinvitedinfo/:user_id?/:page?/:appid', routes.views.wx_allsearchmybeinvitedinfo);// 查询用户被邀请的信息
    app.all('/WX/wx_changeinvitationstate/:invitation_id?/:state/:invited_id?', routes.views.wx_changeinvitationstate);//改变邀请状态
    app.all('/WX/wx_searchinvitepositionDetails/:productionCrew_id/:user_id/:careerincrewid', routes.views.wx_searchinvitepositionDetails);//通告列表，剧目详情(受邀人查看)
    app.get('/WX/page_searchinvitepositionsDetails/:productionCrew_id/:careerincrewid/:userid', routes.views.page_searchinvitepositionsDetails);//受邀记录---剧目详情渲染页面

     /*


    *副导演--经纪人广场

    */
      app.get('/WX/page_PublicAccountsListsUderDirector/:user_id/:myappid', routes.views.page_PublicAccountsListsUderDirector);//第一个页面--查询平台上所有经纪人人公众号
      app.all('/WX/wx_searchallagentpublicaccounts/:page', routes.views.wx_searchallagentpublicaccounts);//查询平台上所有经纪人公众号
      app.all('/WX/wx_searchpublicaccountsByName/:name/:index', routes.views.wx_searchpublicaccountsByName);//根据公众号名称查询公众号index=1---副导演，index=2---经纪人
      app.get('/WX/page_ActorListsUderAgent/:agent_appid/:user_id', routes.views.page_ActorListsUderAgent);//第二个页面--经纪人旗下演员
      app.all('/WX/wx_searchactorsUnderagentpublicaccounts/:page/:agent_appid', routes.views.wx_searchactorsUnderagentpublicaccounts);//查询经纪人公众号下的演员
      app.all('/WX/wx_searchactorsUnderagentpublicaccountsbyconditions/:agent_appid/:age?/:sex?', routes.views.wx_searchactorsUnderagentpublicaccountsbyconditions);//筛选经纪人公众号下的演员

    /*
    /*


    *副导演--生成方案

    */
     app.get('/WX/page_getAllCrewLists/:director_id/:appid', routes.views.page_getAllCrewLists);//1.页面---查询副导演发布的所有剧目
     app.get('/WX/page_generationProgramme/:director_id/:appid/:production_id', routes.views.page_generationProgramme);//1.1页面---生成方案页面
     app.all('/WX/wx_generationProgrammebySlider', routes.views.wx_generationProgrammebySlider);//生成方案：使用滑块生成方案
     app.all('/WX/wx_generationProgrammebyhand', routes.views.wx_generationProgrammebyhand);//生成方案：手动生成方案

     app.get('/WX/page_searchCrewsAndProgramme/:director_id/:appid', routes.views.page_searchCrewsAndProgramme);//2.页面---查询生成方案的剧组以及剧组下的方案
     app.all('/WX/wx_searchProgrammeList/:userid', routes.views.wx_searchProgrammeList);//查询方案列表

     app.get('/WX/page_searchProgrammeDetailsAboutHand/:production_id/:programme_id/:attribute/:director_id', routes.views.page_searchProgrammeDetailsAboutHand);//3.页面---查询手动方案详情
     app.get('/WX/page_searchProgrammeDetailsAboutSlider/:production_id/:programme_id/:attribute/:actorbudget_id/:director_id', routes.views.page_searchProgrammeDetailsAboutSlider);//3.页面---查询滑块方案详情
     app.all('/WX/wx_searchProgrammeDetails/:production_id/:actorbudget_id/:programme_id/:attribute', routes.views.wx_searchProgrammeDetails);//查询方案详情
     app.get('/WX/page_programmeActorsDetails/:userid/:directorid/:careerincrew_id/:productionid', routes.views.page_programmeActorsDetails);//页面---查询方案中演员详情
     app.get('/WX/wx_searchprogrammeuserdetails/:userid/:careerincrew_id', routes.views.wx_searchprogrammeuserdetails);//查询方案演员详情
     
    
     app.all('/WX/wx_deleteMatchingRole/:user_id/:careerincrew_id/:programme_id', routes.views.wx_deleteMatchingRole);//删除方案中的演员

     app.get('/WX/page_searchMoreMatchingActorsAboutHand/:careerincrew_id/:attribute/:director_id', routes.views.page_searchMoreMatchingActorsAboutHand);//4.页面---查询更多推荐演员(手动)
     app.get('/WX/page_searchMoreMatchingActorsAboutSlider/:careerincrew_id/:attribute/:actorbudget_id/:director_id', routes.views.page_searchMoreMatchingActorsAboutSlider);//5.页面---查询更多推荐演员(滑块)
     app.all('/WX/wx_searchMoreMatchingActors/:careerincrew_id/:attribute/:actorbudget_id/:page', routes.views.wx_searchMoreMatchingActors);//查询更多推荐演员
     app.get('/WX/page_MatchActorsDetails/:userid/:careerincrew_id/:director_id', routes.views.page_MatchActorsDetails);//8.页面---查询匹配演员详情 
     app.get('/WX/wx_searchAlternativeActorsdetails/:userid/:careerincrew_id', routes.views.wx_searchAlternativeActorsdetails);//查询演员详情(更多推荐演员)
     
     app.get('/WX/page_searchAlternativeActorsbyHand/:careerincrew_id/:programme_id', routes.views.page_searchAlternativeActorsbyHand);//6.页面---查询备选演员(手动)  
     app.all('/WX/wx_searchAlternativeActorsbyHand/:careerincrew_id/:page', routes.views.wx_searchAlternativeActorsbyHand);//查询备选演员(手动)

     app.get('/WX/page_searchAlternativeActorsbySlider/:careerincrew_id/:actorbudget_id/:programme_id', routes.views.page_searchAlternativeActorsbySlider);//7.页面---查询备选演员(滑块)  
     app.all('/WX/wx_searchAlternativeActorsbySlider/:careerincrew_id/:actorbudget_id/:page', routes.views.wx_searchAlternativeActorsbySlider);//查询备选演员(滑块)
     
     app.all('/WX/wx_deleteAlternativeActors/:user_id/:careerincrew_id', routes.views.wx_deleteAlternativeActors);//删除备选演员
     app.all('/WX/wx_addActorToAlternativemodel', routes.views.wx_addActorToAlternativemodel);//添加到备选
     app.get('/WX/page_AlternativeActorsDetails/:userid/:careerincrew_id/:programme_id/:actorbudget_id', routes.views.page_AlternativeActorsDetails);//8.页面---查询备选演员详情

    // app.all('/WX/wx_searchproductiondetailaboutprogramme/:userid/:careerincrew_id/:adderid', routes.views.wx_searchproductiondetailaboutprogramme);//查询生成过方案的所有剧目以及剧目详情
     app.all('/WX/wx_searchproductiondetailaboutprogramme/:userid/:adderid', routes.views.wx_searchproductiondetailaboutprogramme);//查询生成过方案的所有剧目以及剧目详情
     app.get('/WX/wx_addActorToProgramme/:userid/:careerincrew_id/:programme_id/:actorbudget_id', routes.views.wx_addActorToProgramme);//将备选的演员添加到方案
     app.all('/WX/wx_deleteProgramme/:programme_id', routes.views.wx_deleteProgramme);//删除方案
   /*

    *副导演--副导演看这


    */
    app.get('/page_uploadPic', function(req, res, next){
        var fs = require('fs');
        var form = fs.readFileSync('./public/html/uploadPic.html', {encoding: 'utf8'});
        res.send(form);
    });
   
    app.all('/WX/wx_upload', routes.views.wx_uploadPic.upload);//上传图片素材的接口
    app.all('/WX/wx_uploadPic/:picturematerial_id', routes.views.wx_uploadPic.uploadPic);//上传图片素材的接口
   
   /*

    *微信测试接口

    */
    app.get('/WX/test',routes.views.test);// 测试群发图文消息
    app.get('/WX/testReadCount',routes.views.testReadCount);//测试获取图文统计数据
    app.get('/WX/testGetarticlesummary',routes.views.testGetarticlesummary);//测试获取图文群发每日数据
    app.get('/WX/testGetarticletotal',routes.views.testGetarticletotal);//测试获取图文群发每日数据
    app.get('/WX/testTemplateMsg/:userid/:appid/:openid/:production_crews_id',routes.views.testTemplateMsg);//测试发送模板消息
    //app.get('/WX/testArticleDataStatistics ',routes.views.testArticleDataStatistics);//
   // app.get('/WX/testReplyMsg',routes.views.testReplyMsg);//
    app.get('/WX/testTimeMsg',routes.views.testTimeMsg);//测试获取图文统计分时数据（getuserreadhour）
    app.get('/WX/testCustomServiceMsg',routes.views.testCustomServiceMsg);//测试客服接口--发送图文消息
    app.get('/WX/QRcode',routes.views.QRcode);//生成带参数的二维码
    app.get('/WX/menue',routes.views.menue);//自定义菜单
    app.get('/WX/menue1',routes.views.menue1); //紫螺安全自定义菜单
    app.all('/WX/page_getappidForDirector',routes.views.page_getappidForDirector);//获取appid页面
    app.all('/WX/wx_getappidForDirector',routes.views.wx_getappidForDirector);//获取appid
    app.all('/WX/wx_bindOperatorForDirector',routes.views.wx_bindOperatorForDirector);//在数据库绑定运营者（副导演）
    app.all('/WX/wx_bindOperatorForAgent',routes.views.wx_bindOperatorForAgent);//在数据库绑定运营者（经纪人）
    //getOperatorAuthority 运营者获取权限

 /*
    *
    *     -------------------------------------------------------------------------------------------经纪人项目------------------------------------------------------------------------------------------------------------
    *
 */ 
    //app.post('/agent/a', routes.views.a);//剧目类型导入脚本
    app.get('/agent/a_page', routes.views.a_page);//剧目类型导入脚本--页面
    app.get('/agent/a', routes.views.a);//剧目类型导入脚本
    /*

    *微信相关接口

    */
    app.all('/agent/a_WexinAuth', routes.views.a_WexinAuth);//微信授权流程逻辑  
    app.all('/agent/a_SolveAuthCode', routes.views.a_SolveAuthCode);// 处理预授权码的问题 
    app.all('/agent/a_GetWeiXinAdminInfo',  routes.views.a_GetWeiXinAdminInfo);// 拉取授权方管理员的信息
    app.all('/agent/a_WebpageAuthorization/:index',  routes.views.a_WebpageAuthorization);// 网页授权 author@dongjia 
     /*

    *注册登陆

    */
    app.post('/agent/a_signin', routes.views.a_signin);//登录 
    
    /*

    *添加新演员

    */
    app.get('/agent/a_page_addNewActors/:agent_id/:appid', routes.views.a_page_addNewActors);//添加新用户--基本信息页面
    app.post('/agent/a_SaveBasicInfo', routes.views.a_SaveBasicInfo);//添加演员--第一步：基本信息
    app.post('/agent/a_savesingleworkexp', routes.views.a_savesingleworkexp);//添加演员--第二步：参演经历
    app.post('/agent/a_saveCareerType', routes.views.a_saveCareerType);//添加演员--第四步：保存剧目类型和剧目类别
    app.post('/agent/a_deleteCategory', routes.views.a_deleteCategory);//添加演员--第四步：删除剧目类别
    app.post('/agent/a_saveStandardOfPlay', routes.views.a_saveStandardOfPlay);//添加演员--第四步：接戏标准
    app.post('/agent/a_saveVideoUrl', routes.views.a_saveVideoUrl);//添加演员--第三步：保存用户视频url
    app.get('/agent/a_searchsingleworkexp/:userid/:careerInResume_id/:appid', routes.views.a_searchsingleworkexp);//查询单条参演经历
    app.get('/agent/a_searchAllworkexp/:userid', routes.views.a_searchAllworkexp);//查询所有参演经历
    app.post('/agent/a_uploadcareerimage', routes.views.a_uploadcareerimage);//上传剧照
    app.post('/agent/a_uploadcompresscareerimage', routes.views.a_uploadcompresscareerimage);//上传剧照缩略图
    app.get('/agent/a_page_resumPhoto', routes.views.a_page_resumPhoto);//普通用户权限提示页面
    /*

    *演员管理

    */
    app.get('/agent/a_page_actorList/:agent_id/:appid', routes.views.a_page_actorList);//查询公司旗下演员
    app.get('/agent/a_page_actorManage/:agent_id/:appid', routes.views.a_page_actorManage);//演员管理页面
    app.get('/agent/a_page_userInfo/:userid/:appid', routes.views.a_page_userInfo);//演员详情页面-----旗下艺人
    app.get('/agent/a_userprofile/:userid/:appid', routes.views.a_userprofile);//查询用户简历详情
    app.get('/agent/a_page_userInfoEdit/:userid/:agentid/:appid', routes.views.a_page_userInfoEdit);//演员详情编辑页面-----演员管理
    app.get('/agent/a_page_searchAgentActorByname/:agent_id/:appid', routes.views.a_page_searchAgentActorByname);//演员管理===演员搜索
    app.get('/agent/a_searchActorsUnderAgent/:agentid/:appid/:index/:page', routes.views.a_searchActorsUnderAgent);//查询当前经纪人旗下的演员
    app.get('/agent/a_deletesingleworkexp/:careerinresumeid', routes.views.a_deletesingleworkexp);//删除参演经历
    app.post('/agent/a_editResumeInfo', routes.views.a_editResumeInfo);//编辑演员资料
    app.get('/agent/a_deletesingleActor/:agentid/:userid', routes.views.a_deletesingleActor);//删除演员资料
    app.all('/agent/a_searchAgentActorByname/:appid/:name/:agentid', routes.views.a_searchAgentActorByname);//经纪人>>演员管理>>根据姓名搜索演员   
    

   /*

    *旗下艺人

    */
    app.get('/agent/a_searchActorsUnderCompany/:agentid/:appid/:index/:page', routes.views.a_searchActorsUnderCompany);//查询公司旗下所有的演员
    app.all('/agent/a_searchCompanyActorByname/:appid/:name', routes.views.a_searchCompanyActorByname);//经纪人>>旗下艺人>>根据姓名搜索演员
    app.get('/agent/a_page_searchCompanyActorByname/:appid', routes.views.a_page_searchCompanyActorByname);//旗下艺人===演员搜索

   /*

    *获取类别

    */

    app.get('/agent/a_allroletypes/:page?/:name?', routes.views.a_allroletypes);//获取角色类别
    app.get('/agent/a_allskilltypes/:page?/:name?', routes.views.a_allskilltypes);//获取技能类别
    app.get('/agent/a_allfeaturetypes/:page?/:name?', routes.views.a_allfeaturetypes);//获取特征类别

    //邀请我的
    //app.get('/agent/a_inquiryInvitationRecord/:agentid', routes.views.a_inquiryInvitationRecord);//经纪人查询旗下演员受邀情况---查询受邀的剧组
    app.get('/agent/a_page_agent_InvitationRecords/:agentid', routes.views.a_page_agent_InvitationRecords);//第一个页面--剧组列表
    app.get('/agent/a_inquiryInvitationRecord/:agentid', routes.views.a_inquiryInvitationRecord);//经纪人查询旗下演员受邀情况---查询受邀的剧组
    
    app.get('/agent/a_page_agent_invitePositionDetails/:agentid/:production_id', routes.views.a_page_agent_invitePositionDetails);//第二个页面--通告详情
    app.get('/agent/a_inquiryInvitationRecordDetail/:agentid/:production_id', routes.views.a_inquiryInvitationRecordDetail);//经纪人>>邀请我的>>查询通告详情
   
    app.get('/agent/a_page_agent_inviteActorlists/:agentid/:careerincrewid', routes.views.a_page_agent_inviteActorlists);//第三个页面--演员列表
    app.get('/agent/a_inquiryInvitationActor/:careerincrew_id/:agentid/:page/:index', routes.views.a_inquiryInvitationActor);//经纪人>>邀请我的>>查询通告详情>>查询被邀请的演员
    
    app.all('/agent/a_changeinvitationstate/:invitation_id?/:state/:invited_id?', routes.views.a_changeinvitationstate);//经纪人>>改变邀请状态
    app.get('/agent/a_page_agent_positionDetails/:productionCrew_id', routes.views.a_page_agent_positionDetails);//查看更多剧目详情页面

   //我申请的
    app.get('/agent/a_page_agent_applyCrewRecords/:agentid', routes.views.a_page_agent_applyCrewRecords);//第一个页面--剧组列表
    app.all('/agent/a_searchapplycrews/:agentid', routes.views.a_searchapplycrews);//经纪人>>我申请的>>剧组列表
    //app.all('/agent/a_searchapplycrewsdetailinfo/:agentid/:currentPage/:index/:careerincrewid', routes.views.a_searchapplycrewsdetailinfo);//经纪人>>我申请的>>剧组列表
    app.get('/agent/a_page_agent_applyPositionDetails/:agentid/:productioncrew_id', routes.views.a_page_agent_applyPositionDetails);//第二个页面--通告详情
    app.all('/agent/a_searchapplyPositionDetails/:agentid/:productioncrew_id', routes.views.a_searchapplyPositionDetails);//经纪人>>我申请的>>查询通告详情

    app.get('/agent/a_page_agent_applyActorlists/:agentid/:careerincrewid', routes.views.a_page_agent_applyActorlists);//第三个页面--演员列表
    app.all('/agent/a_searchapplyActorlists/:agentid/:currentPage/:index/:careerincrewid', routes.views.a_searchapplyActorlists);//经纪人>>我申请的>>剧组列表
   
    app.get('/agent/a_page_agent_applyActorlists/:agentid/:careerincrewid', routes.views.a_page_agent_applyActorlists);//第三个页面--演员列表

   /*

    *通告广场

    */
    app.get('/agent/a_page_CrewLists/:agent_id/:appid', routes.views.a_page_CrewLists);//查询匹配成功的剧组
    app.all('/agent/a_searchsuccessfulmatchingcrews/:agentid/:appid', routes.views.a_searchsuccessfulmatchingcrews);//经纪人>>通告广场>>查询匹配度较高的剧组列表
    app.get('/agent/a_page_positionDetails/:agent_id/:productionCrew_id', routes.views.a_page_positionDetails);//查询剧目详情
    app.all('/agent/a_searchsuccessfulmatchingpositioninfo/:productionCrew_id/:agent_id/:page', routes.views.a_searchsuccessfulmatchingpositioninfo);//经纪人>>通告广场>>查询匹配度较高的剧组详情和演员
    app.all('/agent/a_searchsuccessfulmatchingactor/:production_id/:agent_id/:careerincrew_id/:page', routes.views.a_searchsuccessfulmatchingactor);//经纪人>>通告广场>>分页查询匹配度较高的演员
    /*

    *副导演广场

    */
    app.get('/agent/a_page_PublicAccountsListsUderAgent/:user_id/:myappid', routes.views.a_page_PublicAccountsListsUderAgent);//第一个页面--查询平台上所有副导演人公众号
    app.all('/WX/wx_searchalldirectorpublicaccounts/:page', routes.views.wx_searchalldirectorpublicaccounts);//查询平台上所有副导演人公众号
    app.get('/agent/a_page_CrewListsUderAgent/:director_appid/:user_id', routes.views.a_page_CrewListsUderAgent);//第二个页面--查询通告列表
    app.get('/agent/a_page_CrewDetailsUderAgent/:productionCrew_id/:user_id', routes.views.a_page_CrewDetailsUderAgent);//第三个页面--查询通告详情
    //app.all('/agent/a_allcrewlist/:page?/:appid/:openid/:time?', routes.views.a_allcrewlist);//通告列表，查询剧组列表

    app.all('/WX/testArray', routes.views.testArray);//查询平台上所有副导演人公众号


    //批量解析简历
    app.all('/parser/parserpdfresume', routes.views.parserpdfresume);//解析pdf文件

    app.all('/resume/page_importActorlists/:appid', routes.views.page_importActorlists);//查询导入的演员列表的页面
    app.all('/resume/wx_searchImportActorLists/:appid/:page', routes.views.wx_searchImportActorLists);//查询导入的演员列表

    app.get('/WX/image/:userid/:imagename', routes.views.wx_showImportPicture);//显示导入的剧目照片
    app.all('/resume/wx_searchImportActorLists/:appid/:page', routes.views.wx_searchImportActorLists);//查询导入的演员列表s

   
   // app.all('/resume/wx_judgeIfOwnTemplate/:userid', routes.views.wx_judgeIfOwnTemplate);//判断用户是否有自己模板
    //casting分享
    app.all('/resume/page_leadUserBackToPlatform/:appid', routes.views.page_leadUserBackToPlatform);//引导用户回到平台的页面
    app.all('/resume/wx_searchQRcode/:appid', routes.views.wx_searchQRcode);//通过appid查询二维码


   //测试
     app.all('/picture', routes.views.picture);
     app.post('/WX/testpicture', routes.views.testpicture);//测试图片
     app.all('/WX/wx_searchallActors', routes.views.wx_searchallActors);//演员列表--查询平台上所有的演员
     app.all('/WX/wx_searchallpositioninfo', routes.views.wx_searchallpositioninfo);//查询平台上所有的通告
     app.post('/WX/uploadCompresscastingimage1', routes.views.wx_uploadCompresscastingimage1);//上传casting照片（缩略图）已有图片

     app.all('/testdata', routes.views.testdata);
     app.all('/BubbleSort', routes.views.BubbleSort);
     app.all('/fastSorting', routes.views.fastSorting);
     app.all('/TestPath', routes.views.TestPath);

     app.all('/testImage', routes.views.testImage);//测试图片上传到别的路径
     app.get('/WX/image/:location', routes.views.wx_showImage);//在别的路径读取图片


     app.all('/testData1', routes.views.testData1);//导八都演员信息
     app.all('/payment/payment_page_1', routes.views.payment_page_1);//购买页面
     app.all('/payment/public_payment', routes.views.public_payment);//统一下单接口
     app.all('/payment/notify_url', routes.views.notify_url);
     app.all('/setTemplateStatusofOldActors', routes.views.setTemplateStatusofOldActors);//给老用户设置默认简历模板

};
