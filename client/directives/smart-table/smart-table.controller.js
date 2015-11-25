/**
 * Created by chihhsien on 10/19/15.
 */
'use strict';

angular.module('mxviewCloud')
  .controller('SmartTableCtrl', ['Socket', function (Socket) {

    var vm = this;

    var MXviewSiteName = ['Site1','Site2','Site3'];
    var informationEvent = [3,2,1];
    var criticalEvent = [10,5,1];
    var warningEvent = [3,5,1];
    var id = 0;

    vm.rowCollection = [];

    Socket.on('connect', function(){
      vm.title = 'connected';
    });

    Socket.on('user connected', function(msg){
      vm.promo = msg;
    });

    Socket.on('mxviewcloud trigger_data', function (msg) {
      console.log('trigger_data=' + msg);
      var update_data = JSON.parse(msg);
      vm.rowCollection[update_data['regKey']].informationEvent = parseInt(update_data['information_count']);
      vm.rowCollection[update_data['regKey']].criticalEvent = parseInt(update_data['critical_count']);
      vm.rowCollection[update_data['regKey']].warningEvent = parseInt(update_data['warning_count']);

      vm.displayedCollection = vm.rowCollection;
    });

    Socket.on('mxviewcloud dashbaord', function(msg){
      for(var i = 0; i<msg.length; i++){
        var site_data = {
          id: msg[i]['dashboard_data']['_id'],
          sitename: msg[i]['dashboard_data']['serverName'],
          informationEvent: msg[i]['dashboard_data']['deviceNormal'],
          criticalEvent: msg[i]['dashboard_data']['deviceCritical'],
          warningEvent: msg[i]['dashboard_data']['deviceWarning']
        };
        vm.rowCollection.push(site_data);
      }
      vm.displayedCollection = [].concat(vm.rowCollection);
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
      };
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
      };
    }

    //add to the real data holder
    vm.addRandomItem = function addRandomItem() {
      vm.rowCollection.push(generateRandomItem(id));
      id++;
    };

    vm.removeItem = function removeItem(row) {
      var index = vm.rowCollection.indexOf(row);
      if(index != -1) {
        vm.rowCollection.splice(index, 1);
      }
    };
  }]);
