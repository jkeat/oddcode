import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
	title: DS.attr('string'),
	URL: DS.attr('string'),
	description: DS.attr('string'),
	links: DS.hasMany('link'),
	tags: DS.hasMany('tag'),
	createdOn: DS.attr('date', { defaultValue() { return new Date(); } }),
	updatedOn: DS.attr('date', { defaultValue() { return new Date(); } }),
	imageURL: DS.attr('string'),
});
