import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('simple');
  this.route('layer');
  this.route('layers');
});

export default Router;
