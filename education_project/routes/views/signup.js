/**
 * Created by Admin on 2017/8/4.
 */
var keystone = require('keystone');
var Signup = keystone.list('Signup');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'signup';
    locals.sex = Signup.fields.sex.ops;
    locals.specialty_bao = Signup.fields.specialty_bao.ops;
    locals.formData = req.body || {};
    locals.validationErrors = {};
    locals.enquirySubmitted = false;
    console.log(locals.formData);
    // 在POST请求中，将查询项添加到数据库
    view.on('post', { action: 'signup' }, function (next) {
        var newSignup = new Signup.model();
        var updater = newSignup.getUpdateHandler(req);
        updater.process(req.body, {
            flashErrors: true,
            fields: 'name, sex, date, birthplace, school, specialty, graduation_time, specialty_bao, phone, email, qq, address',
            errorMessage: 'There was a problem submitting your enquiry:',
        }, function (err) {
            if (err) {
                locals.validationErrors = err.errors;
            } else {
                locals.enquirySubmitted = true;
            }
            next();
        });
    });
    //if(locals.enquirySubmitted = false){
        view.render('signup');
    //}

};
