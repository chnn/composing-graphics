import Ember from 'ember';
import mtcars from '../utils/mtcars';

var computed = Ember.computed;

export default Ember.Controller.extend({
  someData: mtcars,

  subsets: computed('someData.@each', function() {
    return [4, 6, 8].map(cyl => this.get('someData').filterBy('cyl', cyl));
  }),
});
