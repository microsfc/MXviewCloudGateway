'use strict';

var _ = require('lodash');
var Reg = require('./reg.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Reg
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Reg.find(function (err, regs) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(regs);
  });
};

/**
 * Get a single Reg
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Reg.findById(req.params.id, function (err, reg) {
    if (err) { return handleError(res, err); }
    if (!reg) { return res.status(404).end(); }
    return res.status(200).json(reg);
  });
};

/**
 * Creates a new Reg in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Reg.create(req.body, function (err, reg) {
    if (err) { return handleError(res, err); }
    return res.status(201).json({regKey:reg._id});
  });
};

/**
 * Updates an existing Reg in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Reg.findById(req.params.id, function (err, reg) {
    if (err) { return handleError(res, err); }
    if (!reg) { return res.status(404).end(); }
    var updated = _.merge(reg, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(reg);
    });
  });
};

/**
 * Deletes a Reg from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Reg.findById(req.params.id, function (err, reg) {
    if (err) { return handleError(res, err); }
    if (!reg) { return res.status(404).end(); }
    reg.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
