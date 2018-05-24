
var keystone = require('keystone');
    User = keystone.list('User');
	User_Openid=keystone.list('User_Openid');
	BoundUserAndPublic = keystone.list('BoundUserAndPublic');
	PublicAccount = keystone.list('PublicAccount');
var session = require('../../node_modules/keystone/lib/session');
//var config = require('../../public/conf/common.js');
var urlModule = require('url');
var _ = require('underscore');
var async = require('async');
exports = module.exports = function(req, res) {
	// If a form was submitted, process the login attempt
	if (req.method === 'POST') {
		// console.log(req);
		var locals = {
			// csrf_header_key: keystone.security.csrf.CSRF_HEADER_KEY,
			// csrf_token_key: keystone.security.csrf.TOKEN_KEY,
			csrf_token_value: keystone.security.csrf.getToken(req, res),
			// csrf_query: '&' + keystone.security.csrf.TOKEN_KEY + '=' + keystone.security.csrf.getToken(req, res),
		};

        var index=req.body.index;
        var data={};
		var onSuccess = function (user) {
			locals.username = user.name;
			locals.user_id = user._id;
			locals.user_role = user.role;
			locals.telephone = user.telephone;
			locals.id_number = user.id_number;
			locals.realname = user.realname;
			async.waterfall([
				function(callback){
                   PublicAccount.model.findOne()
					.where('appid', req.body.appid)
					.exec( function (err, ret){
						if(err){
							throw new Error(err);
						}else{
                            User.model.findOne()
                             .where('_id',user._id)
                             .where('appid',ret._id)//表明该用户是该平台关注者
                             .exec(function(err,users){
                                if(err){
                                  throw new Error(err);
                                }else{
                                  if(users == null){
                                  	 User.model.findOne()
                                      .where('_id',user._id)
                                      .exec(function(err,userinfo){
                                          if(err){
                                             throw new Error(err);
                                          }else{
                                             userinfo.appid.push(ret._id);
		                                     userinfo.save(function(err){
		                                       if(err){
		                                          throw new Error(err);
		                                       }else{
		                                       	  callback(null);
		                                       }
		                                     })
                                          }
                                      })
                                  }else{
                                  	 callback(null);
                                  }
                                }
                             })
					    }
					 })
				},
				function (callback){
					PublicAccount.model.findOne()
					.where('appid', req.body.appid)
					.exec( function (err, ret){
						if(err){
							throw new Error(err);
						}else{
							var auth_appid = ret._id;
							BoundUserAndPublic.model.findOne()
				            .where('openID', req.body.openid)
				            .where('appid', auth_appid)
				            .where('isSub',true)
				            .exec( function (err, ret2){
				                if(err){
				                   throw new Error(err);
				                }else{
				                   if(ret2 == null){
				                        BoundUserAndPublic.model.create({
				                            openID: req.body.openid,
				                            appid: auth_appid,
				                            isSub: true
				                        },
				                        function (err1, ret1){
				                            if(err1){
				                                throw new Error(err1);
				                            }else{
				                                 var is_click = ret1.isOperator;
				                                 callback(null, is_click);
				                            }
				                        });
				                    }else{ //判断当前用户是否是运营者或管理员
				                        var is_click = ret2.isOperator;
				                        callback(null, is_click);                  
				                    }
				                }
				            }); 
						}
					});

				},
				function (is_click, callback){
					 User_Openid.model.findOne()
					   .where('openID',req.body.openid)
					   .where('userid',user._id)
					   .exec(function(err,ret){
		                  if(err){
		                    throw new Error(err);
		                  }else{
		                  	if(ret==null){//在其他公众号注册或者App用户,需要将user与openid关联起来
		                  		console.log('step1-1');
		                  		console.log('在其他公众号注册或者App用户,需要将user与openid关联起来');
		                  		User_Openid.model.create({openID:req.body.openid,userid:user._id,Status:true},function(err,ret1){
		                             if(err){
		                                throw new Error(err);
		                             }else{
		                             	User.model.findOne() 
		                             	 .where('telephone',user.telephone)
		                             	 .exec(function(err,ret2){
		                                    if(err){
		                                       throw new Error(err);
		                                    }else{
		                                    	console.log('step1-2');
		                                    	ret2.openIDArray.push(ret1._id);
		                                    	//ret2.Status=true;
		                                    	ret2.save(function(err){
		                                          if(index=='3'){
										               var url='/WX/page_actorInfo/'+req.body.appid+'/'+req.body.openid+'/'+user._id;
										               res.redirect(url);
													}if(index=='2'){
										               var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										               res.redirect(url);
													}if(index=='1'){
														if(is_click == true){
															var url='/WX/page_productionDetail/'+user._id+'/'+req.body.openid+'/'+req.body.appid;
										               		res.redirect(url);
														}else{
															var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										                    res.redirect(url);
														}
										               
													}
													if(index=='4'){
														if(is_click == true){
															var url='/WX/page_publishCrews/'+user._id;
										                    res.redirect(url);
														}else{
															var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										                    res.redirect(url);
														}
										              
													}
													if(index=='5'){
										               var url='/WX/page/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										               res.redirect(url);
													}if(index=='6'){
														//if(is_click == true){
															var url='/WX/page_deliveryRecords/'+user._id+'/'+req.body.appid;
										                    res.redirect(url);
														// }else{
														// 	var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										    //                 res.redirect(url);
														// }
										              
													}if(index=='7'){
													   //if(is_click == true){
															var url='/WX/page_Inviterdrecord/'+user._id;
										                    res.redirect(url);
														// }else{
														// 	var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										    //                 res.redirect(url);
														// }
                                                      
													}
													if(index=='8'){
                                                      var url='/WX/page_searchpublishCrews/'+user._id;
										               res.redirect(url);
													}
													if(index=='9'){
                                                       var url='/WX/page_PublicAccountsListsUderDirector/'+user._id+'/'+req.body.appid;
										               res.redirect(url);
													}if(index=='10'){
										               if(is_click == true){
															var url='/WX/page_getAllCrewLists/'+user._id+'/'+req.body.appid;
										               		res.redirect(url);
														}else{
															var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										                    res.redirect(url);
														}
													}if(index=='11'){
										               if(is_click == true){
															var url='/WX/page_searchCrewsAndProgramme/'+user._id+'/'+req.body.appid;
										               		res.redirect(url);
														}else{
															var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										                    res.redirect(url);
														}
													}

		                                    	})
		                                    }
		                             	 })
		                             }
		                  		})
		                     
		                  	}else{//
		                  		console.log('step1-3');
		                  		User_Openid.model.find()
		                  		 .where('openID',req.body.openid)
		                  		 .exec(function(err,ret){
		                            async.each(ret,function(item,next){
		                            	if(item.userid!=user._id){
		                                   item.Status=false;
		                                   item.save(function(err){
                                             next();
		                                   }) 
		                            	}else{
		                                    item.Status=true;
		                                    item.save(function(err){
                                              next();
		                                    })
		                            	}
		                               
		                            },function(err){
		                               if(err){
		                                   throw new Error(err);
		                               }else{
		                               	   if(index=='3'){
								               var url='/WX/page_actorInfo/'+req.body.appid+'/'+req.body.openid+'/'+user._id;
								               res.redirect(url);
											}if(index=='2'){
								               var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
								               res.redirect(url);
											}if(index=='1'){
								               if(is_click == true){
													var url='/WX/page_productionDetail/'+user._id+'/'+req.body.openid+'/'+req.body.appid;
								               		res.redirect(url);
												}else{
													var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										            res.redirect(url);
												}
											}
											if(index=='4'){
											   if(is_click == true){
											   	 var url='/WX/page_publishCrews/'+user._id;
								                 res.redirect(url);
											   }else{
											   	 var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										         res.redirect(url);
											   }
											}
											if(index=='5'){
								               var url='/WX/page/'+user._id+'/'+req.body.appid+'/'+req.body.openid;;
								               res.redirect(url);
											}if(index=='6'){
											   //if(is_click == true){
											   	 var url='/WX/page_deliveryRecords/'+user._id+'/'+req.body.appid;
										         res.redirect(url);
											   // }else{
											   // 	 var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										    //      res.redirect(url);
											   // }
								               
											}if(index=='7'){
												//if(is_click == true){
	                                               var url='/WX/page_Inviterdrecord/'+user._id;
											       res.redirect(url);
											    // }else{
               //                                     var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										     //       res.redirect(url);
											    // }
											}
											if(index=='8'){
												if(is_click == true){
	                                               var url='/WX/page_searchpublishCrews/'+user._id;
										           res.redirect(url);
											    }else{
                                                   var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										           res.redirect(url);
											    }                                               
											}
											if(index=='9'){
                                                var url='/WX/page_PublicAccountsListsUderDirector/'+user._id+'/'+req.body.appid;
										        res.redirect(url);
											}if(index=='10'){
								               if(is_click == true){
													var url='/WX/page_getAllCrewLists/'+user._id+'/'+req.body.appid;
								               		res.redirect(url);
												}else{
													var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										            res.redirect(url);
												}
											}if(index=='11'){
								               if(is_click == true){
													var url='/WX/page_searchCrewsAndProgramme/'+user._id+'/'+req.body.appid;
								               		res.redirect(url);
												}else{
													var url='/WX/page_allpositions/'+user._id+'/'+req.body.appid+'/'+req.body.openid;
										            res.redirect(url);
												}
											}
		                               }
		                            })
		                  		 })

		                  		

		                  	}
		                  }
					   })



				}
			]);


			

			



			
						  

           

			// async.waterfall([
			// function(callback){
			// 	User.model.find()
			// 	 .where('openID',req.body.openid)
			// 	 .exec(function(err,ret){
	  //              if(err){
	  //                throw new Error(err);
	  //              }else{
	  //              	 if(ret.telephone!=user.telephone){
	  //              	 	async.each(ret,function(item,next){
		 //               	 	console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
		 //               	 	console.log(item);
		 //                    item.Status=false;
		 //                    item.save(function(err){
			//                     if(err){
			// 		                throw new Error(err);
			// 		            }
		 //                        next();
		 //                    })
		 //               	 },function(err){
		 //                     if(err){
		 //                        throw new Error(err);
		 //                     }else{
		 //                     	callback(null);
		 //                     }
	  //              	   })
	  //              	 }
	  //              	 else{
	  //              	 	callback(null);
	  //              	 }
	  //              }
			//    })
			// },
			// function(callback){
   //             User.model.findOne()
			// 	 .where('_id',user._id)
			// 	 .where('telephone',user.telephone)
			// 	 .exec(function(err,ret){
	  //               if(err){
	  //                 throw new Error(err);
	  //               }else{
	  //               	console.log(ret);
	  //               	ret.Status=true;
	  //               	ret.save(function(err){
	  //               		if(err){
	  //                          throw new Error(err);
	  //               		}else{
	  //               			callback(null);
	  //               		}
							
	  //               	})
	  //               }
			// 	 })
			// }],function(err){
   //             if(err){
   //               throw new Error(err); 
   //             }else{
   //             	if(index=='1'){
	  //              var url='/WX/page_actorInfo/'+req.body.appid;
	  //              res.redirect(url);
			// 	}if(index=='2'){
	  //              var url='/WX/page_allpositions/'+user._id;
	  //              res.redirect(url);
			// 	}if(index=='3'){
	  //              var url='/WX/page_productionDetail/'+user._id;
	  //              res.redirect(url);
			// 	}if(index=='4'){
	  //              var url='/WX/wx_userprofile/'+user._id;
	  //              res.redirect(url);
			// 	}if(index=='5'){
	  //              var url='/WX/wx_userprofile/'+user._id;
	  //              res.redirect(url);
			// 	}if(index=='6'){
	  //              var url='/WX/wx_publishPosition/'+user._id+'/1/'+new Date();
	  //              res.redirect(url);
			// 	}
               	
   //             }
			// })
			
			
			
			
		};

		var onFail = function (err) {
			// res.send(403, 'Not Authrized');
			//res.status(403).send(locals);
			res.render('page_signin',{
				 index : index,
              	 openid : req.body.openid,
              	 appid : req.body.appid,
				 status:false
			});
		};

		session.signin(req.body, req, res, onSuccess, onFail);
		console.log('------------------------------');
		console.log(req.body);
		console.log('------------------------------');
	} else {
		throw new Error("Not Accept Get Method of Signin");
	}
};
