var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Role Model
 * ==========
 */

var Role = new keystone.List('Role',{
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '角色',
	singular: '角色',
	plural: '角色',
	track: true
});

Role.add({
	name: { type: String, required: true, index: true, label: '角色' }, 
	roleCategory: { type: Types.Relationship, ref: 'RoleCategory',label: '角色类别'}, 
	roleTag: { type: Types.Relationship, ref: 'RoleTag',label: '角色标签'},
	featureTag: { type: Types.Relationship, ref: 'FeatureTag',refPath: 'name',  many:true,   label: '特征标签'},
	skillTag: { type: Types.Relationship, ref: 'SkillTag', refPath: 'name', many:true,   label: '特征标签'},
	isOfficial: { type: Types.Boolean, default: false, label: '是否被官网认可'},
}
);

// Provide access to Keystone
//User.schema.virtual('canAccessKeystone').get(function() {
//	return this.isAdmin;
//});


/**
 * Relationships
 */

//User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Role.defaultColumns = 'name, isOfficial';
Role.register();
