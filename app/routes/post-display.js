import Ember from 'ember';

export default Ember.Route.extend({
	pageSettings: Ember.inject.service(),
	
	model(params) {
		return this.store.findRecord('post', params.post_id);
	},

	afterModel(model, transition) {
        this.set('pageSettings.pageTitle', model.get('title'));
    }
});
