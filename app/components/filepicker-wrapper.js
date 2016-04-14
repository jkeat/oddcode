import Ember from 'ember';

export default Ember.Component.extend({
	imageOptions: {
	    mimetypes: ['image/*'],
	    imageDim: [210, 140],
	    cropRatio: 1.5, // 3:2
	},

	actions: {
		pickWithFilepicker() {
		    this.set('openPicker', true);
		},
		onClose() {
			this.set('openPicker', false);
		},
		fileSelected(img) {
			this.get('item').set('imageURL', img.url);
		}
	}
});
