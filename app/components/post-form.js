import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		formSubmitted(post) {
			this.sendAction('submitPost', post);
		},
		updateLinkTriggered() {
			const links = this.get('post.links');
			if (links.get('lastObject').get('title') || links.get('lastObject').get('URL')) {
				if (links.get('length') < 3) {
					this.sendAction('newLink', this.get('post'));
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