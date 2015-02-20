/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/d3/d3.js');
app.import('bower_components/skeleton-css/css/normalize.css');
app.import('bower_components/skeleton-css/css/skeleton.css');

module.exports = app.toTree();
