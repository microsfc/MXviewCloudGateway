'use strict';

var path = require('path');
var _ = require('lodash');

var all = {

  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 8080,

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  secrets: {
    session: process.env.SESSION_SECRET || 'secretKey'
  },

  mxview_serverip: '192.168.127.68',

  mxview_port: 8080,

  https_defaultport : 443
};

module.exports = _.merge(all, require('./' + all.env + '.js'));
