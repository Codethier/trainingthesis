const schemas = require('../../schemas')

module.exports = {
  create: async (data) => {const breed = new schemas.BreedSchema(data)
    await breed.save()
  }
}
