import Ember from 'ember';

export default Ember.Controller.extend({
  app: Ember.inject.controller('application'),

  subsets: Ember.computed('app.carData.@each', function() {
    return [4, 6, 8].map(cyl => this.get('app.carData').filterBy('cyl', cyl));
  }),
});
