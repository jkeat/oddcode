import Ember from 'ember';

export default Ember.Mixin.create({
	beforeModel() {
		if (!this.get('session.currentUser.isAdmin')) {
			console.log("You're not an admin!");
			this.transitionTo('index');
		}
	}
});
