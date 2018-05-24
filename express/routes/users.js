var express = require('express');
var router = express.Router();
var User=require('../models/user');
// function insert() {
//
//     var user = new User({
//         name : '李阳光',
//         password: 'nan',
//
//     });
//
//     user.save(function (err, res) {
//
//         if (err) {
//             console.log("Error:" + err);
//         }
//         else {
//             console.log("Res:" + res);
//         }
//
//     });
// }
// insert()
/* GET users listing. */
router.post('/', function(req, res, next) {
    var name=req.body.name;
    var password=req.body.psw;
    // console.log(name)

    User.findOne({name:name},function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else if(doc){
            if(password!=doc.password){
                res.json({
                    status:'2',
                    msg:'',
                    result:'密码不正确',
                })
            }else{
                res.json({
                    status:'2',
                    msg:'',
                    result:'',
                })
            }

            // if()
        }else{
            res.json({
                status:'0',
                msg:'',
                result:'用户不存在',
            })
        }
    })
});

module.exports = router;
