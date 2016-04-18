import Model from 'ember-data/model';

export default Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  posts: DS.hasMany('post')
});