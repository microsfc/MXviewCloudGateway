'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MainDashboardSchema = new Schema({
  regKey: String,
  deviceNormal: String,
  deviceWarning: String,
  deviceCritical: String

});

module.exports = mongoose.model('MainDashboard', MainDashboardSchema);
