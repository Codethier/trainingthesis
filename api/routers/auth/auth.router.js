const express = require('express')
const controller = require('./auth.controller')
const router = express.Router()

router.post('/token', (req, res, next) => {
  return controller.token(req, res, next).catch(e => {
    console.log(e);
    next()
  })
})


module.exports = {
  router: router
}
