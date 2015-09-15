'use strict'

angular.module('mxviewCloud')
.config(function ($routeProvider) {
    $routeProvider
      .when('/googlemap' , {
        templateUrl: 'views/googlemap/googlemap.html',
        controller: 'GoogleMapCtrl',
        controllerAs: 'vm'
      });
  });
