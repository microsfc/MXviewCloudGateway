'use strict';

var MainDashboard = require('./main-dashboard.model');
var regData = require('../reg/reg.model');


var mxview_RegisterData;
var mxview_eventCountData;

module.exports =  {

  getRegisterData: function(callback) {
    //MainDashboard.find(function (err, data) {
    //MainDashboard.findOne({}, {}, { sort: {'created_at': -1} }, function (err, post) {
    MainDashboard.find({}).sort({ field: 'asc', _id: -1 }).limit(1).exec(function(err, docs) {
      mxview_eventCountData = docs;
    });
    //mxview_eventCountData = MainDashboard.find().sort({ field: 'asc', _id: -1 }).limit(1).find(function(err, maindashboard) {
      //mxview_eventCountData = maindashboard;
    //});
    //;, function (err, post) {
      //mxview_eventCountData = post ; //JSON.stringify(data);
      //callback(mxview_RegisterData);
    //};


    //regData.findOne({}, {}, { sort: {'create_at':-1} }, function (err, data) {
    regData.find(function (err, data) {
      var dashbaord_data = {
        "serverName" :data['0']['serverName'],
        "deviceNormal" :mxview_eventCountData['0']['deviceNormal'],
        "deviceWarning" :mxview_eventCountData['0']['deviceWarning'],
        "deviceCritical" :mxview_eventCountData['0']['deviceCritical']
      };

      mxview_RegisterData = JSON.stringify(dashbaord_data);
      callback(mxview_RegisterData);
    });
  }

}

exports.name = mxview_RegisterData;

