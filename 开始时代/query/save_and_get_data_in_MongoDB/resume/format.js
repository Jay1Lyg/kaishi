var async = require('async');
//var config = require('../../public/conf/common.js');
var urlModule = require('url');
var keystone = require('keystone'),
    CareerInCrew = keystone.list('CareerInCrew'),
    CareerInResume1 = keystone.list('CareerInResume1'),
    CareerInResume = keystone.list('CareerInResume'),
    RoleCategory = keystone.list('RoleCategory'),
    School = keystone.list('School'),
    Major = keystone.list('Major'),
	Production = keystone.list('Production');
    Areainfo= keystone.list('Areainfo');
    EducationExperience= keystone.list('EducationExperience');
    Skill= keystone.list('Skill');
    Category=keystone.list('Category');
    Resume=keystone.list('Resume');
    CareerImage=keystone.list('CareerImage');
    RoleTag=keystone.list('RoleTag');
var config = require('../../../public/conf/common.js');
var format_user = require('../user/format.js');
// ******************************** Format Functions **********************************************************
// extrace name from object arrays
var extractNamesFromObjectArray = function( objectArray, callback ){
	if(objectArray==null || objectArray.length==null) return results;

	var results=[];
	async.each(objectArray, function(item,next){
		results.push(item.name );
		next();
	},function(err){
		if(err){
			return callback(err,null);	
		}else{
			return callback(null,results);	
		}
	});
}

var extractNamesAndIdFromObjectArray = function( objectArray, callback ){
	if(objectArray.length==0) return results;

	var results=[];
	async.each(objectArray, function(item,next){
		var name_id = {
			name: item.name,
			id: item._id
		};
		
		results.push(name_id );
		next();
	},function(err){
		if(err){
			return callback(err,null);	
		}else{
			return callback(null,results);	
		}
	});
}

var getSchoolNameBySchoolId = function(id, callback){
	if(id==null) return callback(null,null);

	School.model.findOne({'_id': id})
	.select('_id name isOfficial')
	.exec(function(err, ret) {
		if(err){
			return callback(err, null);
		}else{
			return callback(null, ret);
		}
	});	
}

var getMajorNameByMajorId = function(id, callback){
	if(id==null) return callback(null,null);

	Major.model.findOne({'_id': id})
	.select('_id name isOfficial')
	.exec(function(err, ret) {
		if(err){
			return callback(err, null);
		}else{
			return callback(null, ret);
		}
	});	
}

var formatEduExpArray = function(expArray, callback){
	if(expArray==null || expArray.length==0) return callback(null,[]);
		var expItem = {};
		async.each(expArray,function(item,next){
		expItem._id = item._id;
		expItem.certificate = item.certificate;
		expItem.duration = item.duration;
		expItem.isPublic = item.isPublic;

		getMajorNameByMajorId(item.major, function(err,ret){
			if(!err && ret!=null){
				expItem.major=ret.name;
				expItem.major_isOfficial = ret.isOfficial;
				expItem.major_id = ret._id;
			}
		});

		getSchoolNameBySchoolId(item.school, function(err,ret){
			if(!err && ret!=null){
				expItem.school = ret.name;
				expItem.school_id = ret._id;
				expItem.school_isOfficial = ret.isOfficial;
				next();
			}
		});
	},function(err){
		if(err){
			return callback(err,[]);	
		}else{
			return callback(null,expItem);	
		}
	});
}

var formatEducationInfomation = function( object, callback ){//object is a paginate object
	var result = [];
	result.eduExpTotal = object.total;

	//Format the eduExpArray
	formatEduExpArray(object.results, function(err,ret){
		if(err){
			result.eduExpArray = null;
			return callback(err, result);	
		}else{
			result.eduExpArray = ret;
			return callback(null, result);	
		}
	});
}

var formatSkillInformation = function( object, callback ){
	var result = [];
	var skillres={};
	if(object!=null){
    skillres.id=object._id;
    skillres.name=object.name;
    result.skill=skillres;
     return callback(null, result);
  }else{
  	 return callback(null, []);
  }
 
}

var jointTags=function(array,callback){
     var str='';
     async.each(array,function(item,next){
         str +='  '+item.name;
         next();
     },function(err){
        if(err){
           throw new Error(err);
        }else{
        	callback(null,str);
        }
     });
}

