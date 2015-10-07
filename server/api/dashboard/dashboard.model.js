'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DashboardSchema = new Schema({
  siteID: Number,
  sitename: String,
  criticalcount: Number,
  warningcount: Number,
  informationcount: Number
});


module.exports = mongoose.model('Dashboard', DashboardSchema);
