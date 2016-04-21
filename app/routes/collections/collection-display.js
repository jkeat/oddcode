import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		// TODO: order by date
		const name = params.collection_slug;
		return this.store.query('collection', {
			orderBy: 'name',
			startAt: name,
			limitToFirst: 1
		}).then((results) => {
			const collection = results.get('firstObject');
			if (collection && collection.get('name') === name) {
				return collection;
			} else {
				this.transitionTo('collections');
			}
		});
	},

	setupController(controller, model) {
	    this._super(controller, model);
	    this.controllerFor('application').set("pageTitle", "collections / " + model.get('name'));
	    this.controllerFor('application').set("showFooter", true);
	},

	serialize(model) {
		return { "collection_slug": model.get('name') };
	},

	actions: {
		willTransition() {
            this.controllerFor('application').set("showFooter", false);
        }
	}
});
