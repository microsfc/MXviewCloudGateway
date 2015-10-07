/*
MXview Web API
*/
var LOGIN_URL = '/goform/account/?uid=admin&pwd=moxa&action=login';
var GETLICENSE = '/goform/license?action=get';
var GETDEVICE_SUMMARY = '/goform/device?action=severity_summary&user_name=admin&password=';
var GETLINK_SUMMARY = '/goform/link?action=severity_summary&user_name=admin&password=';


/* MXviewCloud Restful API */
var REGISTER_MXVIEW_SITE = '/register';
var GETNETWORK_STATUS_URL = '/getNetworkStatus';


module.exports = new web_API_URL();

web_API_URL.prototype.getLicenseURL = getLicenseURL;
web_API_URL.prototype.getLoginURL = getLoginURL;
web_API_URL.prototype.getReisterMXviewURL = getRegisterMXviewURL;
web_API_URL.prototype.getDeviceSummary = getDeviceSummary;
web_API_URL.prototype.getLinkSummary = getLinkSummary;
web_API_URL.prototype.getNetworkStatusURL = getNetworkStatusURL;


function web_API_URL() {
  console.log('construct web_API_URL');
}

function getLicenseURL() {
  return GETLICENSE;
}

function getDeviceSummary() {
  return GETDEVICE_SUMMARY;
}

function getLinkSummary() {
  return GETLINK_SUMMARY;
}

function getLoginURL() {
  return LOGIN_URL;
}

function getRegisterMXviewURL() {
  return REGISTER_MXVIEW_SITE;
}

function getNetworkStatusURL() {
  return GETNETWORK_STATUS_URL;
}


