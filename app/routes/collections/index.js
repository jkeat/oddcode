import Ember from 'ember';

export default Ember.Route.extend({
	pageSettings: Ember.inject.service(),
	
	model() {
		return this.store.findAll('collection');
	},

	afterModel(model, transition) {
        this.set('pageSettings.pageTitle', "Collections");
    },
});
