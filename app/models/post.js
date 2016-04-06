import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  URL: DS.attr('string'),
  description: DS.attr('string'),
  links: DS.hasMany('link'),
  tags: DS.hasMany('tag'),
  createdOn: DS.attr('date', { defaultValue() { return new Date(); } }),
  updatedOn: DS.attr('date', { defaultValue() { return new Date(); } }),
  imageURL: DS.attr('string'),
  approved: DS.attr('boolean', { defaultValue: false }),

  onlyOneLink: Ember.computed.equal('links.length', 1),
});
