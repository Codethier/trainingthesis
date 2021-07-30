const schemas = require('../../schemas')

module.exports = {
  create: async (data) => {
    const user = new schemas.UserSchema(data)
    await user.save()
    return user
  },
  findOne: async (q) => {
    return await schemas.UserSchema.findById(q).exec()
  },
  findAll: async () => {
    return await schemas.UserSchema.find().exec()
  },
  deleteById: async (q) => {
    return await schemas.UserSchema.findByIdAndDelete(q).exec()
  },
  find: async (q) => {
    return await  schemas.UserSchema.find(q).exec()
}
}
