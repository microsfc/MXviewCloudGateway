'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var MainDashboardSchema = new Schema({
  regKey: String,
  deviceNormal: String,
  deviceWarning: String,
  deviceCritical: String,
  lat:String,
  lng:String
});

MainDashboardSchema.plugin(autoIncrement.plugin, 'MainDashboard');

module.exports = mongoose.model('MainDashboard', MainDashboardSchema);
