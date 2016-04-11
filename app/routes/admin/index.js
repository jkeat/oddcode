import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.query('submission', {
			orderBy: 'updatedOn',
			limitToLast: 10 // TODO: pagination
		}).then(submissions => submissions.toArray().reverse());
	}
});
