import Ember from 'ember';
export default Ember.Route.extend({
	beforeModel: function() {
	  return this.get("session").fetch().catch(function() {});
	},
	actions: {
	  signIn: function(provider) {
	    this.get("session").open("firebase", { provider: provider}).then(function(data) {
	        console.log(Boolean("Jack Keating" === data.currentUser)); // use 'data' var to make JShint shut up.
	    });
	  },
	  signOut: function() {
	    this.get("session").close();
	    this.transitionTo('index');
	  }
	}
});