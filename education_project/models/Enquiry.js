var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
    nocreate: true,
    noedit: true,
});
Enquiry.add({
    name: { type: String},
    sex: { type: Types.Select, options: [
        { value: 'man', label: '男' },
        { value: 'woman', label: '女' },
    ] },
    date: { type: String },
    birthplace: { type: String },
    documents: { type: String },
    school: { type: String },
    specialty: { type: String },
    graduation_time: { type: String },
    specialty_bao: { type: Types.Select, options: [
        { value: 'da', label: '大数据' },
        { value: 'wang', label: '网络安全' },
    ] },
    phone: { type: String },
    email: { type: Types.Email },
    qq: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
});
Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, sex, date, school, specialty, specialty_bao, phone';
Enquiry.register();