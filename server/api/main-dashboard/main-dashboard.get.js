'use strict';

var MainDashboard = require('./main-dashboard.model');

var mxview_RegisterData;

module.exports =  {

  getRegisterData: function(callback) {
    MainDashboard.find(function (err, data) {
      mxview_RegisterData = JSON.stringify(data);
      callback(mxview_RegisterData);
    });
  }

}

exports.name = mxview_RegisterData;

