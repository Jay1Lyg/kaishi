/**
 * Created by Carry on 5/17/2018.
 */
var mongoose = require('mongoose');
var Scaema=mongoose.Schema;

var produce=new Scaema({
    'name':String,
    'sex':String,
    'age':Number
});
module.exports=mongoose.model('goods',produce);