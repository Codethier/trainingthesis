const schemas = require('../../schemas')

module.exports = {
  create: async (data) => {
    const shop = new schemas.ShopSchema(data)
    await shop.save()
    return shop
  },
  findOne: async (q) => {
    return await schemas.ShopSchema.findById(q).exec()
  },
  findAll: async () => {
    return await schemas.ShopSchema.find().exec()
  },
  deleteById: async (q) => {
    return await schemas.ShopSchema.findByIdAndDelete(q).exec()
  }
}
