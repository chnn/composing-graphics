import Ember from 'ember';
import {
  linearScale,
  category10Scale
} from '../utils/plot-macros';

/**
  @class MyScatterploComponent
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

  xScale: linearScale({
    dataKey: 'data',
    dataPropKey: 'x',
    rangeMaxKey: 'width',
    padding: 0.05
  }),

  yScale: linearScale({
    dataKey: 'data',
    dataPropKey: 'y',
    rangeMaxKey: 'height',
    padding: 0.05
  }),

  colorScale: category10Scale({
    dataKey: 'data',
    dataPropKey: 'color'
  }),
});
