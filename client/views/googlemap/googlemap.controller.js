'use strict';

angular.module('mxviewCloud')
  .controller('GoogleMapCtrl', function () {

    var vm = this;

    vm.map = { center: { latitude: 23, longitude: 120 }, zoom: 8 };

    angular.extend(vm, {
      name: 'google map'
    });

  });
