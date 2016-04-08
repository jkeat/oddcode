import Ember from 'ember';
import AdminRoute from 'oddcode/mixins/admin-route';

export default Ember.Route.extend(AdminRoute, {
	model() {
		return this.store.query('post', {
			orderBy: 'approved', 
			equalTo: false
		});
	}
});
