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

  mxview_server_ip: '192.168.127.68',//'10.1.0.8',

  mxview_port: 8080,

  https_defaultport : 443,

  mqtt_broker_ip: '10.1.0.7', //'ec2-52-3-105-64.compute-1.amazonaws.com',

  mxview_cloud_server_ip: 'localhost', //'ec2-52-3-105-64.compute-1.amazonaws.com', //'localhost', //'192.168.2.21',

  mxview_cloud_server_port: 8080
};

module.exports = _.merge(all, require('./' + all.env + '.js'));
