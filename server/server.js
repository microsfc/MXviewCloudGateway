'use strict';

var express = require('express');
var chalk = require('chalk');
var config = require('./config/environment');
var mongoose = require('mongoose');

mongoose.connect(config.mongo.uri, config.mongo.options);

var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io')(server, { serveClient: true });
require('./config/sockets.js')(socket);

require('./config/express')(app);
require('./routes')(app,config.mxview_server_ip);


/*var restify = require('restify')
  , fs = require('fs');

var controllers = {}
  , controllers_path = process.cwd() + '/app/controllers'
fs.readdirSync(controllers_path).forEach(function (file) {
  if (file.indexOf('.js') != -1) {
    controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
  }
})

var server = restify.createServer();

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

// Article Start
server.post("/articles", controllers.article.createArticle)
server.put("/articles/:id", controllers.article.updateArticle)
server.del("/articles/:id", controllers.article.deleteArticle)
server.get({path: "/articles/:id", version: "1.0.0"}, controllers.article.viewArticle)
server.get({path: "/articles/:id", version: "2.0.0"}, controllers.article.viewArticle_v2)
// Article End

// Comment Start
server.post("/comments", controllers.comment.createComment)
server.put("/comments/:id", controllers.comment.viewComment)
server.del("/comments/:id", controllers.comment.deleteComment)
server.get("/comments/:id", controllers.comment.viewComment)
// Comment End

var port = process.env.PORT || 3000;
server.listen(port, function (err) {
  if (err)
    console.error(err)
  else
    console.log('App is ready at : ' + port)

  require('./main')(app);
})

if (process.env.environment == 'production')
  process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
  })*/

server.listen(config.port, config.ip, function () {

  console.log(
    chalk.red('\nExpress server listening on port ')
    + chalk.yellow('%d')
    + chalk.red(', in ')
    + chalk.yellow('%s')
    + chalk.red(' mode.\n'),
    config.port,
    app.get('env')
  );

  if (config.env === 'development') {
    require('ripe').ready();
  }

  require('./main')(app,config.mxview_server_ip, socket);

});

module.exports = server;
