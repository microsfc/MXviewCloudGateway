'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var RegSchema = new Schema({
  serverName: String,
  license:String
});

RegSchema.plugin(autoIncrement.plugin, 'Reg');

module.exports = mongoose.model('Reg', RegSchema);
