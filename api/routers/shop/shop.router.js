const express = require('express')
const controller = require('./shop.controller')
const router = express.Router()


router.post('/create', (req, res, next) => {
  return controller.create(req, res, next).catch(e => {
    console.log(e);
    next()
  })
})
router.get('/all', (req, res, next) => {
  return controller.findAll(req, res, next).catch(e => {
    console.log(e);
    next()
  })
})
router.get('/:_id', (req, res, next) => {
  return controller.findOne(req, res, next).catch(e => {
    console.log(e);
    next()
  })
})
router.delete('/:_id', (req, res, next) => {
  return controller.deleteById(req, res, next).catch(e => {
    console.log(e);
    next()
  })
})


module.exports = {
  router: router
}