// get useful user information
var formatProfileBasicInfo = function( userinfo, callback ){
	if (userinfo==null) return callback(null, {});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    console.log(userinfo);
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&');
	var featureArray=[];
	var categoryArray=[];
	var skillArray=[];
	var roletagArray=[];
	var profile_basicinfo = {};
    async.waterfall([function(callback){
		var now_date = new Date();

		profile_basicinfo.id = userinfo._id;
		profile_basicinfo.name = userinfo.name;
		profile_basicinfo.realname = userinfo.realname;
		profile_basicinfo.gender = userinfo.gender;
		profile_basicinfo.age = now_date.getFullYear() - userinfo._.birth.format('YYYY'); 
		profile_basicinfo.birth = userinfo._.birth.format('YYYY-MM-DD'); 
		profile_basicinfo.height = userinfo.height;
		profile_basicinfo.shortintroduce = userinfo.shortintroduce;
		profile_basicinfo.weight = userinfo.weight;
		profile_basicinfo.telephone = userinfo.telephone;
		profile_basicinfo.agentTelphone = userinfo.agentTelphone;
		profile_basicinfo.email = userinfo.email;
		profile_basicinfo.currentStatus = userinfo.currentStatus;
		profile_basicinfo.artname = userinfo.artname;
		profile_basicinfo.id_number = userinfo.id_number;
		profile_basicinfo.user_address = userinfo.user_address;
	    profile_basicinfo.schedule = userinfo.schedule;
	    profile_basicinfo.paycheck = userinfo.paycheck;
	    profile_basicinfo.allok = userinfo.allok;
	    (userinfo.resume_url != undefined) ? (profile_basicinfo.if_import = true) : (profile_basicinfo.if_import = false);

	    (userinfo.bust!=undefined)?( profile_basicinfo.bust = userinfo.bust):(profile_basicinfo.bust='');
	    (userinfo.waist!=undefined)?( profile_basicinfo.waist = userinfo.waist):(profile_basicinfo.waist='');
	    (userinfo.hip!=undefined)?( profile_basicinfo.hip = userinfo.hip):(profile_basicinfo.hip='');
	    (userinfo.schoolname!=undefined)?( profile_basicinfo.schoolname = userinfo.schoolname):(profile_basicinfo.schoolname='');
        (userinfo.role_tag!=undefined)?( profile_basicinfo.role_tag = userinfo.role_tag):(profile_basicinfo.role_tag='');
	    (userinfo.skill!=undefined)?( profile_basicinfo.skill = userinfo.skill):(profile_basicinfo.skill='');
	    (userinfo.category!=undefined)?( profile_basicinfo.category = userinfo.category):(profile_basicinfo.category='');
	    (userinfo.feature!=undefined)?( profile_basicinfo.feature = userinfo.feature):(profile_basicinfo.feature='');


	    (userinfo.hometown!=null)?( profile_basicinfo.hometownid=userinfo.hometown._id):(profile_basicinfo.hometownid='');
	    (userinfo.hometown!=null)?( profile_basicinfo.hometown=userinfo.hometown.name):(profile_basicinfo.hometown='');
		(userinfo.images.length>0) ? (profile_basicinfo.iconUrl = config.homeEntry.url+'/WX/image/users/' + userinfo.images[userinfo.images.length-1].filename) : (profile_basicinfo.iconUrl="") ;
		(userinfo.compress_images.length>0) ? (profile_basicinfo.compress_iconUrl = config.homeEntry.url+'/WX/image/compress_users/' + userinfo.compress_images[userinfo.compress_images.length-1].filename) : (profile_basicinfo.compress_iconUrl="") ;
		//(userinfo.mediaid!=null) ? (profile_basicinfo.iconUrl = 'http://kaishi.viphk.ngrok.org/WX/usermedia/' +userinfo._id+'/'+userinfo.mediaid+'.jpg') : (profile_basicinfo.iconUrl ="") ;
		(userinfo.currentLocation!=null) ? (profile_basicinfo.currentLocation = userinfo.currentLocation.name) : (profile_basicinfo.currentLocation = "");
         featureArray=userinfo.feature;
        // categoryArray=userinfo.category;
         skillArray=userinfo.skill;
         roletagArray=userinfo.role_tag;
         callback(null);
     },function(callback){
        jointTags(featureArray,function(err,ret){
           if(err){
             throw new Error(err);
           }else{
           	profile_basicinfo.feature_str=ret;
           	callback(null);
           }
        })
     },function(callback){
        jointTags(roletagArray,function(err,ret){
           if(err){
             throw new Error(err);
           }else{
           	profile_basicinfo.roletag_str=ret;
           	callback(null);
           }
        })
     },
     function(callback){
        jointTags(skillArray,function(err,ret){
           if(err){
             throw new Error(err);
           }else{
           	profile_basicinfo.skill_str=ret;
           	callback(null);
           }
        })
     }],function(err){
         if(err){
             throw new Error(err);
         }else{
             return callback(null, profile_basicinfo);	
         }
     });



}

