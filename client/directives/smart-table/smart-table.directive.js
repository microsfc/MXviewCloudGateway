'use strict';

angular.module('mxviewCloud')
  .directive('smartTable', function () {
    return {
      scope: {
        displayedCollection: '=',
        rowCollection: '=',
        action: '&'
      },
      restrict: 'EA',
      templateUrl: 'directives/smart-table/smart-table.html',
    };
  });
