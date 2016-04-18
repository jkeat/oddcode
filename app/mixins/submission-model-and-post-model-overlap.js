import Ember from 'ember';
import DS from 'ember-data';

/* The post and subission models are basically the same,
   but need to be separate because Firebase doesn't allow
   complicated-enough queries (e.g. get items that are approved
   AND sort by date.) */

export default Ember.Mixin.create({
	title: DS.attr('string'),
	URL: DS.attr('string'),
	description: DS.attr('string'),
	links: DS.hasMany('link'),
	collections: DS.hasMany('collection'),
	createdOn: DS.attr('date', { defaultValue() { return new Date(); } }),
	updatedOn: DS.attr('date', { defaultValue() { return new Date(); } }),
	createdTimestamp: DS.attr('number', { defaultValue() { return new Date().getTime(); } }),
	updatedTimestamp: DS.attr('number', { defaultValue() { return new Date().getTime(); } }),
	imageURL: DS.attr('string'),
});
