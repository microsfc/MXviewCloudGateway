'use strict';

var mxview_web_api = require('./interface/web_api.js');
var mqTopic = require('./interface/mqTopic.js');
var topicObj = new mqTopic();

module.exports = function(app, mxviewServerIP, socketIO) {

  mxview_web_api.register_MXviewData(mxviewServerIP);

  /*var PORT = 41234;
  var HOST = '127.0.0.1';

  var dgram = require('dgram');
  var server = dgram.createSocket('udp4');

  server.on('error', function(err) {
      console.log('server error:\n${err.stack}');
      server.close();
  });

  server.on('message', function(msg, remoteInfo){
    console.log('server got: ${msg} from ${remoteInfo.address}:${remoteInfo.port}');
  });

  server.on('listening', function(){
    var address = server.address();
    console.log('server listening ${address.address}:${address.port}');
  });

  server.bind(41234);

  var message = new Buffer(18);
  message[0] = 0xAA;
  message[1] = 0xFF;
  message[2] = 0xFF;

  var client = dgram.createSocket('udp4');

  client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    client.close();
  });*/

  mxview_web_api.subscribeMQTT('10.1.0.7', topicObj.getMXviewDashbaordTopic(), socketIO);
  //mxview_web_api.getdevice_summary(mxviewServerIP);
  //mxview_web_api.getlink_summary(mxviewServerIP);

};
