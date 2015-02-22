/* global chance */
import Ember from 'ember';
import mtcars from '../utils/mtcars';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('carData', mtcars);
  },

  actions: {
    chooseN: function(n) {
      var chosen = chance
        .unique(chance.natural, n, {max: mtcars.length - 1})
        .map(i => mtcars[i]);

      this.set('controller.carData', chosen);
    }
  }
});
