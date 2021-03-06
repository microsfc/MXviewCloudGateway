'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var RegSchema = new Schema({
  serverName: String,
  license:String,
  lat:String,
  lng:String
});

RegSchema.plugin(autoIncrement.plugin, 'Reg');

module.exports = mongoose.model('Reg', RegSchema);
