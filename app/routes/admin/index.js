import Ember from 'ember';
import AdminRoute from 'oddcode/mixins/admin-route';

export default Ember.Route.extend(AdminRoute, {
	model() {
		return this.store.query('submission', {
			orderBy: 'updatedOn',
			limitToLast: 10 // TODO: pagination
		}).then(submissions => submissions.toArray().reverse());
	}
});
