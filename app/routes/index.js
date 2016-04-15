import Ember from 'ember';

export default Ember.Route.extend({
	perPage: 5,

	model() {
		return this.store.query('post', {
			orderBy: 'createdTimestamp',
			limitToLast: this.get('perPage')
		}).then(posts => posts.toArray().reverse());
	},

    setupController(controller, model) {
        this._super(controller, model);
        const pageTitle = this.get('pageTitles')[Math.floor(Math.random()*this.get('pageTitles.length'))];
        this.controllerFor('application').set("pageTitle", pageTitle);
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
  },

  pageTitles: [ "Unhelpful, pretentious internet projects",
                "Make something people kind of like",
                "Software is sucking & swallowing the world",
                "So how do we solve buzzwords for the deaf?",
                "Create things that are physically addictive",
                "You have to be mentally ill to dare to create",
                "Crafted with what I think might be <3",
                "Telopods, microscoops, hypnotism",
                "I'm trying to teach my stupid mailman about Email",
                "I'm trying to teach my stupid hamster about Pets.com",
                "Product Hunt for your pretensious unemployed cousin",
                "Hacker News with no try-hard nerds and more added sugar" ]
});
