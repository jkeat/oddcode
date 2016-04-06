import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  URL: DS.attr('string'),
  title: DS.attr('string'),

  isFilled: Ember.computed.or('URL', 'title'),
  isEmpty: Ember.computed.not('isFilled')
});
