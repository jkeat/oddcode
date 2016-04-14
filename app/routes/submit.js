import Ember from 'ember';
import SubmissionRouteAndPostRouteOverlap from 'oddcode/mixins/submission-route-and-post-route-overlap';

export default Ember.Route.extend(SubmissionRouteAndPostRouteOverlap, {
	model() {
		return this.store.createRecord('submission');
	},

	setupController(controller, model) {
		this._super(controller, model);
		this.controllerFor('application').set("pageTitle", "You're submitting a new project");
	},

	actions: {
	  afterSave() {
	  	this.transitionTo('index');
	  },

	  willTransition() {
	    let submission = this.controller.get('model');
	    if (submission.get('isNew')) {
	      submission.get('links').invoke('destroyRecord');
	      submission.destroyRecord();
	    }
	  }
	}
});
