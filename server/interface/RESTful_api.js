var http_module = require('./../services/httpService.js');
var mxview_web_url =  require('./web_api_url.js');
var dashboard_db = require('./../api/dashboard/dashboard.model.js');

var xmlParser = require('xml2js').parseString
var Client = require('node-rest-client').Client;
var client = new Client();

module.exports = new RESTful_api();

RESTful_api.prototype.process_MXviewRegisterData = process_MXviewRegisterData;
RESTful_api.prototype.process_NetworkStatusData = process_NetworkStatusData;

function RESTful_api() {

}

function process_NetworkStatusData(req, res) {

  var device_critical_count = 0;
  var device_warning_count = 0;
  var device_information_count = 0;
  var link_critical_count = 0;
  var link_warning_count = 0;
  var link_information_count = 0;

   var dashbaord_json = {

    "critical_count" : req.body.deviceCritical,
    "warning_count" : req.body.deviceWarning,
    "normal_count" : req.body.deviceNormal

  }


  var idashboardDB = new dashboard_db(dashbaord_json);

  idashboardDB.save(function (err) {
      if (err)
        throw err;
  });


  idashboardDB.save(dashbaord_json);


  console.log('critical count =' + req.body.deviceCritical);
  console.log('warning count =' + req.body.deviceWarning);
  console.log('normail count =' + req.body.deviceNormal);

}

function process_MXviewRegisterData(req, res) {
  //var data = JSON.parse(req.param.MXviewRegisterData);
  //for (var key in data ) {
    //console.log('value='+data[key]);
  //}

  var sitename = req.body.servername;
  var license = req.body.license;
  console.log('sitename='+sitename);
  console.log('license='+license);

  res.send('successful!!');
}
