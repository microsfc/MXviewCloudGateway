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
        }
}
