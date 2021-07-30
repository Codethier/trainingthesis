const schemas = require('../../schemas')

module.exports = {
  find: async (q) => {
    return await  schemas.UserSchema.find(q).exec()
}
}
