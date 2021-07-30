const userService = require('./user.service')
let crypto = require('crypto')
const CONFIG = require('../../../CONFIG.json')
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

async function create(req, res, next) {
  req.body.password = crypto.createHash('sha512').update(req.body.password).digest('base64')
  res.json(await userService.create(req.body))
}

async function findOne(req, res, next) {
  const {_id} = req.params
  res.json(await userService.findOne(_id))
}

async function findAll(req, res, next) {
  res.json(await userService.findAll())
}

async function deleteById(req, res, next) {
  const {_id} = req.params
  res.json(await userService.deleteById(_id))
}



module.exports = {
  create: create,
  findOne: findOne,
  findAll: findAll,
  deleteById: deleteById,
}
