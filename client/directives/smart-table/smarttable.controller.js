/**
 * Created by chihhsien on 10/19/15.
 */
'use strict';

angular.module('mxviewCloud')
  .controller('SmartTableCtrl', ['$scope', 'Socket', function ($scope, socketio) {

    //var vm = this;

    var MXviewSiteName = ['Site1','Site2','Site3'];
    var informationEvent = [3,2,1];
    var criticalEvent = [10,5,1];
    var warningEvent = [3,5,1];
    var id = 0;

    $scope.rowCollection = [];

    socketio.on('connect', function(){
      $scope.title = 'connected';
    });

    socketio.on('user connected', function(msg){
      $scope.promo = msg;
    });

    socketio.on('mxviewcloud dashbaord', function(msg){
      $scope.promo = msg;
      var mxregister_data = JSON.parse(msg);
      for(var myKey in mxregister_data){
        if(mxregister_data.hasOwnProperty('servername')) {
          MXviewSiteName[0] = mxregister_data[myKey];

          $scope.rowCollection[0].sitename = mxregister_data[myKey];

          $scope.displayedCollection = $scope.rowCollection;
        }
      }

      mxregister_data.forEach(function(site) {
        console.log('test');
      })
    });


    function generateItem(id) {
      var sitename = MXviewSiteName[id];
      var informationCount = informationEvent[id];
      var criticalEventCount = criticalEvent[id];
      var warningEventCount = warningEvent[id];

      return {
        id: id,
        sitename: sitename,
        informationEvent: informationCount,
        criticalEvent: criticalEventCount,
        warningEvent: warningEventCount
      }
    }

    function generateRandomItem(id) {

      var sitename = MXviewSiteName[Math.floor(Math.random() * 3)];
      var informationCount = informationEvent[Math.floor(Math.random() * 3)];
      var criticalEventCount = criticalEvent[Math.floor(Math.random() * 3)];
      var warningEventCount = warningEvent.floor(Math.random() * 2000);

      return {
        id: id,
        sitename: sitename,
        informationEvent: informationCount,
        criticalEvent: criticalEventCount,
        warningEvent: warningEventCount
      }
    }

    //add to the real data holder
    $scope.addRandomItem = function addRandomItem() {
      $scope.rowCollection.push(generateRandomItem(id));
      id++;
    };



    for(id; id<3; id++) {
      $scope.rowCollection.push(generateItem(id));
    }

    $scope.displayedCollection = [].concat($scope.rowCollection);

    $scope.addItem = function addItem() {
      $scope.rowCollection.push(generateItem(id));
    }

    $scope.removeItem = function removeItem(row) {
      var index = $scope.rowCollection.indexOf(row);
      if(index != -1) {
        $scope.rowCollection.splice(index, 1);
      }
    }

    //angular.extend(vm, {
     // name: 'smart table'
    //});

  }]);
