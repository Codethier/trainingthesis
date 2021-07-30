const schemas = require('../../schemas')

module.exports = {
  create: async (data) => {
    const order = new schemas.OrderSchema(data)
    await order.save()
    return data
  },
  findOne: async (q) => {
    return await schemas.OrderSchema.findById(q).exec()
  },
  findAll: async () => {
    return await schemas.OrderSchema.find().exec()
  },
  deleteById: async (q) => {
    return await schemas.OrderSchema.findByIdAndDelete(q).exec()
  }
}