var formatProfileCategory=function(category,callback){//æŸ¥è¯¢ç”¨æˆ·é€‰æ‹©çš„é¡¹ç›®ç±»åˆ?
   var data={};
   var result=[];
   async.each(category,function(item,next){
      result.push(item.category);
      next();
   },function(err){
   	 if(err){
      throw new Error(err);
     }else{
     	data.categoryid=result;
     	callback(null,data);
     }
   });
}

//Ã¥ÂË†Ã¥Â¹Â¶Ã¤Â¸Â¤Ã¤Â¸ÂªmodelÃ§Å¡â€žÃ¥Ââ€šÃ¦Â¼â€Ã§Â»ÂÃ¥Å½â€ Ã§Å¡â€žÃ¥â€°Â¯Ã¦â€“Â¹Ã¦Â³â€¢@luodongjia
var mergeWorkExp=function(expWorkArray1,expWorkArray2,callback){
	var Expresults=[];
	async.waterfall([
	  function(callback){
        async.each(expWorkArray1,function(item,next){
           Expresults.push(item);
           next();
        },function(err){
           if(err) throw new Error(err);
           return callback(null);
        });
	  },function(callback){
         async.each(expWorkArray2,function(item1,next){
             Expresults.push(item1);
             next();
         },function(err){
             if(err) throw new Error(err);
             return callback(null);
        });
	 }
	],function(err){
		if(err) return callback(err,[]);
		else{
			return callback(null,Expresults);
		}
	});
   
}
var mergeRoleTags=function(roleTags1,roleTags2,callback){
   var roleTags=new Set();
   var tagsResults=[];
   async.waterfall([
   	function(callback){
       async.each(roleTags1,function(item,next){
	      roleTags.add(item);
	      next();
       },function(err){
          if(err) throw new Error(err);
          callback(null);
       });
    },function(callback){
       async.each(roleTags2,function(item,next){
	      roleTags.add(item);
	      next();
       },function(err){
          if(err) throw new Error(err);
          callback(null);
       });
    }],function(err){
          if(err) return callback(err,[]);
          else{
          	roleTags.forEach(function(value) {
			   tagsResults.push(value);
			})			
			return callback(null, tagsResults);	
          }
    });
  
}
/////////////////////////////////Ã¥ÂË†Ã¥Â¹Â¶Ã¤Â¸Â¤Ã¤Â¸ÂªmodelÃ§Å¡â€žÃ¥Ââ€šÃ¦Â¼â€Ã§Â»ÂÃ¥Å½â€ @luodongjia/////////////////////////////////////
var getCareerByTwomodel=function(userid,callback){
	console.log("userid:"+userid);
	var platformResult={};
	var resumeResult={};
	var result={};
	var pnum=0;
	var rnum=0;
	async.waterfall([function(callback){
		Resume.paginate({
			page: 1,
			perPage: 20,
			maxPages: 10000
		 })
		.where('user_id', userid)
		.where('isQualified','true')
		.where('sign_up_create', false)
		.select('_id career_in_crews_id image_set video_set apply_letter isQualified isPublic')	
		.exec( function(err, rsm){
			console.log("getWorkExpInfo:"+JSON.stringify(rsm));
	    	getWorkExpInfo(rsm, function(err,ret){//Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥Â¹Â³Ã¥ÂÂ°Ã¤Â¸Å Ã¤ÂºÂ§Ã§â€Å¸Ã§Å¡â€žÃ¥Ââ€šÃ¦Â¼â€Ã§Â»ÂÃ¥Å½â€?
				if(err){
					return callback(err);
				}else{
					platformResult=ret;
					return callback(null);   
				}
			});
		});
	  },
	  function(callback){
        CareerInResume.paginate({
        	page: 1,
			perPage: 20,
			maxPages: 10000
        })
        .where('user_id', userid)
        .populate('pro_object role')
        .exec(function(err,rsm){
        	console.log("Info:"+JSON.stringify(rsm));
            getWorkExpByhand(rsm,function(err,ret){//Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¦â€°â€¹Ã¥Â¡Â«Ã§Å¡â€žÃ¥Ââ€šÃ¦Â¼â€Ã§Â»ÂÃ¥Å?
                if(err){
					return callback(err);
				}else{
                    resumeResult=ret;
                    return callback(null); 
				}
            });
        })
	  },function(callback){
	  	 mergeWorkExp(platformResult.workExpArray,resumeResult.workExpArray,function(err,ret){//Ã¥ÂË†Ã¥Â¹Â¶Ã¥Ââ€šÃ¦Â¼â€Ã§Â»ÂÃ¥Å½â€?
              if(err) {
              	return callback(err);
              }else{
                result.workExpArray=ret;
                return callback(null); 
              }
	  	 });
	  },
	  function(callback){
         mergeRoleTags(platformResult.rolecategoryTags,resumeResult.rolecategoryTags,function(err,ret){//Ã¥ÂË†Ã¥Â¹Â¶Ã§Â­â€ºÃ©â‚¬â€°Ã¨Â§â€™Ã¨â€°Â²idÃ¦Â â€¡Ã§Â­Â?
	         if(err) {
	          	return callback(err);
	         }else{
	            result.rolecategoryTags=ret;
	            return callback(null); 
	         }
	  	 });
	  },
	  function(callback){
	  	 mergeRoleTags(platformResult.roleTags,resumeResult.roleTags,function(err,ret){//Ã¥ÂË†Ã¥Â¹Â¶Ã§Â­â€ºÃ©â‚¬â€°Ã¨Â§â€™Ã¨â€°Â²Ã¦Â â€¡Ã§Â?
	         if(err) {
	          	return callback(err);
	         }else{
	            result.roleTags=ret;
	            var pdata = JSON.stringify(platformResult);
	            var rdata = JSON.stringify(resumeResult);
	            (pdata=="{}")?(pnum=0):(pnum=platformResult.workExpTotal);
	            (rdata=="{}")?(rnum=0):(rnum=resumeResult.workExpTotal);
	            result.workExpTotal=pnum+rnum;
	            return callback(null); 
	         }
	  	 });
	  }],function(err){
         if(err) return callback(err,{});
         return callback(null,result);
	  });
}
/////////////////////////////////////////////////Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥Å“Â¨Ã¥Â¹Â³Ã¥ÂÂ°Ã¤Â¸Å Ã¤ÂºÂ§Ã§â€Å¸Ã§Å¡â€žÃ¥Ââ€šÃ¦Â¼â€Ã§Â»ÂÃ¥Å?///////////////////////////////////////
var getProductionPublishDateById =  function(id, callback){
	Production.model.findOne({'_id': id})
		.populate('production_companys')
		.exec(function(err, ret) {
			if(err){
				return callback(err, null);
			}else{
				return callback(null, ret);
			}
		});	
}

