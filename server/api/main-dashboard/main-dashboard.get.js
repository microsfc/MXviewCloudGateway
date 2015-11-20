'use strict';

var MainDashboard = require('./main-dashboard.model');
var regData = require('../reg/reg.model');


var mxview_RegisterData;
var mxview_eventCountData;

module.exports =  {

  getRegisterData: function(callback) {
    MainDashboard.find(function (err, data) {
    //MainDashboard.findOne({}, {}, { sort: {'created_at': -1} }, function (err, post) {
    //MainDashboard.find({}).sort({ field: 'asc', _id: -1 }).limit(1).exec(function(err, docs) {
      mxview_eventCountData = data;
    });

    //regData.findOne({}, {}, { sort: {'create_at':-1} }, function (err, data) {
    regData.find(function (err, data) {
      var all_data=[];
      for(var i = 0; i< data.length; i++){

        var dashboard_data = {
          'serverName' :data[i]['serverName'],
          'deviceNormal' :mxview_eventCountData[i]['deviceNormal'],
          'deviceWarning' :mxview_eventCountData[i]['deviceWarning'],
          'deviceCritical' :mxview_eventCountData[i]['deviceCritical']
        };
        var one_data = {
          'serverid': data[i]['_id'],
          'dashboard_data': dashboard_data
        }

        all_data.push(one_data);
      }

      mxview_RegisterData = all_data;//JSON.stringify(all_data);
      callback(all_data);
    });
  }

}

exports.name = mxview_RegisterData;

