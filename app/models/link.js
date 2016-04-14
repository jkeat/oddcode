import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  URL: DS.attr('string'),
  title: DS.attr('string'),
  createdOn: DS.attr('date', { defaultValue() { return new Date(); } }),

  // A link belong to either a submission or a post.
  submission: DS.belongsTo('submission'),
  post: DS.belongsTo('post'),

  bothFilled: Ember.computed.and('URL', 'title'),
  eitherIsEmpty: Ember.computed.not('bothFilled'),
  eitherIsFilled: Ember.computed.or('URL', 'title')
});
