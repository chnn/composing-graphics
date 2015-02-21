import Ember from 'ember';

var computed = Ember.computed;
var get = Ember.get;

/**
  Adds a layer of (x, y) points to a plot. Requires the `x` and `y` aesthetics, 
  and also the `data`, `xScale` and `yScale` properties.
  
  Optionally supports the `radius` aesthetic, as well as `color` if a 
  `colorScale` is provided.
  
  @class PlotPointsComponent
  @extends Ember.Component
*/
export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['plot-points'],

  // Required props
  data: null,
  x: null,
  y: null,
  xScale: null,
  yScale: null,

  // Optional aesthetics
  radius: 4,
  color: null,
  colorScale: function() {
    return 'black';
  },

  points: computed('data.@each', 'x', 'y', 'xScale', 'yScale', 'colorScale', function() {
    var xScale = this.get('xScale');
    var xKey = this.get('x');
    var yScale = this.get('yScale');
    var yKey = this.get('y');
    var colorScale = this.get('colorScale');
    var colorKey = this.get('color');

    return this.get('data').map(d => {
        var point = {
          data: d,
          x: xScale(get(d, xKey)),
          y: yScale(get(d, yKey))
        };

        if (colorKey) {
          point.color = colorScale(get(d, colorKey));
        } else {
          point.color = 'black';
        }

        return point;
      });
  }),
});
