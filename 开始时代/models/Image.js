var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Casting Model
 * ==========
 */

var Image = new keystone.List('Image', {
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '测试照片',
	singular: '测试照片',
	plural: '测试照片',
	track: true
});

Image.add({
	image: { type: Types.LocalFiles,
					dest: '/data/testimage/image/',//上传文件的路径
				    prefix: 'testimage',
				    filename: function(item, customized_name) {
				    	return customized_name.originalname;
				    }
					, label: '测试照片'
				},
}
);

//Image.defaultColumns = 'user_id';
Image.register();