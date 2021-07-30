const userService = require('./user.service')
let crypto = require('crypto')
const CONFIG = require('../../../CONFIG.json')
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

async function create(req, res, next) {
  let {
    user,
    password,
    role,
    email
  } = req.body
  password = crypto.createHash('sha512').update(password).digest('base64')
  await userService.create({user: user, password: password, role: role, email: email})
  res.json(req.body)
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

async function token(req, res, next) {
  let {
    user,
    password
  } = req.body
  password = crypto.createHash('sha512').update(password).digest('base64')
  let q = await userService.find({user: user, password: password})
  if (q.length !== 0){
    let token = await jwt.sign({id: q[0].id}, CONFIG.secret)
    res.json(token)
  } else
  {
    return next(new createError(403, 'Unauthorized'), {expose: false})
  }
}

module.exports = {
  create: create,
  findOne: findOne,
  findAll: findAll,
  deleteById: deleteById,
  token: token

}
