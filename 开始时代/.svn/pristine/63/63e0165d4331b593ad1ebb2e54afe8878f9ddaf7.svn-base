var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Actor Model
 * auther@cincan
 * ==========
 */

var ActorTemplateInUser = new keystone.List('ActorTemplateInUser', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '演员模板详情',
	singular: '演员模板详情',
	plural: '演员模板详情',
	track: true
});

ActorTemplateInUser.add({
	actorTemplate_id: { type: Types.Relationship, ref: 'ActorTemplate', refPath: 'name',label: '模板id'},
	user_id: { type: Types.Relationship, ref: 'User', refPath: '_id',label: '用户ID' },
	ifCanBeUsed:{ type:Types.Boolean, default: false, label: '是否可用'},//false为不可用
	ifUsed: { type: Types.Select, 
		options: [{ value: '1', label: '正在使用'},
				  { value: '2', label: '未使用'},
				 ],
		default: '2',
		label: '是否在使用'
	},
});



/**
 * Registration
 */

ActorTemplateInUser.defaultColumns = 'actorTemplate_id,user_id';
ActorTemplateInUser.register();