const itemService = require('./item.service')

async function create(req, res, next) {
  res.json(await itemService.create(req.body))
}

async function findOne(req, res, next) {
  const {_id} = req.params
  res.json(await itemService.findOne(_id))
}

async function findAll(req, res, next) {
  let q = await itemService.findAll()
  res.json(q)
}

async function deleteById(req, res, next) {
  const {_id} = req.params
  res.json(await itemService.deleteById(_id))
}

module.exports = {
  create: create,
  findOne: findOne,
  findAll: findAll,
  deleteById: deleteById
}
