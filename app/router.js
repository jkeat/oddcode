import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('submit');
  this.route('admin', function() {
    this.route(':post_id', function() {
      this.route('edit');
    });
  });
});

export default Router;
