import Ember from 'ember';
import AdminRoute from 'oddcode/mixins/admin-route';
import SubmissionRouteAndPostRouteOverlap from 'oddcode/mixins/submission-route-and-post-route-overlap';

export default Ember.Route.extend(AdminRoute, SubmissionRouteAndPostRouteOverlap, {
	model(params) {
		return this.store.findRecord('submission', params.submission_id);
	},

	actions: {
		approveSubmission(model) {
			const newPost = this.store.createRecord('post', {
				title: model.get('title'),
				URL: model.get('URL'),
				description: model.get('description'),
				createdOn: model.get('createdOn'),
				updatedOn: model.get('updatedOn'),
				tags: model.get('tags'), // TODO
				imageURL: model.get('imageURL')
			});
			let links = model.get('links');
			for (let i = links.get('length') - 1; i >= 0; i--) {
				let link = links.objectAt(i);
				model.get('links').removeObject(link);
				newPost.get('links').pushObject(link);
			}
			this._destroyEmptyLinks(newPost).then(() => {
				Ember.RSVP.all(newPost.get('links').invoke('save')).then(() => {
					newPost.save().then(() => {
						model.destroyRecord().then(() => {
							this.send('transitionAfterSave');
						});
					});
				});
			});
		},

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
