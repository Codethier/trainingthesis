const schemas = require('../../schemas')

module.exports = {
  create: async (data) => {
    const item = new schemas.ItemsSchema(data)
    await item.save()
    return item
  },
  findOne: async (q) => {
    return await schemas.ItemsSchema.findById(q).exec()
  },
  findAll: async () => {
    return await schemas.ItemsSchema.find().exec()
  },
  deleteById: async (q) => {
    return await schemas.ItemsSchema.findByIdAndDelete(q).exec()
  }
}
