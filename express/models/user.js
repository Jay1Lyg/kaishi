/**
 * Created by Carry on 5/17/2018.
 */
var mongoose = require('mongoose');
var Scaema=mongoose.Schema;

var userSchema=new Scaema({
    name:String,
    password:String
});
module.exports=mongoose.model('user',userSchema);