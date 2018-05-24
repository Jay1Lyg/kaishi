var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Actor Model
 * auther@cincan
 * ==========
 */

var ActorTemplate = new keystone.List('ActorTemplate', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	label: '演员模板',
	singular: '演员模板',
	plural: '演员模板',
	track: true
});

ActorTemplate.add({
	name: { type: String, required: true, index: true, label: '模板名字' },
});



/**
 * Registration
 */

ActorTemplate.defaultColumns = 'name';
ActorTemplate.register();