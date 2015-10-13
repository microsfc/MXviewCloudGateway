'use strict';

var _ = require('lodash');
var MainDashboard = require('./main-dashboard.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of MainDashboard
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  MainDashboard.find(function (err, mainDashboards) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(mainDashboards);
  });
};

/**
 * Get a single MainDashboard
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  MainDashboard.findById(req.params.id, function (err, mainDashboard) {
    if (err) { return handleError(res, err); }
    if (!mainDashboard) { return res.status(404).end(); }
    return res.status(200).json(mainDashboard);
  });
};

/**
 * Creates a new MainDashboard in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  MainDashboard.create(req.body, function (err, mainDashboard) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(mainDashboard);
  });
};

/**
 * Updates an existing MainDashboard in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  MainDashboard.findById(req.params.id, function (err, mainDashboard) {
    if (err) { return handleError(res, err); }
    if (!mainDashboard) { return res.status(404).end(); }
    var updated = _.merge(mainDashboard, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(mainDashboard);
    });
  });
};

/**
 * Deletes a MainDashboard from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  MainDashboard.findById(req.params.id, function (err, mainDashboard) {
    if (err) { return handleError(res, err); }
    if (!mainDashboard) { return res.status(404).end(); }
    mainDashboard.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
