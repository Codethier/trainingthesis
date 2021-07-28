const breedService = require('./breed.service')

async function create(req, res, next) {
  const {
    breed,
    quantity,
    price,
    description
  } = req.body
  await breedService.create({breed,quantity,price,description})
}
module.exports = {
  create: create
}
