const express = require('express')
const controller = require('./breed.controller')
const router = express.Router()
router.post('/create', (req, res, next) => {
  return controller.create(req, res, next)
})
router.get('/all', (req, res, next) => {
  return controller.findAll(req, res, next)
})
router.get('/:_id', (req, res, next) => {
  return controller.findOne(req, res, next)
})
router.delete('/:_id', (req, res, next) => {
  return controller.deleteById(req, res, next)
})


module.exports = {
  router: router
}
