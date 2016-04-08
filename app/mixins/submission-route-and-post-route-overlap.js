import Ember from 'ember';

export default Ember.Mixin.create({
	afterModel(item, transition) {
		transition.send('newLink', item);
	},

	actions: {
	  newLink(item) {
	  	const newLink = this.store.createRecord('link');
	  	item.get('links').pushObject(newLink);
	  },

	  saveItem(newItem) {
	  	this._destroyEmptyLinks(newItem).then(Ember.RSVP.all(newItem.get('links').invoke('save')).then(() => {
	  		newItem.save().then(() => this.sendAction('transitionAfterSave'));
	  	}));
	  },

	  transitionAfterSave() {
	  	this.transitionTo('index');
	  },
	},

	_destroyEmptyLinks(item) {
		let promises = [];
		item.get('links').forEach((link) => {
			if (link.get('isEmpty')) { promises.push(link.destroyRecord()); }
		});
		return Ember.RSVP.all(Ember.$.makeArray(promises));
	}
});