var convertRoleCategoryIdToRoleCategoryName = function(id,callback){
	if (id==null) return callback(null, null);

	RoleCategory.model.findOne({'_id': id})
		.select('name')
		.exec(function(err, ret) {
			if(err){
				return callback(err, null);
			}else{
				return callback(null, ret.name);
			}
		});
}

var convertRoleTagIdToRoleTagName = function(id,callback){
	if (id==null) return callback(null, null);

	RoleTag.model.findOne({'_id': id})
		.select('name')
		.exec(function(err, ret) {
			if(err){
				return callback(err, null);
			}else{
				return callback(null, ret.name);
			}
		});
}


var formatExpDetail = function( detail, callback ){
	// no crews or role related, that means the CareerInCrews Object is not valid
	if(detail == null || detail.role==null || detail.crews_object==null) return callback(null, null);

	var result = {};
	(detail.role!=null) ? (result.role = detail.role.name) : (result.role = null);

	convertRoleCategoryIdToRoleCategoryName(detail.role.roleCategory, function(err,ret2){
		if(err){
			result.roleCategory = null;
		}else{
			result.roleCategory = ret2;
			if(detail.role.roleTag!=undefined){
				RoleTag.model.findOne({'_id': detail.role.roleTag})
				.select('name')
				.exec(function(err, ret3) {
					if(err){
						throw new Error(err);
					}else{
						//return callback(null, ret.name);
						result.roleCategory = ret3.name;
						
					}
				});
               
			}
			result.isRoleOfficial = detail.role.isOfficial; 
			result.role_id = detail.role._id; 
			result.roleCategory_id = detail.role.roleCategory;
			result.productionName = detail.crews_object.name;
			result.production_id = detail.crews_object.production;
			result.productionCrews_id = detail.crews_object._id;
		}
	});
	

	getProductionPublishDateById(detail.crews_object.production, function(err,ret){
		if(err){
			result.productionPulishDate = null;
			return callback(null, result);
		}else{
			(ret.publishDate != null) ? (result.productionPublishDate = ret._.publishDate.format('YYYY-MM-DD')) : (result.productionPublishDate = null);
			result.productionIsOfficial = ret.isOfficial;
			extractNamesFromObjectArray(ret.production_companys, function(err,ret1){
				if(err){
					result.productionCompanies = null;
					return callback(null, result);
				}else{
					result.productionCompanies = ret1;
					if(ret.category.length!=0){
						 getProductionTypeInfo(ret.category[0],function(err,ret1){
					        if(err) throw new Error(err);
					        result.productionType_id = ret1._id;
					        result.productionType=ret1.name;
					     });
		            }
					return callback(null, result);
				}
			});
		}
	});
}

