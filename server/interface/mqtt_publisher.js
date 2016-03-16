
module.exports = function(broker_ip) {

    //var module = {};
    var mqtt    = require('mqtt');

    var client  = mqtt.connect('mqtt://' + broker_ip); //192.168.127.68'
    var g_topic = "";
    var g_message = "";
    var connected = 0;

    client.on('connect', function () {
        console.log('mqtt connected');
        //client.subscribe(g_topic);
        //client.publish(g_topic, g_message);
        //client.publish(g_topic);
      connected = 1;
    });

    client.on('disconnect', function(packet) {
        console.log('mqtt client is disconnected');
    });

    client.on('close', function(packet) {
        console.log('mqtt client is closed');
        client.end();
        connected = 0;
    });

    client.on('error', function(packet) {
        console.log('mqtt client occurs error');
    });

    return {
      publish:function(topic, message) {
        g_topic = topic;
        g_message = message;

        if(connected) {
          client.publish(g_topic, g_message);
        }
      }
    };

}
