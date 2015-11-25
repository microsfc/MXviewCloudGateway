angular.module('mxviewCloud')
  .directive('navBar', function () {
    return {
      restrict: 'EA',
      templateUrl: 'directives/nav-bar/nav-bar.html',
      controller: 'NavBarCtrl',
      controllerAs: 'vm'
    };
  });
