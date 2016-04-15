import Ember from 'ember';

export default Ember.Mixin.create({
	actions: {
		willTransition(transition) {
		  let model = this.controller.get('model');

		  if (model.get('hasDirtyAttributes') || this._checkIfLinksHaveDirtyAttributes(model.get('links'))) {
		    let confirmation = confirm("Exit without saving?");

		    if (confirmation) {
		      model.rollbackAttributes();
		      model.get('links').toArray().forEach(link => link.rollbackAttributes());
		    } else {
		      transition.abort();
		    }
		  } else {
		  	this._destroyEmptyLinks(model);
		  }
		}
	},

	_checkIfLinksHaveDirtyAttributes(links) {
		let dirty = false;
		links.forEach((link) => {
			// Can't simply check its hasDirtyAttributes property; the link itself is new, so it's dirty
			if (link.get('eitherIsFilled') && link.get('isNew')) { dirty = true; }
		});
		return dirty;
	}
});
