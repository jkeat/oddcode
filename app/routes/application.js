import Ember from 'ember';

export default Ember.Route.extend({
	pageSettings: Ember.inject.service(),

	beforeModel() {
	  	return this.get("session").fetch().catch(function() {});
	},

	setupController(controller, model) {
		this._super(controller, model);
		controller.set('pageSettings', this.get('pageSettings'));
	},

	actions: {
	  	signIn(provider) {
	    	this.get("session").open("firebase", { provider: provider}).then(function(/* data */) {
	        	// console.log(data.currentUser);
	    	});
	  	},
	  	signOut() {
	    	this.get("session").close();

	    	/* TODO: this is hacky way to prevent errors from popping up complaining the user now
	    	         does not have permission to view the models they had previously loaded. I assume
	    	         there's a way to clear the store cache that will fix that, but nothing I tried was working. */
	    	window.location = this.router.generate('account');
	  	},
	}
});