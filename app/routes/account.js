import Ember from 'ember';

export default Ember.Route.extend({
	pageSettings: Ember.inject.service(),
	
	afterModel(model, transition) {
        this.set('pageSettings.pageTitle', 'Get in or get out');
    }
});
