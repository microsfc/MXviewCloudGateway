'use strict';

angular.module('mxviewCloud')
  .controller('HomeCtrl', function ($scope ,Socket) {

    //var vm = this;

    angular.extend($scope, {
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
          draggable: false,
          icon: {
            type: 'awesomeMarker',
            icon: 'home',
            markerColor: 'red'
          },
        },
      },
      defaultIcon: {},
      awesomeMarkerIcon: {
        type: 'awesomeMarker',
        icon: 'tag',
        markerColor: 'red'
      }
    });

    Socket.on('connect', function(){
      $scope.title = 'connected';
    });

    Socket.on('user connected', function(msg){
      $scope.promo = msg;
    });
  });
