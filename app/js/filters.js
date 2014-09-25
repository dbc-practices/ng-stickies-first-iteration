'use strict';

/* Filters */

var myAppFilters = angular.module('myApp.filters', [])

myAppFilters.filter('unsafe', function($sce) {
  return function(val) {
    return $sce.trustAsHtml(val)
  }
})

myAppFilters.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);
