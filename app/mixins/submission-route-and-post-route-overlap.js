import Ember from 'ember';

// TODO: DELETE ITEM

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
	  	newItem.set('updatedOn', new Date());
	  	this._destroyEmptyLinks(newItem).then(Ember.RSVP.all(newItem.get('links').invoke('save')).then(() => {
	  		newItem.save().then(() => this.send('transitionAfterSave'));
	  	}));
	  },

	  transitionAfterSave() {
	  	this.transitionTo('index');
	  },
	},

	_destroyEmptyLinks(item) {
		let promises = [];
		let links = item.get('links');
		for (let i = links.get('length') - 1; i >= 0; i--) {
			let link = links.objectAt(i);
			if (link.get('eitherIsEmpty')) { promises.push(link.destroyRecord()); }
		}
		return Ember.RSVP.all(Ember.$.makeArray(promises));
	}
});
