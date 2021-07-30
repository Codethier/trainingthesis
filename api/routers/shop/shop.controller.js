const shopService = require('./shop.service')

async function create(req, res, next) {
  await shopService.create(req.body)
  res.json(req.body)
}

async function findOne(req, res, next) {
  const {_id} = req.params
  res.json(await shopService.findOne(_id))
}

async function findAll(req, res, next) {
  let q = await shopService.findAll()
  res.json(q)
}

async function deleteById(req, res, next) {
  const {_id} = req.params
  res.json(await shopService.deleteById(_id))
}

module.exports = {
  create: create,
  findOne: findOne,
  findAll: findAll,
  deleteById: deleteById
}
