'use strict';

require('should');

var server = require('../../server');
var request = require('supertest');

describe('GET /api/main-dashboards', function () {

  it('should respond with JSON array', function (done) {
    request(server)
      .get('/api/main-dashboards')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) { return done(err); }
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});
