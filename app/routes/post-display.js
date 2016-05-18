import Ember from 'ember';

export default Ember.Route.extend({
	pageSettings: Ember.inject.service(),
	
	model(params) {
		return this.store.findRecord('post', params.post_id);
	},

	afterModel(model) {
        this.set('pageSettings.pageTitle', model.get('title'));
    }
});
