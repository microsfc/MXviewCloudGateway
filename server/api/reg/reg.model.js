'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegSchema = new Schema({
  serverName: String,
  license:String
});

module.exports = mongoose.model('Reg', RegSchema);
