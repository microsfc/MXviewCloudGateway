'use strict';

var mxview_web_api = require('./interface/web_api.js');
var mqTopic = require('./interface/mqTopic.js');
var topicObj = new mqTopic();

module.exports = function(app, mxviewServerIP, socketIO) {

  mxview_web_api.register_MXviewData(mxviewServerIP);
  //mxview_web_api.subscribeMQTT('ec2-52-3-105-64.compute-1.amazonaws.com', topicObj.getMXviewDashbaordTopic(), socketIO);
  //mxview_web_api.getdevice_summary(mxviewServerIP);
  //mxview_web_api.getlink_summary(mxviewServerIP);

}
