const userService = require('./auth.service')
let crypto = require('crypto')
const CONFIG = require('../../../CONFIG.json')
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

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
  token: token
}
