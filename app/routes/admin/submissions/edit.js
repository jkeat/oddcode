import Ember from 'ember';
import SubmissionRouteAndPostRouteOverlap from 'oddcode/mixins/submission-route-and-post-route-overlap';

export default Ember.Route.extend(SubmissionRouteAndPostRouteOverlap, {
	model(params) {
		return this.store.findRecord('submission', params.submission_id);
	},

	setupController(controller, model) {
	    this._super(controller, model);
	    controller.set('createdOnText', 'Submitted');
	},

	actions: {
		approveSubmission(model) {
			/* createdOn and updatedOn aren't transferred
			   They both become 'Now', which is fitting for updatedOn 
			   and createdOn for posts represents when it was approved,
			   so 'Now' is also appropriate */
			const newPost = this.store.createRecord('post', {
				title: model.get('title'),
				URL: model.get('URL'),
				description: model.get('description'),
				tags: model.get('tags'), // TODO
				imageURL: model.get('imageURL')
			});
			let links = model.get('links'); // TODO: Simpler?
			for (let i = links.get('length') - 1; i >= 0; i--) {
				let link = links.objectAt(i);
				model.get('links').removeObject(link);
				newPost.get('links').pushObject(link);
			}
			this._destroyEmptyLinks(newPost).then(() => {
				Ember.RSVP.all(newPost.get('links').invoke('save')).then(() => {
					newPost.save().then(() => {
						model.destroyRecord().then(() => {
							this.send('afterApprove');
						});
					});
				});
			});
		},

		afterApprove() {
	  		this.transitionTo('index');
	  	},

	  	afterDelete() {
	  		this.transitionTo('admin.index');
	  	},

	  	willTransition() {
	    	let model = this.controller.get('model');
			model.rollbackAttributes();
			model.get('links').toArray().forEach(link => link.rollbackAttributes());
	  	}
	}
});
