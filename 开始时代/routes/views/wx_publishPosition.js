var keystone = require('keystone'),
	Address = keystone.list('Address'),
	Areainfo = keystone.list('Areainfo'),
	Category = keystone.list('Category'),
	Production = keystone.list('Production'),
	ProductionCrews = keystone.list('ProductionCrews'),
	ProductionCompany = keystone.list('ProductionCompany'),
	Issuer = keystone.list('Issuer'),
	RoleCategory = keystone.list('RoleCategory'),
	Role = keystone.list('Role'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
    Category = keystone.list('Category'); 
var async = require('async');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
	console.log('1-1');
	var production_crewId = req.params.production_crewId || '';
	var currentPage = req.params.currentPage || '';	
	var time = req.params.time || '';
	console.log('当前的时间戳：'+time);
	//console.log('用户id:'+user_id+"  当前页："+currentPage);
	var data = {};
	var results = [];
	var info = {};
	var more_date = {};
	async.waterfall([
		function(callback){
			console.log('1-1');
			CareerInCrew.paginate({
				page: currentPage,
				perPage: 10000,
				maxPages: 100
			})
			.where('crews_object', production_crewId)
			.where('publish_create',true)
			.where({'createdAt':{$lt:time}})//过滤掉发布时间小于time的职位 
			.sort("-createdAt")	//@zheng 按照发布时间降序排序
			.populate('crews_object role address createdBy')
			.exec(function(err, careerincrew_info){
				if(err) throw new Error('find careerincrew_info error');
				if(careerincrew_info.length == 0 ){
					console.log('1-2');
					console.log('careerincrew_info is null');
					callback(null, null);
				}else{
					console.log('1-3');
					console.log('total:'+careerincrew_info.total+'       currentPage:'+careerincrew_info.currentPage+'       totalPages:'+careerincrew_info.totalPages);
					more_date.total = careerincrew_info.total;
					more_date.currentPage = careerincrew_info.currentPage;
					more_date.totalPages = careerincrew_info.totalPages;
					//console.log('careerincrew_info:'+careerincrew_info);
					callback(null, careerincrew_info.results);
				}
			});
		},
		function(arg, callback){
			console.log('2-1');
			var careerincrewresult =[];
			if(arg == null){
				callback(null, careerincrewresult);
			}
			//console.log('careerincrew_info:'+arg);
			async.eachSeries(arg, function(careerincrew_result, next){
				if(careerincrew_result != null && careerincrew_result.publish_create == true && careerincrew_result.expired_date != null){
					console.log('2-2');
					//进行判断该职位是否过期，如果过期，careerInCrews中的is_expire变为true,否则变为false
					if( (((Math.floor( careerincrew_result.expired_date.getTime())/3600000/24)+1)-(new Date()).getTime()/3600000/24) <= 0 ){
						
						console.log('过期的职位：'+careerincrew_result._id);
						CareerInCrew.model.findOne()
						.where('_id', careerincrew_result._id)
						.exec( function (err, ret){
							if(err) throw new Error('find careerincrew_ret error!');
							ret.is_expire = true;
							ret.save( function (err){
								if(err) throw new Error('save careerincrew_ret error!');
								else{
									console.log('保存id为：'+ret._id+'的职位成功！');
								}
							});
						});
					}else{
						console.log('没过期的职位：'+careerincrew_result._id);
						CareerInCrew.model.findOne()
						.where('_id', careerincrew_result._id)
						.exec( function (err, ret){
							if(err) throw new Error('find careerincrew_ret error!');
							ret.is_expire = false;
							ret.save( function (err){
								if(err) throw new Error('save careerincrew_ret error!');
								else{
									console.log('2保存id为：'+ret._id+'的职位成功！');
								}
							});
						});
					}
					careerincrewresult.push(careerincrew_result);
				}
				next();
			},function (err){
				if(err) throw new Error('check careerincrew_result error');
				callback(null, careerincrewresult);
			});
		},
		function(arg, callback){
			console.log('4-1');
			if(arg == null){
				callback(null);
			}
			async.eachSeries(arg, function(arry, next){
				var index=true;
				if(arry.role == null){
					console.log('role is null!');
					next();
				}else{
					//锁定角色类型
				RoleCategory.model.find()
				.where('_id', arry.role.roleCategory)
				.exec(function(err, role_category_info){
					console.log('4-2');
					if(err) throw new Error('find role_category_info error');
					if(role_category_info.length > 0 && (arry.address)[0] != null){
						if(role_category_info[0].name=='演员'){
                            index=true;
						}else{
							index=false;
						}
						//锁定见组地区
						Address.model.find()
						.where('_id', (arry.address)[0]._id)
						.exec(function(err, area_info){
							if(err) throw new Error('find area_info error');
							if(area_info.length > 0 && arry.crews_object != null){
								console.log('4-3');
								ProductionCrews.model.find()
								.where('production', arry.crews_object.production)	
								.populate('production')
								.exec(function(err, crews_info){
									if(err) throw new Error('find crews_info error');
									if(crews_info.length > 0 && (crews_info[0].production) != null){
										console.log('4-4');
										//锁定出品公司
										// ProductionCompany.model.find()
										// .where('_id', ((crews_info[0].production).production_companys)[0])
										// .exec(function(err, production_company_info){
										// 	if(err) throw new Error('find production_company_info error');
										// 	if(production_company_info.length > 0 && (crews_info[0].production)!= null){
										// 		console.log('4-5');
										// 		//锁定发行公司
										// 		Issuer.model.find()
										// 		.where('_id', ((crews_info[0].production).issuer_companies)[0])
										// 		.exec(function(err, issuer_companies_info){
										// 			if(err) throw new Error('find issuer_companies_info error');
										// 			if(issuer_companies_info.length > 0 && (crews_info[0].production)!= null){
										// 				console.log('4-6');
														//锁定产品类别
														Category.model.find()
														.where('_id', ((crews_info[0].production).category)[0])
														.exec(function(err, production_category_info){
															if(err) throw new Error('find production_category_info error');
															if(production_category_info.length > 0 && (crews_info[0].production)!= null){
																console.log('4-7');
																//锁定拍摄地
																Areainfo.model.find()
																.where('_id', ((crews_info[0].production).location)[0])
																.exec(function(err, production_area_info){
																	if(err) throw new Error('find production_area_info error');
																	// Production.model.findById(((crews_info[0].production)._id)).exec(function(err, production) {
																	// 	console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
																	// 	console.log(production);
																	// 	console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
																	// 	(production.images.length>0) ? (data.production_image = 'http://kaishi.viphk.ngrok.org/WX/poster/production/' + production.images[production.images.length-1].filename) : (data.production_image="") ;
														   // 				//(production.mediaid!=null || production.mediaid!=undefined) ? (data.production_image = 'http://kaishi.viphk.ngrok.org/WX/poster/production/' +  ((crews_info[0].production)._id)+'/'+production.mediaid+'.jpg') : (data.production_image="") ;
																	//     console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppp');
																	//     console.log(data.production_image);
																	// });
																	if(production_area_info.length > 0){
																		console.log('4-8');

																		Production.model.findById(((crews_info[0].production)._id)).exec(function(err, production) {
																			console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
																			console.log(production);
																			console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
																			(production.images.length>0) ? (data.production_image = config.homeEntry.url+'/WX/poster/production/' + production.images[production.images.length-1].filename) : (data.production_image="") ;
															   				//(production.mediaid!=null || production.mediaid!=undefined) ? (data.production_image = 'http://kaishi.viphk.ngrok.org/WX/poster/production/' +  ((crews_info[0].production)._id)+'/'+production.mediaid+'.jpg') : (data.production_image="") ;
																		    console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppp');
																		    console.log(data.production_image);
																		    data.careerincrew_id = arry._id;
																			data.description = arry.description;
																			data.expired_date = arry._.expired_date.format('YYYY-MM-DD');
																			data.men_count = arry.men_count;
																			data.crews_id = arry.crews_object._id;
																			data.crews_name = arry.crews_object.name;
																			data.Production_id = arry.crews_object.production;
																			data.user_id = arry.createdBy._id;
																			data.user_name = arry.createdBy.name;
																			data.role_id = arry.role._id;
																			data.role_name = arry.role.name;
																			data.role_category_id = arry.role.roleCategory;
																			data.address_id = (arry.address)[0]._id;
																			data.address_name = (arry.address)[0].name;
																			data.area_id = (arry.address)[0].area;
																			data.gender = arry.gender;
																			data.age = arry.age;															
																			data.role_category_name = role_category_info[0].name;
																			data.area_name = area_info[0].name;
																			data.proect_name = (crews_info[0].production).name;
																			data.investmentAmount = (crews_info[0].production).investmentAmount;
																			data.duration = (crews_info[0].production).duration;

																			data.isKeepOnRecord = (crews_info[0].production).isKeepOnRecord;
																			data.recordAddress = (crews_info[0].production).recordAddress;
																			data.production_category_id = ((crews_info[0].production).category)[0];
																			data.production_location = ((crews_info[0].production).location)[0];
																			data.production_companys = ((crews_info[0].production).production_companys);
																			data.issuer_companies = ((crews_info[0].production).issuer_companies);
																			// data.production_company_name = production_company_info[0].name;
																			// data.issuer_companies_name = issuer_companies_info[0].name;
																			data.production_category_name = production_category_info[0].name;
																			data.production_area_name = production_area_info[0].name;
																			
																			data.publish_create=arry.publish_create
																			data.is_expire = arry.is_expire;//是否过期

																			data.is_effective = arry.is_effective;//是否挂起
																			data.isRegistered=arry.isRegistered;//是否审核
																			data.index=index;//index=true--演员 false--职员
																			data.candidates = arry.candidates;
																			data.openid=arry.openid;
												                            data.production_crews_id=crews_info[0]._id;
																			info = JSON.stringify(data);	
																			results.push(JSON.parse(info));	
																			next();	
																		});
																		
																	}else {
																		console.log('g');
																		next();
																	}
																});
															}else {
																console.log('f');
																next();
															}
														});
													
									}else{
										console.log('c');
										next();
									}
								});
							}else{
								console.log('b');
								next();                                                                                                                
							}
						});
					}else {
						console.log('a');
						next();
					}
				});}
			},function(err){
				if(err) throw new Error('check information error');
				console.log('4-9');
				more_date.result = results;
				callback(null);
			});
		}
	],function(err){
		if (err)  res.status(500).send(err);
		else  {
			console.log('5-1');
			console.log('====================================================================');
			console.log(results);
			console.log('====================================================================');
			console.log('====================================================================');
			console.log(more_date.result);
			console.log('====================================================================');
			res.render('page_publicPosition',{
				array:more_date.result				
			});
			
		}
	}); 
}
