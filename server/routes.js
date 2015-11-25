'use strict';

var config = require('./config/environment');
var bodyParser = require('body-parser');

module.exports = function (app) {

  // API
  app.use('/api/reg', require('./api/reg'));
  app.use('/api/main-dashboards', require('./api/main-dashboard'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api/users', require('./api/user'));

  // Auth
  app.use('/auth', require('./auth'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.route('/*')
    .get(function (req, res) {
      console.log('redirect to home');

      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
    });


};
