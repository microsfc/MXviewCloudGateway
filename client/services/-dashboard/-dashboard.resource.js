'use strict';

angular.module('mxviewCloud')
  .factory('Dashboard', function ($resource) {
    return $resource('/api/-dashboards/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
