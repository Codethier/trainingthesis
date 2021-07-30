const orderService = require('./order.service')

async function create(req, res, next) {

  res.json(await orderService.create(req.body))
}

async function findOne(req, res, next) {
  const {_id} = req.params
  res.json(await orderService.findOne(_id))
}

async function findAll(req, res, next) {
  let q = await orderService.findAll()
  res.json(q)
}

async function deleteById(req, res, next) {
  const {_id} = req.params
  res.json(await orderService.deleteById(_id))
}

module.exports = {
  create: create,
  findOne: findOne,
  findAll: findAll,
  deleteById: deleteById
}
