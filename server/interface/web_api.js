var http_module = require('./../services/httpService.js');
var mxview_web_url =  require('./web_api_url.js');
var config = require('./../config/environment');
var mqTopic = require('./mqTopic.js');
var xmlParser = require('xml2js').parseString;

//var Client = require('node-rest-client').Client;
//var client = new Client();
var device_warning_countdevice_critical_count = 0;
var device_warning_count = 0;
var device_information_count = 0;
var link_critical_count = 0;
var link_warning_count = 0;
var link_information_count = 0;

var topicObj = new mqTopic();

var SEVERITY_TAG = 'Severity';
var mxviewRegKey = '';

module.exports = new web_api();

web_api.prototype.register_MXviewData = register_MXviewData;
web_api.prototype.getlink_summary = getlink_summary;
web_api.prototype.getdevice_summary = getdevice_summary;
web_api.prototype.subscribeMQTT = subscribeMQTT;

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
          if(isEmpty(linksummary_data['Severity']['Critical']['Link'])) {
            link_critical_count = 0;
            link_warning_count = 0;
            link_information_count = 0;
          }else {
            link_critical_count = linksummary_data['Severity']['Critical']['Link'].length;
            link_warning_count = linksummary_data['Severity']['Warning']['Link'].length;
            link_information_count = linksummary_data['Severity']['Information']['Link'].length;
          }

          var critical_count = device_critical_count + link_critical_count;
          var warning_count = device_warning_count + link_warning_count;
          var information_count = device_information_count + link_information_count;

          var dashboard_data = {
            "regKey": mxviewRegKey,
            "deviceNormal": information_count,
            "deviceWarning": warning_count,
            "deviceCritical": critical_count
          };

          http_module.httpRequest('localhost', 8080, mxview_web_url.getNetworkStatusURL(), 'POST', '', JSON.stringify(dashboard_data), getNetworkStatusResult);
        });
      }
    }

    http_module.httpRequest(mxviewip, config.mxview_port, mxview_web_url.getLinkSummary(), 'GET', '', '',process_linkSummary_data);
  }

  function getdevice_summary(mxviewip) {

    function process_deviceSummary_data(device_summary_data) {
      console.log('device summary data=' + device_summary_data);

      if(device_summary_data.indexOf(SEVERITY_TAG) > -1) {
        xmlParser(device_summary_data, function (err, result) {
          var devicesummary_data = result;
          if(isEmpty(devicesummary_data['Severity']['Critical']['0']['Device'])) {
            device_critical_count = 0
          }else {
            device_critical_count = devicesummary_data['Severity']['Critical']['0']['Device'].length;
          }

          if(isEmpty(devicesummary_data['Severity']['Warning']['0']['Device'])) {
            device_warning_count = 0
          }else {
            device_warning_count = devicesummary_data['Severity']['Warning']['0']['Device'].length;
          }

          if(isEmpty(devicesummary_data['Severity']['Information']['0']['Device'])) {
            device_warning_count = 0
          }else {
            device_warning_count = devicesummary_data['Severity']['Information']['0']['Device'].length;
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
          console.log('id=' +obj.regKey);
          mxviewRegKey =  obj.regKey;
          getdevice_summary(config.mxview_serverip);
          getlink_summary(config.mxview_serverip);

        }

        function register_mxview_data_to_cloud(license_data) {
          if (license_data.indexOf(License_Tag) > -1) {
            var mqtt_client = require('./mqtt_publisher.js')('ec2-52-3-105-64.compute-1.amazonaws.com');
            console.log('json result');
            xmlParser(license_data, function (err, result) {
              var license_result = JSON.stringify(result);

              var register_data = {
                "serverName": "MXview 1",
                "license": result.License.Item[0][License_Tag]
              };

              var dataString = JSON.stringify(register_data);

              function get_http_push_data(pushdata) {
                console.log('http push data =' + pushdata);

                var contain_index = pushdata.indexOf("<Trigger_Detail>");
                var parsing_data = pushdata.substring(contain_index, pushdata.length);
                xmlParser(parsing_data, function (err, result) {
                  var push_data = result;
                  var event_type = 0;
                  var critical_count = 0;
                  var information_count = 0;
                  var warning_count = 0;

                  if(!isEmpty(push_data)){

                    if(!isEmpty(push_data['Trigger_Detail'])) {
                      if(isEmpty(push_data['Trigger_Detail']['Event'])) {
                        critical_count = 0;
                      }else {

                        event_type =  push_data.Trigger_Detail.Event[0].Severity; //push_data['Trigger_Detail']['Event']['0']['Severity'];
                        switch (event_type[0]) {
                          case '0':
                                 information_count++;
                                 break;
                          case '1':
                                 warning_count++;
                                 break;
                          case '2':
                                 critical_count++;
                                 break;

                        }

                        var dynamic_dashbaord_data = {
                          'critical_count':critical_count,
                          'warning_count':warning_count,
                          'information_count':information_count
                        };

                        mqtt_client.publish(topicObj.getMXviewDashbaordTopic(), JSON.stringify(dynamic_dashbaord_data));

                      }
                    }

                  }
                });

                //mqtt_client.publish(topicObj.getMXviewDashbaordTopic(), pushdata);

              }
              //var args = {
                //data:dataString,
                //headers:{"Content-Type": "application/json"},
              //};

              //client.post(mxview_web_url.getReisterMXviewURL(), args, function(data, response) {
              //client.post('http://127.0.0.1:3000/register', args, function(data, response) {
                // parsed response body as js object
                //console.log(data);
                // raw response
                //console.log(response);
              //});

              http_module.httpRequest('localhost', 8080, mxview_web_url.getReisterMXviewURL(), 'POST', '', dataString, get_register_result);

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