var getExpDetailByCareerInCrewsId = function(id, callback){
	CareerInCrew.model.findOne({'_id': id})
	.populate('crews_object role')
	.exec(function(err, cics) {
		formatExpDetail(cics, function(err,ret){
			if(err){
				return callback(err, null);
			}else{
				return callback(null, ret);
			}
		});
	});	
}

var getWorkExpInfo = function( resumeObject, callback){
	var resume = {};
	

	if (resumeObject.total==0)	return callback(null, resume);

	var expArray = [];
	var roleTagsSet = new Set();
	var rolecategoryTagsSet=new Set();
	resume.roleTags =[];
	resume.rolecategoryTags =[];
	async.each( resumeObject.results, function(item,next){
		console.log('item :'+item);
		var exp = {};
		var status=true;//Ã¨Â¡Â¨Ã§Â¤ÂºÃ¦Â¼â€Ã¨â€°ÂºÃ§Â»ÂÃ¥Å½â€ Ã¦ËœÂ¯Ã¥Å“Â¨Ã¥Â¹Â³Ã¥ÂÂ°Ã¤Â¸Å Ã¤ÂºÂ§Ã§â€Å¸Ã§Å¡â€?
		exp.careerInCrews_id = item.career_in_crews_id;
		exp.resume_id = item._id;
		exp.image_set = item.image_set;
		exp.video_set = item.video_set;
		exp.isQualified = item.isQualified;
		exp.isPublic = item.isPublic;
        exp.status=status;
		getExpDetailByCareerInCrewsId(item.career_in_crews_id, function(err,ret){
			if(err){
				console.log(err.message);
			}else{
				if(ret!=null){
					exp.detail = ret;
					expArray.push( exp );
					//update roleTags
					if(ret.roleCategory!=null) roleTagsSet.add(ret.roleCategory);
					if(ret.roleCategory_id!=null) rolecategoryTagsSet.add(ret.roleCategory_id);
				}				
			}
			next();
		});
	},function(err){
		if(err){
			return callback(err, null);	
		}else{
			resume.workExpArray = expArray;
			resume.workExpTotal = resume.workExpArray.length;
			// convert set to plain Array (with Array comprehensions)
			roleTagsSet.forEach(function(value) {
			  resume.roleTags.push(value);
			  rolecategoryTagsSet.forEach(function(value1){
                 resume.rolecategoryTags.push(value1);
			  })
			})
			
			return callback(null, resume);	
		}
	});
}

//////////////////////////////auther@luodongjia///////////////////////////////////////////////

var getProductionTypeInfo=function(id,callback){
    if (id==null) return callback(null, null);
	Category.model.findOne({'_id': id})
	.select('name')
	.exec(function(err, ret) {
		if(err){
			return callback(err, null);
		}else{
			return callback(null, ret);
		}
	}); 
}

// var getCareeImage = function( object, callback ){
// 	var usermedia = {};
// 	var locals = {};
// 	var res = {};
// 	var imeges_URL = [];
// 	console.log(object);
// 	if(object.total != 0){
// 		console.log('--------------object.results[0].images----------------');
//         console.log(object.results[0].images);
//         console.log('--------------object.results[0].images----------------');
// 		if(object.results[0].images.length>0){
// 			async.each(object.results[0].images,function(ret,next){
// 				console.log(object.results[0].images);
// 				console.log(ret);
//                CareerImage.model.findOne()
//                  .where('_id',ret)
//                  .exec(function(err,ret1){
//                  	console.log('........................');
//                  	console.log(ret1);
//                  	console.log('........................');
//                     usermedia.imagesURL = 'http://kaishi.viphk.ngrok.org/WX/career/careerimage/'+ object.results[0].user_id +'/'+ ret1.mediaid+'.jpg';
//                     usermedia.CareerImage_id=ret;
// 				    res = JSON.stringify(usermedia);
// 				    imeges_URL.push(JSON.parse(res)); 
// 				    next();
//                  })
// 			},function(err){
//                  if(err){
//                      callback(err,null);
//                  }else{
//                  	console.log(locals);
//                  	locals.imagesURLArray = imeges_URL;
//                  	console.log('--------------locals----------------');
//                  	console.log(locals);
//                  	console.log('--------------locals----------------');
// 			        callback(null, locals);
//                  }
// 			});
// 		}else{
// 			imeges_URL = [];
// 			locals.imagesURLArray = imeges_URL;
// 			return callback(null, locals);
// 		}
// 	}else{
// 		imeges_URL = [];
// 		locals.imagesURLArray = imeges_URL;
// 		return callback(null, locals);


