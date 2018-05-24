var express = require('express');
var router = express.Router();
var User=require('../models/user');

router.post('/', function(req, res, next) {
    var uname=req.body.name;
    var upassword=req.body.psw;
     console.log(upassword)

    User.findOne({name:uname},function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else if(doc){

                res.json({
                    status: '2',
                    msg: '',
                    result: '用户已存在',

                })
            // if()
        }else{
            User.create({
                name:uname,
                password:upassword
            },function(err,doc){
                if(err){
                    res.json({
                        status: '3',
                        msg: '',
                        result: '创建失败',

                    })
                }else{
                    res.json({
                        status: '4',
                        msg: '',
                        result: doc,

                    })
                }
            })

        }
    })
});

module.exports = router;
