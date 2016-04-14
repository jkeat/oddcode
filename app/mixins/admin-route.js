import Ember from 'ember';

export default Ember.Mixin.create({
	beforeModel() {
		if (!this.get('session.currentUser.isAdmin')) {
			this.transitionTo('account');
		}
	},

	actions: {
		error(e) {
			this.transitionTo('account');
		}
	}
});
