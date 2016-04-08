import Ember from 'ember';
import AdminRoute from 'oddcode/mixins/admin-route';
import SubmissionRouteAndPostRouteOverlap from 'oddcode/mixins/submission-route-and-post-route-overlap';

export default Ember.Route.extend(AdminRoute, SubmissionRouteAndPostRouteOverlap, {
	model(params) {
		return this.store.findRecord('post', params.post_id);
	},

	actions: {
	  transitionAfterSave() {
	  	this.transitionTo('admin.index');
	  },

	  willTransition() {
	    let model = this.controller.get('model');
		model.rollbackAttributes();
		model.get('links').toArray().forEach(link => link.rollbackAttributes());
	  }
	}
});
