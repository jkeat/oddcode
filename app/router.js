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
  this.route('login');
});

export default Router;
