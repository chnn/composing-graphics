/* global d3 */
import Ember from 'ember';
var computed = Ember.computed;


function isString(s) {
  return Ember.typeOf(s) === 'string';
}

/**
  Creates a linear scale function.

  ```javascript
  var s = makeLinearScale([0, 10], [0, 300]);

  s(5)  // => 150
  s.invert(150)  // => 5
  ```

  @method makeLinearScale
  @param {Array} domain
  @param {Array} range
  @return {Function}
*/
export function makeLinearScale(domain, range) {
  return d3.scale.linear()
    .domain(domain)
    .range(range);
}

/**
  Creates a computed property that returns a linear scale using 
  `makeLinearScale` based on supplied property keys. Uses the extent of supplied 
  data as the scale domain, with an optional padding setting.

  Range values can be passed as strings that will be looked up as properties, or 
  as primitive values.

  @method linearScale
  @param {String} dataKey
  @param {String} propKey
  @param {String|Number} rangeMin
  @param {String|Number} rangeMax
  @param [padding=0]
  @return {Function} A computed property that returns a linear scale.
*/
export function linearScale(dataKey, propKey, rangeMin, rangeMax, padding) {
  // The number of dependent keys for the computed property changes based on 
  // whether the supplied `rangeMin` and `rangeMax` are property keys or values. 
  // This `computed.apply` ugliness lets the computed property be created with 
  // the correct dependent key arguments. Once jquery/esprisma#1057 is resolved 
  // this can be written using ES2015 spread elements instead:
  //
  //     return computed(...keys, function() {});
  //
  var args = Array.prototype.slice.call(arguments).filter(isString);
  args[0] = `${dataKey}.@each`;
  args.push(function() {
    var xs = this.get(dataKey).mapBy(this.get(propKey));
    var domain = d3.extent(xs);
    var r0 = isString(rangeMin) ? this.get(rangeMin) : rangeMin;
    var r1 = isString(rangeMax) ? this.get(rangeMax) : rangeMax;

    if (padding) {
      let paddingDelta = padding * (domain[1] - domain[0]);
      domain[0] -= paddingDelta;
      domain[1] += paddingDelta;
    }

    return makeLinearScale(domain, [r0, r1]);
  });

  return computed.apply(this, args);
}

/**
  Returns an ordinal scale that can map up to 10 categorical variables to a 
  color.


  ```javascript
  var s = makeCategory10Scale(['a', 'b', 'c']);

  s('a')  // => '#1f77b4'
  s('b')  // => '#ff7f0e'
  ```

  @method makeCategory10Scale
  @param {Array} domain List of categorical variables.
  @return {Function}
*/
export function makeCategory10Scale(domain) {
  return d3.scale.category10().domain(domain);
}

/**
  Creates a computed property that returns a color scale based on supplied 
  property keys.

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
      return makeCategory10Scale(domain);
    });
}
