'use strict';

angular.module('mxviewCloud')
  .controller('SideBarCtrl', function ($location) {
    var vm = this;
    vm.menu = [
      {'title': 'Dashboard', 'link': '/'},
      {'title': 'Device List', 'link': '/deviceList'},
      {'title': 'Topology', 'link': '/topology'}
    ];

    vm.isActive = function(route) {
      return route === $location.path();
    };

  });
