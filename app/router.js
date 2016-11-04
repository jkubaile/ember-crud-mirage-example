import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('addresses', function() {
    this.route('new');

    this.route('edit', {
      path: ':address_id/edit'
    });
  });
});

export default Router;
