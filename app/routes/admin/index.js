import Ember from 'ember';

export default Ember.Route.extend({
    pageSettings: Ember.inject.service(),
	perPage: 10,

	model() {
		return this.store.query('submission', {
			orderBy: 'updatedTimestamp',
			limitToLast: this.get('perPage')
		}).then(submissions => submissions.toArray().reverse());
	},

    afterModel() {
        this.set('pageSettings.pageTitle', "These are unapproved submissions");
    },

    setupController(controller, model) {
	    this._super(controller, model);

	    if (controller.get('model.length') < this.get('perPage')) {
	        controller.set('endOfResults', true);
	    }
	},

	actions: {
        loadMore() {
        	this.store.query('submission', {
        		orderBy: 'updatedTimestamp',
        		endAt: this.controller.get('model.lastObject.updatedTimestamp') - 1,
        		limitToLast: this.get('perPage')
        	}).then((submissions) => {
        		if (submissions.get('length') < this.get('perPage')) {
        			this.controller.set('endOfResults', true);
        		}
        		const orderedSubmissions = submissions.toArray().reverse();
        		this.controller.get('model').addObjects(orderedSubmissions);
        	});
        },

        willTransition() {
            this.controller.set('endOfResults', false);
        }
    }
});
