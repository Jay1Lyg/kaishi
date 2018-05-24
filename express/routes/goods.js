var express = require('express');
var router = express.Router();

var Goods=require('../models/goods');


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('hello')
  //   console.log(req);
  //   console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
  //   console.log(res)
    Goods.find({name:'李阳光'},function (err,doc) {
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:doc,
            })
        }
    })
});


module.exports = router;
