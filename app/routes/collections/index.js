import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('collection');
	},

	setupController(controller, model) {
	    this._super(controller, model);
	    this.controllerFor('application').set("pageTitle", "Collections");
	}
});
