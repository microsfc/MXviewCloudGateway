'use strict';

var MainDashboard = require('./main-dashboard.model');
var regData = require('../reg/reg.model');


var mxview_RegisterData;
var mxview_eventCountData;

module.exports =  {

  getRegisterData: function(callback) {
    MainDashboard.find(function (err, data) {
      mxview_eventCountData = data ; //JSON.stringify(data);
      //callback(mxview_RegisterData);
    });

    regData.find(function (err, data) {
      var dashbaord_data = {
        "serverName" :data[1]['serverName'],
        "deviceNormal" :mxview_eventCountData[0]['deviceNormal'],
        "deviceWarning" :mxview_eventCountData[0]['deviceWarning'],
        "deviceCritical" :mxview_eventCountData[0]['deviceCritical']
      };

      mxview_RegisterData = JSON.stringify(dashbaord_data);
      callback(mxview_RegisterData);
    });
  }

}

exports.name = mxview_RegisterData;

