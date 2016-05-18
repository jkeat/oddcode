import Ember from 'ember';

export default Ember.Route.extend({
	pageSettings: Ember.inject.service(),
	
	afterModel() {
        this.set('pageSettings.pageTitle', 'Error');
    }
});
