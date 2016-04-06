import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		let firstLink = this.store.createRecord('link');
		let post = this.store.createRecord('post');
		post.get('links').pushObject(firstLink);
		return post;
	},

	actions: {

	  savePost(newPost) {
	  	this._destroyEmptyLinks(newPost).then(Ember.RSVP.all(newPost.get('links').invoke('save')).then(() => {
	  		newPost.save().then(() => this.transitionTo('index'));
	  	}));
	  },

	  newLink(post) {
	  	const newLink = this.store.createRecord('link');
	  	post.get('links').pushObject(newLink);
	  },

	  willTransition() {
	    let model = this.controller.get('model');

	    if (model.get('isNew')) {
	      model.get('links').invoke('destroyRecord');
	      model.destroyRecord();
	    }
	  }
	},

	_destroyEmptyLinks(post) {
		let promises = [];
		post.get('links').forEach((link) => {
			if (link.get('isEmpty')) promises.push(link.destroyRecord());
		})
		return Ember.RSVP.all($.makeArray(promises));
	}
});
