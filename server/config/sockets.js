'use strict';


var dashboardController = require('../api/main-dashboard/main-dashboard.get');

module.exports = function (io) {

  io.on('connection', function (socket) {


    function get_register_result(result) {
      socket.emit('mxviewcloud dashbaord', result);
    }

    socket.connectDate = new Date();
    socket.ip = (socket.handshake.address) ? socket.handshake.address : null;

    // sockets inserts
    require('../api/main-dashboard/main-dashboard.socket.js').register(socket);
    //require('../api/-dashboard/-dashboard.socket.js').register(socket);

    socket.on('disconnect', function () {
      console.log('[%s] %s disconnected.', new Date().toUTCString(), socket.ip);
    });

    console.log('[%s] %s logged.', socket.connectDate.toUTCString(), socket.ip);

    dashboardController.getRegisterData(get_register_result);


    socket.on('message', function (from, msg) {

      console.log('recieved message from', from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });
      console.log('broadcast complete');
    });
  });

};
