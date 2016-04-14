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
	      let links = submission.get('links');
	      for (let i = links.get('length') - 1; i >= 0; i--) {
	      	let link = links.objectAt(i);
	      	link.destroyRecord();
	      }
	      submission.destroyRecord();
	    }
	  }
	}
});
