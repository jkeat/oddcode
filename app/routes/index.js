import Ember from 'ember';

export default Ember.Route.extend({
	perPage: 5,

	model() {
        // TODO: return all cached if peek at all cached is more than 5!
		return this.store.query('post', {
			orderBy: 'createdTimestamp',
			limitToLast: this.get('perPage')
		}).then(posts => posts.toArray().reverse());
	},

    setupController(controller, model) {
        this._super(controller, model);
        this.controllerFor('application').set("pageTitle", "Quality internet projects");
        this.controllerFor('application').set("showFooter", true);
        if (controller.get('model.length') < this.get('perPage')) {
            controller.set('endOfResults', true);
        }
    },

	actions: {
        loadMore() {
        	this.store.query('post', {
        		orderBy: 'createdTimestamp',
        		endAt: this.controller.get('model.lastObject.createdTimestamp') - 1,
        		limitToLast: this.get('perPage')
        	}).then((posts) => {
        		if (posts.get('length') < this.get('perPage')) {
        			this.controller.set('endOfResults', true);
        		}
        		const orderedPosts = posts.toArray().reverse();
        		this.controller.get('model').addObjects(orderedPosts);
        	});
        },

        willTransition() {
            this.controllerFor('application').set("showFooter", false);
            this.controller.set('endOfResults', false);
        }
  }
});
