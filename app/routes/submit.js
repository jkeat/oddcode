import Ember from 'ember';
import SubmissionRouteAndPostRouteOverlap from 'oddcode/mixins/submission-route-and-post-route-overlap';

export default Ember.Route.extend(SubmissionRouteAndPostRouteOverlap, {
	model() {
		return this.store.createRecord('submission');
	},

	actions: {
	  transitionAfterSave() {
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
