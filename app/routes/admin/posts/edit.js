import Ember from 'ember';
import SubmissionRouteAndPostRouteOverlap from 'oddcode/mixins/submission-route-and-post-route-overlap';
import SubmissionRouteAndPostRouteAdminOverlap from 'oddcode/mixins/submission-route-and-post-route-admin-overlap';

export default Ember.Route.extend(SubmissionRouteAndPostRouteOverlap, SubmissionRouteAndPostRouteAdminOverlap, {
	model(params) {
		return this.store.findRecord('post', params.post_id);
	},

	setupController(controller, model) {
	    this._super(controller, model);
	    this.controllerFor('application').set("pageTitle", "You're editing an approved post");
	    controller.set('createdOnText', 'Approved');

	    // Get each collection from the references to them, build a comma-sep'd list and set it as the default collection input
	    Ember.RSVP.all(model.get('collections').map((collectionReference) => {
	    	return this.store.findRecord('collection', collectionReference.get('id'));
	    })).then((arrayOfCollections) => {
	    	const commaCollections = arrayOfCollections.map((c) => {
	    		return c.get('name');
	    	}).join(", ");
	    	controller.set('collectionsInput', commaCollections);
	    });
	},

	actions: {
		saveItem(model) {
			// alert('Top of saveItem');
			const collectionNames = this._parseCommaList(this.controller.get('collectionsInput'));
			this._updateCollections(model, collectionNames).then(() => {
				// alert("Bout to sudo super");
				// Ember doesn't support calling _super asynchronously, so I copy & pasted the mixin's saveItem block :/
				model.set('updatedOn', new Date());
				model.set('updatedTimestamp', new Date().getTime());
				this._destroyEmptyLinks(model).then(Ember.RSVP.all(model.get('links').invoke('save')).then(() => {
					model.save().then(() => { this.send('afterSave', model); });
				}));
			});
		},

		unapprovePost(model) {
			const newSubmission = this.store.createRecord('submission', {
				title: model.get('title'),
				URL: model.get('URL'),
				description: model.get('description'),
				createdOn: model.get('createdOn'),
				updatedOn: new Date(),
				imageURL: model.get('imageURL')
			});
			let links = model.get('links');
			for (let i = links.get('length') - 1; i >= 0; i--) {
				let link = links.objectAt(i);
				model.get('links').removeObject(link);
				newSubmission.get('links').pushObject(link);
			}
			this._destroyEmptyLinks(newSubmission).then(() => {
				Ember.RSVP.all(newSubmission.get('links').invoke('save')).then(() => {
					newSubmission.save().then(() => {
						model.destroyRecord().then(() => {
							this.send('afterUnapprove');
						});
					});
				});
			});
		},

	  	afterUnapprove() {
	  		this.transitionTo('index');
	  	},

	  	afterDelete() {
	  		this.transitionTo('index');
	  	}
	},

	_parseCommaList(text) {
		if (!text) { return []; }
		let items = text.split(',');
		items.forEach((itm, i) => items[i] = itm.trim());
		items = items.filter(Boolean); // Remove empty strings
		return items;
	},

	_updateCollections(post, collectionNames) {
		// alert('Top of _updateCollections');
		let allCollections = [];
		let findCollectionPromises = [];
		collectionNames.forEach((name) => {
			let findCollectionPromise = this.store.query('collection', {
			    orderBy: 'name',
			    startAt: name,
			    limitToFirst: 1
			});
			findCollectionPromises.addObject(findCollectionPromise);
		});
		return Ember.RSVP.all(findCollectionPromises).then((arrayOfCollectionQueries) => {
			let saveNewCollectionPromises = [];
			arrayOfCollectionQueries.forEach((collectionQuery, index) => {
				let collection = collectionQuery.get('firstObject');
				if (collection && collection.get('name') === collectionNames[index]) {
					allCollections.addObject(collection);
					// alert('Collection existed');
				} else {
					// Need to create a new collection
					let newCollection = this.store.createRecord('collection', { name: collectionNames[index] });
					allCollections.addObject(newCollection);
					let saveNewCollectionPromise = newCollection.save();
					saveNewCollectionPromises.addObject(saveNewCollectionPromise);
					// alert('Created new collection');
				}
			});
			return Ember.RSVP.all(saveNewCollectionPromises);
		}).then(() => {
			// Add the post to the collection's list of posts if it's not there already
			let saveChangedCollectionsPromises = [];
			allCollections.forEach((collection) => {
				if (!collection.get('posts').contains(post)) {
					collection.get('posts').addObject(post);
					post.get('collections').addObject(collection); // This is saved later on
					let saveChangedCollectionsPromise = collection.save();
					saveChangedCollectionsPromises.addObject(saveChangedCollectionsPromise);
					// alert('Added post to collection, presumably collection is also added to post');
				}
			});

			for (var i = post.get('collections.length') - 1; i >= 0; i--) {
				let collection = post.get('collections').objectAt(i);
				if (!allCollections.contains(collection)) {
					collection.get('posts').removeObject(post);
					// alert(collection.get("posts.length"));
					post.get('collections').removeObject(collection);
					let saveChangedCollectionsPromise = collection.save();
					saveChangedCollectionsPromises.addObject(saveChangedCollectionsPromise);
				}
			}
			return Ember.RSVP.all(saveChangedCollectionsPromises);
		}).then(() => {
			// Get post collections. If there are any that aren't in allCollections, remove those from post's collections
			return 0;
		}).catch(console.log.bind(console));
		// alert('Bottom of _updateCollections');
	}
});
