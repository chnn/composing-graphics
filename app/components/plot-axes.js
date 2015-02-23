/* global d3 */
import Ember from 'ember';

/**
  Provides a plottable area wrapped in x and y axes. Requires the `xScale`, 
  `yScale`, `width`, `height`, and `margin` properties.

  @class PlotAxes
  @extends Ember.Component
*/
export default Ember.Component.extend({
  classNames: ['plot-axes'],

  // Required properties
  xScale: null,
  yScale: null,
  width: null,
  height: null,
  margin: null,

  didInsertElement: function() {
    this.renderAxes();
  },

  // Using an imperative form of rendering the template here in order to control 
  // transitions easily. Scheduling the render function with `Ember.run.once` 
  // allows all dependent properties to finish synchronizing before the render 
  // function accesses them.
  axesChanged: Ember.observer('yScale', 'xScale', function() {
    Ember.run.once(this, 'renderAxes');
  }),

  renderAxes: function() {
    if (!this.$()) {
      return;
    }

    var del = d3.select(this.$()[0]);
    var xAxis = d3.svg.axis()
      .outerTickSize(0)
      .innerTickSize(- this.get('height'))
      .scale(this.get('xScale'))
      .orient('bottom');
    var yAxis = d3.svg.axis()
      .innerTickSize(- this.get('width'))
      .outerTickSize(0)
      .scale(this.get('yScale'))
      .orient('left');

    del.select('.x.axis')
      .transition()
      .call(xAxis);
    del.select('.y.axis')
      .transition()
      .call(yAxis);
  }
});
