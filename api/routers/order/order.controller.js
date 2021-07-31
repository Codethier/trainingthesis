const orderService = require('./order.service')

async function create(req, res, next) {
  let order = await orderService.create(req.body)
  res.json(order)
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
