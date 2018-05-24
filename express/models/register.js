/**
 * Created by Carry on 5/21/2018.
 */
/**
 * Created by Carry on 5/17/2018.
 */
var mongoose = require('mongoose');
var Scaema=mongoose.Schema;

var registerSchema=new Scaema({
    name:String,
    password:String
});
module.exports=mongoose.model('register',registerSchema);