// 	}
// }
var getCareeImage = function( object, callback ){
	var usermedia = {};
	var locals = {};
	var res = {};
	var imeges_URL = [];
	var compress_imeges_URL = [];
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(object);
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	async.waterfall([
       function(callback){
        if(object.total != 0){
			if(object.results[0].images.length>0){
				for(var i=0;i<object.results[0].images.length;i++){
					usermedia.imagesURL = config.homeEntry.url+'/WX/career/careerimage/' + object.results[0].images[i].filename;
					res = JSON.stringify(usermedia);
					imeges_URL.push(JSON.parse(res));
				}
				locals.imagesURLArray = imeges_URL;
				return callback(null);
			}else{
				imeges_URL = [];
				locals.imagesURLArray = imeges_URL;
				return callback(null);
			}
		}else{
			imeges_URL = [];
			locals.imagesURLArray = imeges_URL;
			return callback(null);
		}
       }
       ,function(callback){
         if(object.total != 0){
			if(object.results[0].compress_images.length>0 || object.results[0].compress_images.length!=undefined){
				for(var i=0;i<object.results[0].compress_images.length;i++){
					usermedia.compress_imagesURL = config.homeEntry.url+'/WX/career/compress_careerimage/' + object.results[0].compress_images[i].filename;
					res = JSON.stringify(usermedia);
					compress_imeges_URL.push(JSON.parse(res));
				}
				locals.compressImagesURLArray = compress_imeges_URL;
				return callback(null);
			}else{
				compress_imeges_URL = [];
				locals.compressImagesURLArray = compress_imeges_URL;
				return callback(null);
			}
		}else{
			compress_imeges_URL = [];
			locals.compressImagesURLArray = compress_imeges_URL;
			return callback(null);
		}
       }
	],function(err){
       if(err){
          throw new Error(err);
       }else{
       	  return callback(null,locals);
       }
	})
	
}

