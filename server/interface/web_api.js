var http_module = require('./../services/httpService.js');
var mxview_web_url =  require('./web_api_url.js');
var xmlParser = require('xml2js').parseString;
//var Client = require('node-rest-client').Client;
//var client = new Client();
var device_critical_count = 0;
var device_warning_count = 0;
var device_information_count = 0;
var link_critical_count = 0;
var link_warning_count = 0;
var link_information_count = 0;

module.exports = new web_api();

web_api.prototype.register_MXviewData = register_MXviewData;
web_api.prototype.getlink_summary = getlink_summary;
web_api.prototype.getdevice_summary = getdevice_summary;

  function web_api() {

  }

  function getlink_summary(mxviewip) {

    function process_linkSummary_data(link_summary_data) {
      console.log('link summary data=' + link_summary_data);

      function getNetworkStatusResult(result) {
        console.log('result='+result)
      }

      xmlParser(link_summary_data, function(err, result) {
        var linksummary_data = result;
        link_critical_count = linksummary_data['Severity']['Critical']['Link'].length;
        link_warning_count = linksummary_data['Severity']['Warning']['Link'].length;
        link_information_count = linksummary_data['Severity']['Information']['Link'].length;

        var critical_count = device_critical_count + link_critical_count;
        var warning_count = device_warning_count + link_warning_count;
        var information_count = device_information_count + link_information_count;

        var dashboard_data = {
          "serverName": "MXview 1",
          "deviceNormal": information_count,
          "deviceWarning": warning_count,
          "deviceCritical": critical_count
        };

        http_module.httpRequest('localhost', 3000, mxview_web_url.getNetworkStatusURL(), 'POST', '', dashboard_data, getNetworkStatusResult);
      });
    }

    http_module.httpsRequest(mxviewip, 443, mxview_web_url.getLinkSummary(), 'GET', '', process_linkSummary_data);
  }

  function getdevice_summary(mxviewip) {

    function process_deviceSummary_data(device_summary_data) {
      console.log('device summary data=' + device_summary_data);

      xmlParser(device_summary_data, function(err, result) {
        var devicesummary_data = result;
        device_critical_count = devicesummary_data['Severity']['Critical'].length;
        device_warning_count = devicesummary_data['Severity']['Warning'].length;
        device_information_count = devicesummary_data['Severity']['Information'].length;
      });
    }

    http_module.httpsRequest(mxviewip, 443, mxview_web_url.getDeviceSummary(), 'GET', '', process_deviceSummary_data);


  }

  function register_MXviewData(serverip) {

      var hashcode_tag = 'Hash=';

      var hashCode = '';
      var License_Tag = "License_Str";

      function get_mxview_license(hashcode, serverip) {

        function get_register_result(result) {
          console.log('register result =' + result);
        }

        function register_mxview_data_to_cloud(license_data) {
          if (license_data.indexOf(License_Tag) > -1) {
            //var mqtt_client = require('./mqtt_client.js')('ec2-52-3-105-64.compute-1.amazonaws.com');
            console.log('json result');
            xmlParser(license_data, function (err, result) {
              var license_result = JSON.stringify(result);

              var register_data = {
                "servername": "MXview 1",
                "license": result.License.Item[0][License_Tag]
              };

              var dataString = JSON.stringify(register_data);

              function get_http_push_data(result) {
                console.log('http push data =' + result);
              }
              //var args = {
                //data:dataString,
                //headers:{"Content-Type": "application/json"},
              //};
              //mqtt_client.publish(topicObj.getRegisterMXviewTopic(), JSON.stringify(register_data));

              //client.post(mxview_web_url.getReisterMXviewURL(), args, function(data, response) {
              //client.post('http://127.0.0.1:3000/register', args, function(data, response) {
                // parsed response body as js object
                //console.log(data);
                // raw response
                //console.log(response);
              //});

              http_module.httpRequest('localhost', 3000, mxview_web_url.getReisterMXviewURL(), 'GET' +
                '', hashcode, dataString, get_register_result);

              console.log('license=' + result.License.Item[0][License_Tag]);
              console.log(license_result);
              console.log('Done');

              http_module.httpPushFromMXview(serverip, 8080, 'GET', hashcode, get_http_push_data);

            });
          }
        }

        http_module.httpsRequest(serverip, 443, mxview_web_url.getLicenseURL(), 'GET', hashcode, register_mxview_data_to_cloud);
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

      http_module.httpsRequest(serverip, 443, mxview_web_url.getLoginURL(), 'GET', '', get_mxview_register_data);

  }

