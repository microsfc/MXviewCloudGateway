'use strict';

angular.module('mxviewCloud')
  .factory('MainDashboard', function ($resource) {
    return $resource('/api/main-dashboards/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
