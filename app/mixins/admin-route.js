import Ember from 'ember';

export default Ember.Mixin.create({
	beforeModel() {
		if (!this.get('session.isAuthenticated')) {
			alert('not allowed here!'); // TODO: Check if User is admin, otherwise 404
		} else {
			console.log(this.get('session.currentUser.displayName') + "!"); // TODO: remove
		}
	},
});
