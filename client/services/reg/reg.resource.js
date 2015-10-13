'use strict';

angular.module('mxviewCloud')
  .factory('Reg', function ($resource) {
    return $resource('/api/regs/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
