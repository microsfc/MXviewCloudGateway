
module.exports = function(broker_ip, socket){

    var module = {};
    var mqtt    = require('mqtt');

    var client  = mqtt.connect('mqtt://' + broker_ip); //192.168.127.68'
    var g_topic = "";
    var g_message = "";

    client.on('connect', function () {
        console.log('mqtt connected');
        client.subscribe(g_topic);
    });

    client.on('disconnect', function(packet) {
        console.log('mqtt client is disconnected');
    });

    client.on('close', function(packet) {
        console.log('mqtt client is closed');
        client.end();
    });

    client.on('error', function(packet) {
        console.log('mqtt client occurs error');
    });

    client.on('message', function (topic, message) {
      // message is Buffer

      console.log("mqtt receive = " + message.toString());
      g_message = message.toString();
      //client.end();
    } );

    module.subscribe = function(topic) {
      //client.subscribe(topic);
      g_topic = topic;
    };

    socket.on('connection', function(socket) {
      setInterval(function() {
        if(g_message.length > 0){
          socket.emit('mxviewcloud trigger_data', g_message);
          g_message = '';
        }
      }, 1000);
    });

    return module;
}
