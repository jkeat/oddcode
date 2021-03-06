import Ember from 'ember';

export default Ember.Route.extend({
	perPage: 5,

    pageSettings: Ember.inject.service(),

	model() {
        // TODO: return all cached if peek at all cached is more than 5!

		// return this.store.query('post', {
		// 	orderBy: 'createdTimestamp',
		// 	limitToLast: this.get('perPage')
		// }).then(posts => posts.toArray().reverse());


        return Ember.RSVP.hash({
            posts: this.store.query('post', {
                orderBy: 'createdTimestamp',
                limitToLast: this.get('perPage')
            }).then(posts => posts.toArray().reverse()),
            collections: this.store.findAll('collection')
        });
	},

    afterModel() {
        this.set('pageSettings.pageTitle', 'Quality Internet Projects');
        this.set('pageSettings.showFooter', true);
    },

    setupController(controller, model) {
        this._super(controller, model);
        if (controller.get('model.length') < this.get('perPage')) {
            controller.set('endOfResults', true);
        }
    },

	actions: {
        loadMore() {
        	this.store.query('post', {
        		orderBy: 'createdTimestamp',
        		endAt: this.controller.get('model.posts.lastObject.createdTimestamp') - 1,
        		limitToLast: this.get('perPage')
        	}).then((posts) => {
        		if (posts.get('length') < this.get('perPage')) {
        			this.controller.set('endOfResults', true);
        		}
        		const orderedPosts = posts.toArray().reverse();
        		this.controller.get('model.posts').addObjects(orderedPosts);
        	});
        },

        willTransition() {
            this.set('pageSettings.showFooter', false);
            this.controller.set('endOfResults', false);
        }
  }
});
