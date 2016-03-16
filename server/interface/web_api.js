var http_module = require('./../services/httpService.js');
var mxview_web_url =  require('./web_api_url.js');
var config = require('./../config/environment');
var mqTopic = require('./mqTopic.js');
var xmlParser = require('xml2js').parseString;
var xmlTojson2Parser = require('xml2json');

//var Client = require('node-rest-client').Client;
//var client = new Client();
var device_critical_count = 0;
var device_warning_count = 0;
var device_information_count = 0;
var link_critical_count = 0;
var link_warning_count = 0;
var link_information_count = 0;

var topicObj = new mqTopic();

var SEVERITY_TAG = 'Severity';
var mxviewRegKey = '';
var mxviewlat = '';
var mxviewlng = '';

module.exports = new web_api();

web_api.prototype.register_MXviewData = register_MXviewData;
web_api.prototype.getlink_summary = getlink_summary;
web_api.prototype.getdevice_summary = getdevice_summary;
web_api.prototype.subscribeMQTT = subscribeMQTT;

var apn = require('apn');

  function web_api() {

  }

  function isEmpty(obj) {
    for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
    }

    return true;
  }

  function subscribeMQTT(brokerip, subscribe_topic, socket) {
    var mqtt_client = require('./mqtt_subscriber.js')(brokerip, socket);
    mqtt_client.subscribe(subscribe_topic)
  }

  function getlink_summary(mxviewip) {

    function process_linkSummary_data(link_summary_data) {
      console.log('link summary data=' + link_summary_data);

      function getNetworkStatusResult(result) {
        console.log('result='+result)
      }

      if(link_summary_data.indexOf(SEVERITY_TAG) > -1) {
        xmlParser(link_summary_data, function (err, result) {

          var linksummary_data = result;

         if(!isEmpty(linksummary_data)) {
           if(!isEmpty(linksummary_data['Severity']['Critical']['0']['Link']))
           {
             link_critical_count = linksummary_data['Severity']['Critical']['0']['Link'].length;
           }else {
             link_critical_count = 0;
           }
           if(!isEmpty(linksummary_data['Severity']['Warning']['0']['Link']))
           {
             link_warning_count = linksummary_data['Severity']['Warning']['0']['Link'].length;
           }else{
             link_warning_count = 0;
           }
           if(!isEmpty(linksummary_data['Severity']['Information']['0']['Link']))
           {
             link_information_count = linksummary_data['Severity']['Information']['0']['Link'].length;
           }else{
             link_information_count = 0;
           }

           var critical_count = device_critical_count + link_critical_count;
           var warning_count = device_warning_count + link_warning_count;
           var information_count = device_information_count + link_information_count;

           var dashboard_data = {
             "regKey": mxviewRegKey,
             "deviceNormal": information_count,
             "deviceWarning": warning_count,
             "deviceCritical": critical_count,
             "lat":mxviewlat,
             "lng":mxviewlng
           };

           http_module.httpRequest(config.mxview_cloud_server_ip, config.mxview_cloud_server_port, mxview_web_url.getNetworkStatusURL(), 'POST', '', JSON.stringify(dashboard_data), getNetworkStatusResult);
         }

        });
      }
    }

    http_module.httpRequest(mxviewip, config.mxview_port, mxview_web_url.getLinkSummary(), 'GET', '', '',process_linkSummary_data);
  }

function process_trigger_linkSummary_data(link_summary_data, count) {
  if(isEmpty(link_summary_data[count]['Critical']['0']['Link'])) {
    link_critical_count = 0;
  }else {
    link_critical_count = link_summary_data[count]['Critical']['0']['Link'].length;
  }

  if(isEmpty(link_summary_data[count]['Warning']['0']['Link'])) {
    link_warning_count = 0;
  }else {
    link_warning_count = link_summary_data[count]['Warning']['0']['Link'].length;
  }

  if(isEmpty(link_summary_data[count]['Information']['0']['Link'])) {
    link_information_count = 0;
  }else {
    link_information_count = link_summary_data[count]['Information']['0']['Link'].length;
  }
}

