'use strict';

var MainDashboard = require('./main-dashboard.model');
var regData = require('../reg/reg.model');


module.exports =  {


  getRegisterData: function(callback) {

    var mxview_RegisterData;
    var mxview_eventCountData;

    function isEmpty(obj) {

      for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
          return false;
      }

      return true;
    }

    function getDashboard_data() {
      var all_data=[];
      if( (!isEmpty(mxview_RegisterData)) && (!isEmpty(mxview_eventCountData)) ) {
        for(var i = 0; i< mxview_RegisterData.length; i++){

          var dashboard_data = {
            'serverName' :mxview_RegisterData[i]['serverName'],
            'deviceNormal' :mxview_eventCountData[i]['deviceNormal'],
            'deviceWarning' :mxview_eventCountData[i]['deviceWarning'],
            'deviceCritical' :mxview_eventCountData[i]['deviceCritical'],
            'lat':mxview_eventCountData[i]['lat'],
            'lng':mxview_eventCountData[i]['lng']
          };

          var one_data = {
            'serverid': mxview_RegisterData[i]['_id'],
            'dashboard_data': dashboard_data
          }

          all_data.push(one_data);
        }

        callback(all_data);
      }
    }
    MainDashboard.find(function (err, data) {
    //MainDashboard.findOne({}, {}, { sort: {'created_at': -1} }, function (err, post) {
    //MainDashboard.find({}).sort({ field: 'asc', _id: -1 }).limit(1).exec(function(err, docs) {
      mxview_eventCountData = data;
      getDashboard_data();
    });

    //regData.findOne({}, {}, { sort: {'create_at':-1} }, function (err, data) {
    regData.find(function (err, data) {
      mxview_RegisterData = data;
      getDashboard_data();
    });
  }

}

//exports.name = mxview_RegisterData;

