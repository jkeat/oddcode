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
	  	newItem.set('updatedOn', new Date());
	  	newItem.set('updatedTimestamp', new Date().getTime());
	  	this._destroyEmptyLinks(newItem).then(Ember.RSVP.all(newItem.get('links').invoke('save')).then(() => {
	  		newItem.save().then(() => { this.send('afterSave', newItem); });
	  	}));
	  },

	  afterSave(item) {
	  	this.send('newLink', item);
	  },

	  deleteItem(item) {
	  	const confirmation = confirm("DELETE?");
	  	if (confirmation) {
	  		Ember.RSVP.all(item.get('links').invoke('destroyRecord')).then(() => {
	  			item.destroyRecord().then(() => {
	  				this.send('afterDelete');
	  			});
	  		});
	  	}
	  }
	},

	_destroyEmptyLinks(item) {
		let promises = [];
		let links = item.get('links');
		for (let i = links.get('length') - 1; i >= 0; i--) {
			let link = links.objectAt(i);
			if (link.get('eitherIsEmpty')) {
				links.removeObject(link);
				promises.push(link.destroyRecord()); 
			}
		}
		return Ember.RSVP.all(Ember.$.makeArray(promises));
	}


});
