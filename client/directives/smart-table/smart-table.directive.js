'use strict';

angular.module('mxviewCloud')
  .directive('smartTable', function () {
    return {
      restrict: 'EA',
      templateUrl: 'directives/smart-table/smart-table.html',
      controller: 'SmartTableCtrl',
      controllerAs: 'vm'
    };
  });