var getWorkExpByhand=function(object,callback){
    var careerResults={};
    careerResults.roleTags =[];
    careerResults.rolecategoryTags =[];
    var expArray = [];
    var roleTagsSet=new Set();
    var rolecategoryTagsSet=new Set();
    if (object.total==0)	return callback(null, careerResults);
   
    async.each(object.results, function(item,next){ 
       if(item.pro_object==null){
          next();
       }else{ 
    	var result={};
    	var resultobj={};
    	var status=false;	
		resultobj.careerInResume_id = item._id;
		resultobj.status=status;
    	async.waterfall([function(callback){
            result.isRoleOfficial = item.role.isOfficial; 
	        result.role_id = item.role._id; 
	        result.productionName = item.pro_object.name;
	        result.production_id = item.pro_object._id;
	        (item.pro_object._.publishDate!=undefined)?(result.productionPublishDate=item.pro_object._.publishDate.format('YYYY-MM-DD')):(result.productionPublishDate='');	     
    	    (item.role!=null) ? (result.role = item.role.name) : (result.role = null);
    	    (item.role.roleCategory!=undefined) ? (result.roleCategory_id = item.role.roleCategory) : (item.role.roleCategory= null);
    	    (item.role.roleTag!=undefined) ? (result.roleTag_id = item.role.roleTag) : (result.roleTag_id= null);
    	    if( item.role.roleCategory!=undefined) rolecategoryTagsSet.add( item.role.roleCategory);
    	    callback(null);
    	},function(callback){
            convertRoleCategoryIdToRoleCategoryName(item.role.roleCategory,function(err,ret){
                if(err) throw new Error(err);
                result.roleCategory = ret;
                if(ret!=null) roleTagsSet.add(ret);
              
                callback(null);
            });
    	},function(callback){
           convertRoleTagIdToRoleTagName(item.role.roleTag,function(err,ret){
                if(err) throw new Error(err);
                result.roleTag = ret;
                callback(null);
            });
    	},
    	function(callback){
    		if(item.pro_object.category.length!=0){
	    	    getProductionTypeInfo(item.pro_object.category,function(err,ret1){
	                if(err) throw new Error(err);
	                if(ret1!=null) result.productionType_id = ret1._id;
	                if(ret1!=null) result.productionType=ret1.name;
	                callback(null);
	    	    });
    	    }else{
    	   	   callback(null);
    	    }
    	},function(callback){
           	CareerInResume.paginate({
				page: 1,
				perPage: 20,
				maxPages: 10000
		    })
			.where('user_id', item.user_id)
			.where('pro_object', item.pro_object._id)
			.exec( function(err, imagesret){
		    	getCareeImage(imagesret, function(err,ret){
					if(err){
						return callback(err);
					}else{
						resultobj.image_set=ret;
						return callback(null);   
					}
				});
			});
    	}],function(err){
            if(err) throw new Error(err);
            resultobj.detail=result;
            expArray.push(resultobj);
            next();
    	});
    }
    	
    },function(err){
       if(err) throw new Error(err);
       else{
			careerResults.workExpArray = expArray;
			careerResults.workExpTotal = careerResults.workExpArray.length;
			roleTagsSet.forEach(function(value) {
			   careerResults.roleTags.push(value);
			   rolecategoryTagsSet.forEach(function(value1){
                  careerResults.rolecategoryTags.push(value1);
			   })
			})	
			console.log('------------éª†ä¸œä½?------------');
            console.log(expArray);
			console.log('------------éª†ä¸œä½?------------');

			return callback(null, careerResults);	
		}
    });
  }

 var formatUserCasting = function( object, callback ){
	var locals = {};
	var castingImageUrl = {};
	if(object == null) {
		castingImageUrl.CastingImageUrl = {};
		return callback(null, castingImageUrl);
	}else{
	 //(object.frontimage!=null) ? (locals.frontimage = 'http://kaishi.viphk.ngrok.org/WX/casting/frontimage/' +object.user_id+'/'+object.frontimage+'.jpg') : (locals.frontimage="") ;
	// (object.leftimage45!=null) ? (locals.leftimage45 = 'http://kaishi.viphk.ngrok.org/WX/casting/leftimage45/' +object.user_id+'/'+object.leftimage45+'.jpg') : (locals.leftimage45="") ;
	// (object.rightimage45!=null) ? (locals.rightimage45 = 'http://kaishi.viphk.ngrok.org/WX/casting/rightimage45/' +object.user_id+'/'+object.rightimage45+'.jpg') : (locals.rightimage45="") ;
	// (object.artimage!=null) ? (locals.artimage = 'http://kaishi.viphk.ngrok.org/WX/casting/artimage/' +object.user_id+'/'+object.artimage+'.jpg') : (locals.artimage="") ;
	// (object.rightimage90!=null) ? (locals.rightimage90 = 'http://kaishi.viphk.ngrok.org/WX/casting/rightimage90/' +object.user_id+'/'+object.rightimage90+'.jpg') : (locals.rightimage90="") ;
	// (object.leftimage90!=null) ? (locals.leftimage90 = 'http://kaishi.viphk.ngrok.org/WX/casting/leftimage90/' +object.user_id+'/'+object.leftimage90+'.jpg') : (locals.leftimage90="") ;
    // (object.frontimagewaist!=null) ? (locals.frontimagewaist = 'http://kaishi.viphk.ngrok.org/WX/casting/frontimagewaist/' +object.user_id+'/'+object.frontimagewaist+'.jpg') : (locals.frontimagewaist="") ;
	// (object.frontimageall!=null) ? (locals.frontimageall = 'http://kaishi.viphk.ngrok.org/WX/casting/frontimageall/' +object.user_id+'/'+object.frontimageall+'.jpg') : (locals.frontimageall="") ;
    // (object.frontimagehead!=null) ? (locals.frontimagehead = 'http://kaishi.viphk.ngrok.org/WX/casting/frontimagehead/' +object.user_id+'/'+object.frontimagehead+'.jpg') : (locals.frontimagehead="") ;
    //原图
    (object.frontimage.length>0) ? (locals.frontimage =config.homeEntry.url+ '/WX/casting/frontimage/' + object.frontimage[object.frontimage.length-1].filename) : (locals.frontimage="") ;
	(object.leftimage45.length>0) ? (locals.leftimage45 =config.homeEntry.url+'/WX/casting/leftimage45/' + object.leftimage45[object.leftimage45.length-1].filename) : (locals.leftimage45="") ;
	(object.rightimage45.length>0) ? (locals.rightimage45 =config.homeEntry.url+'/WX/casting/rightimage45/'  + object.rightimage45[object.rightimage45.length-1].filename) : (locals.rightimage45="") ;
	(object.artimage.length>0) ? (locals.artimage = config.homeEntry.url+'/WX/casting/artimage/'+ object.artimage[object.artimage.length-1].filename) : (locals.artimage="") ;

	(object.rightimage90.length>0) ? (locals.rightimage90 = config.homeEntry.url+'/WX/casting/rightimage90/' + object.rightimage90[object.rightimage90.length-1].filename) : (locals.rightimage90="") ;
	(object.leftimage90.length>0) ? (locals.leftimage90 =config.homeEntry.url+'/WX/casting/leftimage90/' + object.leftimage90[object.leftimage90.length-1].filename) : (locals.leftimage90="") ;
    (object.frontimagewaist.length>0) ? (locals.frontimagewaist = config.homeEntry.url+'/WX/casting/frontimagewaist/' + object.frontimagewaist[object.frontimagewaist.length-1].filename) : (locals.frontimagewaist="") ;
	(object.frontimageall.length>0) ? (locals.frontimageall = config.homeEntry.url+'/WX/casting/frontimageall/' + object.frontimageall[object.frontimageall.length-1].filename) : (locals.frontimageall="") ;
    (object.frontimagehead.length>0) ? (locals.frontimagehead = config.homeEntry.url+'/WX/casting/frontimagehead/'  + object.frontimagehead[object.frontimagehead.length-1].filename) : (locals.frontimagehead="") ;
	castingImageUrl.CastingImageUrl = locals;
	return callback(null, castingImageUrl);
	}
 }

 var formatUserCompressCasting = function(object,callback){
    var locals = {};
	var compressCastingImageUrl = {};
	if(object == null) {
		compressCastingImageUrl.CompressCastingImageUrl = {};
		return callback(null, compressCastingImageUrl);
	}else{
    //缩略图
    (object.compress_frontimage.length>0) ? (locals.compress_frontimage =config.homeEntry.url+ '/WX/casting/compress_frontimage/' + object.compress_frontimage[object.compress_frontimage.length-1].filename) : (locals.compress_frontimage="") ;
	(object.compress_leftimage45.length>0) ? (locals.compress_leftimage45 =config.homeEntry.url+'/WX/casting/compress_leftimage45/' + object.compress_leftimage45[object.compress_leftimage45.length-1].filename) : (locals.compress_leftimage45="") ;
	(object.compress_rightimage45.length>0) ? (locals.compress_rightimage45 =config.homeEntry.url+'/WX/casting/compress_rightimage45/'  + object.compress_rightimage45[object.compress_rightimage45.length-1].filename) : (locals.compress_rightimage45="") ;
	(object.compress_artimage.length>0) ? (locals.compress_artimage = config.homeEntry.url+'/WX/casting/compress_artimage/'+ object.compress_artimage[object.compress_artimage.length-1].filename) : (locals.compress_artimage="") ;

	(object.compress_rightimage90.length>0) ? (locals.compress_rightimage90 = config.homeEntry.url+'/WX/casting/compress_rightimage90/' + object.compress_rightimage90[object.compress_rightimage90.length-1].filename) : (locals.compress_rightimage90="") ;
	(object.compress_leftimage90.length>0) ? (locals.compress_leftimage90 =config.homeEntry.url+'/WX/casting/compress_leftimage90/' + object.compress_leftimage90[object.compress_leftimage90.length-1].filename) : (locals.compress_leftimage90="") ;
    (object.compress_frontimagewaist.length>0) ? (locals.compress_frontimagewaist = config.homeEntry.url+'/WX/casting/compress_frontimagewaist/' + object.compress_frontimagewaist[object.compress_frontimagewaist.length-1].filename) : (locals.compress_frontimagewaist="") ;
	(object.compress_frontimageall.length>0) ? (locals.compress_frontimageall = config.homeEntry.url+'/WX/casting/compress_frontimageall/' + object.compress_frontimageall[object.compress_frontimageall.length-1].filename) : (locals.compress_frontimageall="") ;
    (object.compress_frontimagehead.length>0) ? (locals.compress_frontimagehead = config.homeEntry.url+'/WX/casting/compress_frontimagehead/'  + object.compress_frontimagehead[object.compress_frontimagehead.length-1].filename) : (locals.compress_frontimagehead="") ;
	compressCastingImageUrl.CompressCastingImageUrl = locals;
	return callback(null, compressCastingImageUrl);
   }
 }



module.exports = {
	formatProfileBasicInfo: formatProfileBasicInfo, 
	formatEducationInfomation: formatEducationInfomation,
	formatSkillInformation: formatSkillInformation,
	formatUserCasting : formatUserCasting,
	getWorkExpInfo: getWorkExpInfo,
	getWorkExpByhand : getWorkExpByhand,
	mergeWorkExp:mergeWorkExp,
	mergeRoleTags:mergeRoleTags,
	getCareerByTwomodel:getCareerByTwomodel,
	formatProfileCategory : formatProfileCategory,
	formatUserCompressCasting : formatUserCompressCasting
}
