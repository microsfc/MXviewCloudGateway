'use strict';

angular.module('mxviewCloud')
  .controller('HomeCtrl', function ($scope, $window, Socket) {
    $scope.collection = [];
    $scope.markers = {};

    Socket.on('mxviewcloud trigger_data', function (msg) {
      console.log('mxviewcloud trigger_data = ', msg);
      var update_data = JSON.parse(msg);
      $scope.collection[update_data.regKey].informationEvent = parseInt(update_data.information_count);
      $scope.collection[update_data.regKey].criticalEvent = parseInt(update_data.critical_count);
      $scope.collection[update_data.regKey].warningEvent = parseInt(update_data.warning_count);
      $scope.collection[update_data.regKey].lat = update_data.lat;
      $scope.collection[update_data.regKey].lng = update_data.lng;

      $scope.displayed = $scope.collection;
      $scope.addMarker($scope.displayed);
    });

    Socket.on('mxviewcloud dashbaord', function(msg) {
      console.log('mxviewcloud dashbaord = ', msg);
      for(var i = 0; i<msg.length; i++){
        var site_data = {
          id: msg[i].dashboard_data._id,
          sitename: msg[i].dashboard_data.serverName,
          informationEvent: msg[i].dashboard_data.deviceNormal,
          criticalEvent: msg[i].dashboard_data.deviceCritical,
          warningEvent: msg[i].dashboard_data.deviceWarning,
          lat: msg[i].dashboard_data.lat,
          lng: msg[i].dashboard_data.lng
        };
        $scope.collection.push(site_data);
      }
      $scope.displayed = [].concat($scope.collection);
      $scope.addMarker($scope.displayed);
    });

    $scope.openMXview = function() {
      $window.open('http://10.1.0.5:8080','_blank');
    };

    angular.extend($scope, {
      center: {
        lat: 24.984095,
        lng: 121.551983,
        zoom: 4
      },
      blueIcon: {
        type: 'awesomeMarker',
        icon: 'home',
        markerColor: 'blue'
      },
      yellowIcon: {
        type: 'awesomeMarker',
        icon: 'home',
        markerColor: 'yellow'
      },
      redIcon: {
        type: 'awesomeMarker',
        icon: 'home',
        markerColor: 'red'
      }
    });

    $scope.addMarker = function(collection) {
      for (var i = 0; i < collection.length; i++) {
        $scope.markers['marker_' + i] = {
          lat: parseFloat(collection[i].lat),
          lng: parseFloat(collection[i].lng),
          focus: true,
          draggable: false,
          icon: {
            type: 'awesomeMarker',
            icon: 'home',
            markerColor: 'blue'
          },
        };
        if (collection[i].criticalEvent > 0) {
          $scope.markers['marker_' + i].icon = $scope.redIcon;
        } else if (collection[i].warningEvent > 0) {
          $scope.markers['marker_' + i].icon = $scope.yellowIcon;
        } else {
          $scope.markers['marker_' + i].icon = $scope.blueIcon;
        }
        console.log('markers = ', $scope.markers);
      }
    };
  });
