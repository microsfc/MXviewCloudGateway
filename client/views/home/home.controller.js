'use strict';

angular.module('mxviewCloud')
  .controller('HomeCtrl', function (Socket) {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

    Socket.on('connect', function(){
      vm.title = 'connected';
    });

    Socket.on('user connected', function(msg){
      vm.promo = msg;
    });

  });
