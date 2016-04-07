import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.store.findRecord('post', params.post_id).then((post) => {
			let newLink = this.store.createRecord('link');
			post.get('links').pushObject(newLink);
			return post;
		});
	},

	actions: {

	  savePost(newPost) {
	  	this._destroyEmptyLinks(newPost).then(Ember.RSVP.all(newPost.get('links').invoke('save')).then(() => {
	  		newPost.save().then(() => this.transitionTo('admin.index'));
	  	}));
	  },

	  newLink(post) {
	  	const newLink = this.store.createRecord('link');
	  	post.get('links').pushObject(newLink);
	  },

	  willTransition() {
	    let model = this.controller.get('model');
		model.rollbackAttributes();
		model.get('links').toArray().forEach(link => link.rollbackAttributes());
	  }
	},

	_destroyEmptyLinks(post) {
		let promises = [];
		post.get('links').forEach((link) => {
			if (link.get('isEmpty')) { promises.push(link.destroyRecord()); }
		});
		return Ember.RSVP.all(Ember.$.makeArray(promises));
	}
});
