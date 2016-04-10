import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  URL: DS.attr('string'),
  title: DS.attr('string'),

  bothFilled: Ember.computed.and('URL', 'title'),
  eitherIsEmpty: Ember.computed.not('bothFilled')
});
