/* global d3 */
import Ember from 'ember';

var computed = Ember.computed;
var get = Ember.get;

/**
  Plots a simple linear regression as a SVG path, using supplied data and 
  aesthetics.

  @class PlotRegressionComponent
  @extends Ember.Component
*/
export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['plot', 'plot-regression'],

  // Require properties
  data: null,
  x: null,
  y: null,
  xScale: null,
  yScale: null,

  // Optional
  color: null,
  colorScale: null,
  
  xs: computed('x', 'xScale', 'data.@each', function() {
    return this.get('data')
      .mapBy(this.get('x'))
      .map(this.get('xScale'));
  }),

  ys: computed('y', 'yScale', 'data.@each', function() {
    return this.get('data')
      .mapBy(this.get('y'))
      .map(this.get('yScale'));
  }),

  /**
    Gets the coefficients $\hat{\alpha}, \hat{\beta}$ for a regression line.

    See http://en.wikipedia.org/wiki/Simple_linear_regression for math.
  
    @property regStats
    @type Array The regression constants `[betaHat, alphaHat]`.
  */
  regStats: computed('xs', 'ys', function() {
    var xs = this.get('xs');
    var ys = this.get('ys');

    var xBar = d3.mean(xs);
    var yBar = d3.mean(ys);
    var points = d3.zip(xs, ys);

    var num = points.reduce((sum, [x, y]) => (x - xBar) * (y - yBar), 0);
    var denom = points.reduce((sum, [x]) => (x - xBar) * (x - xBar), 0);
    var betaHat = num / denom;
    var alphaHat = yBar - (betaHat * xBar);

    return [betaHat, alphaHat];
  }),

  line: computed('xs', 'regStats', function() {
    var xs = this.get('xs');
    var [betaHat, alphaHat] = this.get('regStats');

    var yHats = xs.map(x => betaHat * x + alphaHat);

    var points = d3.zip(xs, yHats);
    var line = d3.svg.line().interpolate('linear')(points);

    return line;
  }),

  stroke: computed('colorScale', 'color', 'data.@each', function() {
    var scale = this.get('colorScale');
    var color = this.get('color');

    if (!scale || !color) {
      return 'black';
    }

    return scale(get(this.get('data').objectAt(0), color));
  }),
});
