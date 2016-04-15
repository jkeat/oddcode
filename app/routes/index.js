import Ember from 'ember';

export default Ember.Route.extend({
	perPage: 5,

    pageTitles: ["Unhelpful, pretentious internet projects",
                "Make something people kind of like",
                "Software is sucking & swallowing the world",
                "So how do we solve buzzwords for the deaf?",
                "Create things that are physically addictive",
                "You have to be mentally ill to dare to create",
                "Crafted with what I think might be <3",
                "Telopods, microscoops, hypnotism",
                "I'm trying to teach my stupid mailman about Email",
                "I'm trying to teach my stupid hamster about Pets.com",
                "I go on the internet, but I also own books",
                "I make niche jokes and then don't laugh"],

    aboutIntros: ["Hi! ",
                  "Yo! ",
                  "Hi. ",
                  "Welcome! ",
                  "Hey! ",
                  "Hey there! ",
                  "Hey. "],

    aboutPreStarts: ["I'm ",
                     "We're ",
                     "Think of us as ",
                     "Essentially we're ",
                     "Essentially I'm ",
                     "Basically I'm ",
                     "Basically we're ",
                     "Basically this site is ",
                     "Think of us as ",
                     "Think of me as ",
                     "The general idea is to be "],

    aboutStarts: ["Product Hunt",
                  "Hacker News",
                  "Product Hunt",
                  "Hacker News",
                  "Stumble Upon",
                  "Lobste.rs",
                  "Wired",
                  "Dribbble"],

    aboutEnds: [" for your ironic cousin",
                ": The Bad Parts",
                " for little boys",
                " without a lot of basic features",
                " with way more corn syrup",
                " for punk clowns",
                " without try-hard nerds",
                " but like, there's less pressure",
                " with no aspirations",
                " for people who hate it there",
                " but the buzzwords are ironic"],

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

        let tinyFooterPreStart = this.get('aboutPreStarts')[Math.floor(Math.random()*this.get('aboutPreStarts.length'))];
        if (Math.random() < 0.5) {
            const tinyFooterIntro = this.get('aboutIntros')[Math.floor(Math.random()*this.get('aboutIntros.length'))];
            tinyFooterPreStart = tinyFooterIntro + tinyFooterPreStart;
        }
        const tinyFooterStart = this.get('aboutStarts')[Math.floor(Math.random()*this.get('aboutStarts.length'))];
        const tinyFooterEnd = this.get('aboutEnds')[Math.floor(Math.random()*this.get('aboutEnds.length'))];
        const tinyFooterAbout = tinyFooterPreStart + tinyFooterStart + tinyFooterEnd;
        this.controllerFor('application').set("showFooter", true);
        this.controllerFor('application').set("tinyFooterAbout", tinyFooterAbout);


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
        }
    }
});
