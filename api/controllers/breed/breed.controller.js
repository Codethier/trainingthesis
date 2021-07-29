const breedService = require('./breed.service')

async function create(req, res, next) {
  const {
    breed,
    quantity,
    price,
    description
  } = req.body
  await breedService.create({breed, quantity, price, description})
  res.json(req.body)
}

async function findOne(req, res, next) {
  const {_id} = req.params
  res.json(await breedService.findOne(_id))
}

async function findAll(req, res, next) {
  res.json(await breedService.findAll())
}

async function deleteById(req, res, next) {
  const {_id} = req.params
  res.json(await breedService.deleteById(_id))
}

module.exports = {
  create: create,
  findOne: findOne,
  findAll: findAll,
  deleteById: deleteById
}
