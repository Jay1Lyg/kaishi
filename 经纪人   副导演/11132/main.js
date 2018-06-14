/**
 * Created by Carry on 1/23/2018.
 */
var fs = require("fs");

var data = fs.readFileSync('package.json');

console.log(data.toString());
console.log("程序执行结束!");