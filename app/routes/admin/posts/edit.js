import Ember from 'ember';
import AdminRoute from 'oddcode/mixins/admin-route';
import SubmissionRouteAndPostRouteOverlap from 'oddcode/mixins/submission-route-and-post-route-overlap';

export default Ember.Route.extend(AdminRoute, SubmissionRouteAndPostRouteOverlap, {
	model(params) {
		return this.store.findRecord('post', params.post_id);
	},

	actions: {
		unapprovePost(model) {
			const newSubmission = this.store.createRecord('submission', {
				title: model.get('title'),
				URL: model.get('URL'),
				description: model.get('description'),
				createdOn: model.get('createdOn'),
				updatedOn: new Date(),
				tags: model.get('tags'), // TODO
				imageURL: model.get('imageURL')
			});
			let links = model.get('links');
			for (let i = links.get('length') - 1; i >= 0; i--) {
				let link = links.objectAt(i);
				model.get('links').removeObject(link);
				newSubmission.get('links').pushObject(link);
			}
			this._destroyEmptyLinks(newSubmission).then(() => {
				Ember.RSVP.all(newSubmission.get('links').invoke('save')).then(() => {
					newSubmission.save().then(() => {
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
