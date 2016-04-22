import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('submit');
  this.route('admin', function() {
    this.route('posts', function() {
      this.route('edit', { path: "/:post_id/edit" });
    });

    this.route('submissions', function() {
      this.route('edit', { path: "/:submission_id/edit" });
    });
  });
  this.route('account');
  this.route('collections', function() {
    // this.route('collection-display', { path: "/:collection_slug" });
    this.route('collection-display', { path: "/:collection_id" });
  });
  this.route('about');
  this.route('post-display', { path: "/:post_id" });
  this.route('error', { path: "/error/*path" });
  this.route('not-found', { path: "/*path" });
});

export default Router;
