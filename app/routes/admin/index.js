import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.query('post', {
			orderBy: 'approved', 
			equalTo: false,
			limitLast: 1
		});
	}
});
