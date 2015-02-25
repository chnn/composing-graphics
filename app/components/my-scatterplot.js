import Ember from 'ember';
import {
  linearScale,
  category10Scale
} from '../utils/plot-macros';

/**
  A simple scatterplot component that has axes and a layer of points.

  Additional layers can be added as block parameters.

  @class MyScatterplotComponent
  @extends Ember.Component
*/
export default Ember.Component.extend({
  classNames: ['my-scatterplot'],

  // Required properties, must be passed in by parent context
  data: null,
  x: null,
  y: null,
  color: null,

  // Default dimensions, are reset in `didInsertElement`
  height: 200,
  width: 100,
  margin: 25,

  xScale: linearScale('data', 'x', 0, 'width', 0.05),
  yScale: linearScale('data', 'y', 'height', 0, 0.05),
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
  }
});
