const schemas = require('../../schemas')

module.exports = {
  create: async (data) => {
    const breed = new schemas.BreedSchema(data)
    await breed.save()
    return breed
  },
  findOne: async (q) => {
    return await schemas.BreedSchema.findById(q).exec()
  },
  findAll: async () => {
    return await schemas.BreedSchema.find().exec()
  },
  deleteById: async (q) => {
    return await schemas.BreedSchema.findByIdAndDelete(q).exec()
  }
}
