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
            markerColor: 'blue'
          },
        },
      },
      blueIcon: {
        type: 'awesomeMarker',
        markerColor: 'blue'
      },
      yellowIcon: {
        type: 'awesomeMarker',
        markerColor: 'yellow'
      },
      redIcon: {
        type: 'awesomeMarker',
        markerColor: 'red'
      }
    });

    Socket.on('connect', function(){
      $scope.title = 'connected';
    });

    Socket.on('user connected', function(msg){
      $scope.promo = msg;
    });

    $scope.changeBlue = function() {
      $scope.mapMarkers.taipeiMarker.icon=$scope.blueIcon;
    };
    $scope.changeYellow = function() {
      $scope.mapMarkers.taipeiMarker.icon=$scope.yellowIcon;
    };
    $scope.changeRed = function() {
      $scope.mapMarkers.taipeiMarker.icon=$scope.redIcon;
    };
  });
