import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  joinedOn: DS.attr('date', { defaultValue() { return new Date(); } }),
  isAdmin: DS.attr('boolean', { defaultValue: false })
});
