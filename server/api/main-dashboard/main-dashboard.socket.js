'use strict';

var MainDashboard = require('./main-dashboard.model');

exports.register = function (socket) {

  MainDashboard.schema.post('save', function (doc) {
    socket.emit('MainDashboard:save', doc);
  });

  MainDashboard.schema.post('remove', function (doc) {
    socket.emit('MainDashboard:remove', doc);
  });

};