function process_trigger_deviceSummary_data(device_summary_data, count) {


      if(isEmpty(device_summary_data[count]['Critical']['0']['Device'])) {
        device_critical_count = 0;
      }else {
        device_critical_count = device_summary_data[count]['Critical']['0']['Device'].length;
      }

      if(isEmpty(device_summary_data[count]['Warning']['0']['Device'])) {
        device_warning_count = 0;
      }else {
        device_warning_count = device_summary_data[count]['Warning']['0']['Device'].length;
      }

      if(isEmpty(device_summary_data[count]['Information']['0']['Device'])) {
        device_information_count = 0;
      }else {
        device_information_count = device_summary_data[count]['Information']['0']['Device'].length;
      }
}

  function getdevice_summary(mxviewip) {


    function process_deviceSummary_data(device_summary_data) {
      console.log('device summary data=' + device_summary_data);

      if(device_summary_data.indexOf(SEVERITY_TAG) > -1) {
        xmlParser(device_summary_data, function (err, result) {
          var devicesummary_data = result;
          if(!isEmpty(devicesummary_data)) {
            if(isEmpty(devicesummary_data['Severity']['Critical']['0']['Device'])) {
              device_critical_count = 0;
            }else {
              device_critical_count = devicesummary_data['Severity']['Critical']['0']['Device'].length;
            }

            if(isEmpty(devicesummary_data['Severity']['Warning']['0']['Device'])) {
              device_warning_count = 0;
            }else {
              device_warning_count = devicesummary_data['Severity']['Warning']['0']['Device'].length;
            }

            if(isEmpty(devicesummary_data['Severity']['Information']['0']['Device'])) {
              device_information_count = 0;
            }else {
              device_information_count = devicesummary_data['Severity']['Information']['0']['Device'].length;
            }
          }

        });
      }
    }

    http_module.httpRequest(mxviewip, config.mxview_port, mxview_web_url.getDeviceSummary(), 'GET', '', '',process_deviceSummary_data);


  }

  function register_MXviewData(serverip) {

      var hashcode_tag = 'Hash=';

      var hashCode = '';
      var License_Tag = "License_Str";

      function get_mxview_license(hashcode, serverip) {

        function get_register_result(result) {
          console.log('register result =' + result);
          var obj = JSON.parse(result);
          console.log('id=' +obj._id);
          mxviewRegKey =  obj._id;
          mxviewlat = obj.lat;
          mxviewlng = obj.lng;

          getdevice_summary(config.mxview_server_ip);
          getlink_summary(config.mxview_server_ip);

        }

        function register_mxview_data_to_cloud(license_data) {
          if (license_data.indexOf(License_Tag) > -1) {
            var mqtt_client = require('./mqtt_publisher.js')(config.mqtt_broker_ip);
            console.log('json result');
            xmlParser(license_data, function (err, result) {
              var license_result = JSON.stringify(result);

              var register_data = {
                "serverName": "MXview 1",
                "license": result.License.Item[0][License_Tag],
                "lat":'24.984095',
                "lng":'121.551983'
              };

              var dataString = JSON.stringify(register_data);

              function get_http_push_data(pushdata) {

                var start_trigger_index = pushdata.indexOf("<Trigger");
                var end_trigger_index = pushdata.indexOf("</Trigger");
                console.log('parsing data1='+pushdata);
                var parsing_data = pushdata.substring(start_trigger_index, end_trigger_index);
                var json = xmlTojson2Parser.toJson(parsing_data); //returns a string containing the JSON structure by default
                console.log('json result='+json);
                mqtt_client.publish(topicObj.getMXviewDashbaordTopic(), json);

                /*try {

                  xmlParser(parsing_data, function (err, result) {
                    var push_data = result;
                    //var event_type = 0;
                    var critical_count = 0;
                    var information_count = 0;
                    var warning_count = 0;

                    if(err) {
                      throw err;
                    }else {
                      if(!isEmpty(push_data)){

                        if(!isEmpty(push_data['Trigger_Detail'])) {
                          if(isEmpty(push_data['Trigger_Detail']['Severity'])) {
                            console.log('parsing data='+parsing_data);
                          }else {

                            if(!isEmpty(push_data['Trigger_Detail']['Severity'])) {
                              for(var j=0; j<push_data['Trigger_Detail']['Severity'].length; j++){

                                if(!isEmpty(push_data['Trigger_Detail']['Severity'][j]['Critical']['0']['Device'])
                                  || !isEmpty(push_data['Trigger_Detail']['Severity'][j]['Warning']['0']['Device'])
                                  || !isEmpty(push_data['Trigger_Detail']['Severity'][j]['Information']['0']['Device'])
                                ) {
                                  process_trigger_deviceSummary_data(push_data['Trigger_Detail']['Severity'], j);
                                }

                                if(!isEmpty(push_data['Trigger_Detail']['Severity'][j]['Critical']['0']['Link'])
                                  || !isEmpty(push_data['Trigger_Detail']['Severity'][j]['Warning']['0']['Link'])
                                  || !isEmpty(push_data['Trigger_Detail']['Severity'][j]['Information']['0']['Link'])
                                ) {
                                  process_trigger_linkSummary_data(push_data['Trigger_Detail']['Severity'], j);
                                }

                              }
                            }

                            critical_count = device_critical_count + link_critical_count;
                            warning_count = device_warning_count + link_warning_count;
                            information_count = device_information_count + link_information_count;
                            /*if(critical_count > 0) {
                             var notify = new apn.Notification();
                             notify.device = new apn.Device("2ed782cae33636f3308d23400a9aad7015b90bacbd7ad8cc11addb892f71ab6c"); // ""裡面放欲推撥裝置的token
                             notify.badge = 1;     // App icon上面的數字badge
                             notify.alert = "port link down";    // 推撥顯示文字
                             new apn.Connection({
                             cert:'APNS.crt.pem',
                             key:'APNS.key.pem',
                             production:true,
                             connectionTimeout: 10000,
                             gateway: 'gateway.push.apple.com', //'gateway.push.apple.com'//'gateway.sandbox.push.apple.com'
                             }).pushNotification(notify, notify.device);
                             }*/

                            /*var dynamic_dashbaord_data = {
                              "regKey": mxviewRegKey,
                              'critical_count':critical_count,
                              'warning_count':warning_count,
                              'information_count':information_count,
                              'lat': mxviewlat,
                              'lng': mxviewlng
                            };

                            mqtt_client.publish(topicObj.getMXviewDashbaordTopic(), JSON.stringify(dynamic_dashbaord_data));

                          }
                        }

                      }
                    }

                  });
                }catch(ex) {
                  //throw new Error('something bad happened');
                  console.log(ex.msg);
                }*/
                //mqtt_client.publish(topicObj.getMXviewDashbaordTopic(), pushdata);

              }


              http_module.httpRequest(config.mxview_cloud_server_ip, config.mxview_cloud_server_port, mxview_web_url.getReisterMXviewURL(), 'POST', '', dataString, get_register_result);

              console.log('license=' + result.License.Item[0][License_Tag]);
              console.log(license_result);
              console.log('Done');

              http_module.httpPushFromMXview(serverip, config.mxview_port, 'GET', hashcode, get_http_push_data);

            });
          }
        }

        http_module.httpsRequest(serverip, config.https_defaultport, mxview_web_url.getLicenseURL(), 'GET', hashcode, register_mxview_data_to_cloud);
      }

      function get_mxview_register_data(hashdata) {
          console.log('BODY: ' + hashdata);
          var arr = hashdata.split(";");
          hashCode = arr[0].substring(arr[0].indexOf(">") +1, arr[0].length);
          console.log('hashcode='+hashCode);
          if(hashCode.indexOf(hashcode_tag) > -1) {
            get_mxview_license(hashCode, serverip);
          }
      }

      http_module.httpsRequest(serverip, config.https_defaultport, mxview_web_url.getLoginURL(), 'GET', '', get_mxview_register_data);

  }

