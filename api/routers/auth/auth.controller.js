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
  //oauth2 spec hack
  // {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTYyODkxMDkxMX0.ccFlHrzkfBdNTyBFf-EDOb3Tp28HTTWLg_MGEpDj9AQ","token_type":"bearer"}
  let q
  if (req.body.username) {
    q = await userService.find({user: req.body.username, password: password})

  } else {
    q = await userService.find({user: user, password: password})
  }
  if (q.length !== 0) {
    let token = await jwt.sign({id: q[0].id}, CONFIG.secret)
    if (req.body.username) {
      res.json({access_token: token,token_type:"bearer"})
    } else {
      res.json(token)
    }
  } else {
    return next(new createError(403, 'Unauthorized'), {expose: false})
  }
}

module.exports = {
  token: token
}
