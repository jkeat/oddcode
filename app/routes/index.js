import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.query('post', {
			orderBy: 'createdOn',
			limitToLast: 10 // TODO: pagination
		}).then(posts => posts.toArray().reverse());
	}
});
