/* global d3 */
import Ember from 'ember';

var computed = Ember.computed;


/**
  @method linearScale
  @param {Object} options
  @param {String} options.dataKey
  @param {String} options.dataPropKey
  @param {String} options.rangeMaxKey
  @param {Number} [options.padding=0]
  @return {Function} A computed property that returns a linear scale.
*/
export function linearScale(dataKey, propKey, rangeKey, padding) {
  return computed(`${dataKey}.@each`, propKey, rangeKey, function() {
      var xs = this.get(dataKey).mapBy(this.get(propKey));
      var domain = d3.extent(xs);
      var range = [0, this.get(rangeKey)];

      if (padding) {
        let paddingDelta = padding * (domain[1] - domain[0]);
        domain[0] -= paddingDelta;
        domain[1] += paddingDelta;
      }

      return d3.scale.linear().domain(domain).range(range);
    });
}

/**
  @method category10Scale
  @param {Object} options
  @param {String} options.dataKey
  @param {String} options.dataPropKey
  @return {Function} A computed property that returns a color (ordinal) scale.
*/
export function category10Scale(dataKey, dataPropKey) {
  return computed(`${dataKey}.@each`, dataPropKey, function() {
      var dataProp = this.get(dataPropKey);

      if (!dataProp) {
        return () => 'black';
      }

      var domain = this.get(dataKey).mapBy(this.get(dataPropKey));
      return d3.scale.category10().domain(domain);
    });
}
