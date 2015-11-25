angular.module('mxviewCloud')
  .directive('sideBar', function () {
    return {
      restrict: 'EA',
      templateUrl: 'directives/side-bar/side-bar.html',
      controller: 'SideBarCtrl',
      controllerAs: 'vm'
    };
  });
