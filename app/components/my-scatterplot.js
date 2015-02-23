import Ember from 'ember';
import {
  linearScale,
  category10Scale
} from '../utils/plot-macros';

/**
  @class MyScatterplotComponent
  @extends Ember.Component
*/
export default Ember.Component.extend({
  classNames: ['my-scatterplot'],

  // Passed in by parent context
  data: null,
  x: null,
  y: null,
  color: null,

  height: 200,
  width: 100,
  margin: 25,

  xScale: linearScale('data', 'x', 'width', 0.1),

  yScale: linearScale('data', 'y', 'height', 0.1),

  colorScale: category10Scale('data', 'color'),

  didInsertElement: function() {
    // After inserting the element, set it's width and height from what's 
    // currently in the DOM. Allows accessing the dimensions of the element in 
    // JavaScript even though they are originally specified in CSS.
    var margin = this.get('margin');
    this.setProperties({
      width: this.$().width() - margin,
      height: this.$().height() - margin
    });
  },

});
