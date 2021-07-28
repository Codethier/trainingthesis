const express = require('express')
const controller = require('./breed.controller')
const router = express.Router()
router.post('/create', (req, res, next) => {
  return controller.create(req, res, next)
})

module.exports = {
  router: router
}
