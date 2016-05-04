import Ember from 'ember';

export default Ember.Route.extend({
	pageSettings: Ember.inject.service(),
	
	model(params) {
		// TODO: the model hook isn't entered when navigating from the index, or a place that already has it loaded.
		// ..but it is entered when going back and forth with the back/forward buttons... huh?

		// TODO: slug it up
		// TODO: order by date
		// const name = params.collection_slug;
		// return this.store.query('collection', {
		// 	orderBy: 'name',
		// 	startAt: name,
		// 	limitToFirst: 1
		// }).then((results) => {
		// 	const collection = results.get('firstObject');
		// 	if (collection && collection.get('name') === name) {
		// 		return collection;
		// 	} else {
		// 		this.transitionTo('collections');
		// 	}
		// });
		return this.store.findRecord('collection', params.collection_id);
	},

	afterModel(model, transition) {
        this.set('pageSettings.pageTitle', "collections / " + model.get('name'));
        this.set('pageSettings.showFooter', true);
    },

	// serialize(model) {
	// 	return { "collection_slug": model.get('name') };
	// },

	actions: {
		willTransition() {
            this.set('pageSettings.showFooter', false);
        }
	}
});
