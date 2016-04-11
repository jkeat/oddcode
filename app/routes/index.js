import Ember from 'ember';

export default Ember.Route.extend({
	perPage: 3,

	model() {
		return this.store.query('post', {
			orderBy: 'createdTimestamp',
			limitToLast: 3 // TODO: pagination
		}).then(posts => posts.toArray().reverse());
	},

	actions: {
        loadMore() {
        	// console.log('loading');
        	// console.log('lastObject.createdTimestamp: ' + this.controller.get('model.lastObject.createdTimestamp'));
        	const newPosts = this.store.query('post', {
        		orderBy: 'createdTimestamp',
        		endAt: this.controller.get('model.lastObject.createdTimestamp') - 1,
        		limitToLast: this.get('perPage')
        	}).then((posts) => {
        		// console.log("first: " + posts.get('firstObject.title'));
        		// console.log("last: " + posts.get('lastObject.title'));
        		// console.log(posts);
        		// console.log("length: " + posts.get('length'));
        		if (posts.get('length') < this.get('perPage')) {
        			this.controller.set('endResults', true);
        		}
        		const orderedPosts = posts.toArray().reverse();
        		this.controller.get('model').addObjects(orderedPosts);
        	});
        }
    }
});
