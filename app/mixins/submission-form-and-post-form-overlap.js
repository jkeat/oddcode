import Ember from 'ember';

export default Ember.Mixin.create({
	actions: {
		formSubmitted(item) {
			this.sendAction('submitItem', item);
		},
		updateLinkTriggered() {
			const links = this.get('item.links');
			if (links.get('lastObject').get('title') || links.get('lastObject').get('URL')) {
				if (links.get('length') < 4) {
					this.sendAction('newLink', this.get('item'));
				}
			}
		},
		deleteLinkTriggered(link) {
			link.destroyRecord().then(() => {
				this.send('updateLinkTriggered');
			});
		}
	}
});