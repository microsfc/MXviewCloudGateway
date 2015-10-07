var https = require('https');
var http = require('http');

module.exports =  {

        httpsRequest: function(hostip, port, path, request_type, hashcode, callback) {
            var options = {
                host: hostip,
                port: port,
                path: path,
                headers: {'accept':'*/*'},
                rejectUnauthorized: false,
                requestCert: true,
                agent: false,
                method: request_type,
                headers: {'Cookie': hashcode}
            };

            var ret = https.request(options, function(res) {
                console.log('STATUS:' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    callback(chunk);
                });
            });

            ret.on('error', function (e) {
                console.log('problem with request: ' + e.message);
            });

            ret.end();


        },

        httpRequest: function(hostip, port, path, request_type, hashcode, postData, callback) {

            var options = {
                host: hostip,
                port: port,
                path: path,
                method: request_type,
                headers: {
                  'Content-Type': "application/json",
                  'Content-Length': postData.length
                }
            };

            var REQ = http.request(options, function(res) {
                console.log('STATUS:' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    callback(chunk);
                });
            });

            REQ.on('error', function (e) {
                console.log('problem with request: ' + e.message);
            });

            REQ.write(postData);
            REQ.end();
        },

        httpPushFromMXview: function(hostip, port, request_type, hashcode, callback) {

          var http = require('http');
          var Agent = require('agentkeepalive');
          var xmlParser = require('xml2js').parseString;
          var xmlStart_String = "Trigger_Detail";

          var keepaliveAgent = new Agent({
            maxSocket: 100,
            maxFreeSockets:10,
            timeout: 180000,
            keepAliveTimeout: 180000
          });

          var options = {
            host: hostip,
            port: port,
            path: '/goform/trigger',
            method: request_type,
            headers: {'Cookie': hashcode},
            agent: keepaliveAgent
          };

          var req = http.request(options, function(res) {
            console.log('STATUS:' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
              //console.log('BODY: ' + chunk);
              //chunk.setEncoding('utf8');
              if(chunk.indexOf(xmlStart_String) > -1) {
                callback(chunk);
                /*console.log('json result');
                xmlParser(chunk, function(err, result) {
                  console.log(JSON.stringify(result));
                  console.log('Done');
                  callback(JSON.stringify(result));
                });*/
              }
            });
          });

          req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
          });

          req.end();

          setTimeout(function() {
            console.log('keep alive sockets:');
            //console.log(keepaliveAgent.unusedSockets);
          }, 2000);

        }
}
