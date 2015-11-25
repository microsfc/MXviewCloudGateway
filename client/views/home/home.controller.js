'use strict';

angular.module('mxviewCloud')
  .controller('HomeCtrl', function (Socket) {

    var vm = this;

    angular.extend(vm, {
      mapCenter: {
        lat: 24.984095,
        lng: 121.551983,
        zoom: 16
      },
      mapMarkers: {
        taipeiMarker: {
          lat: 24.984095,
          lng: 121.551983,
          message: "Taipei",
          focus: true,
          draggable: false
        },
      },
      defaults: {
        scrollWheelZoom: false
      }
    });

    Socket.on('connect', function(){
      vm.title = 'connected';
    });

    Socket.on('user connected', function(msg){
      vm.promo = msg;
    });
  });
