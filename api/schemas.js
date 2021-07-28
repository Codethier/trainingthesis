const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator');

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  role: String
})
const BreedSchema = new mongoose.Schema({
  breed: String,
  quantity: Number,
  price: Number,
  description: String
})
const ItemsSchema = new mongoose.Schema({
  itemName: String,
  amount: Number,
  price: Number,
  description: String
})

const ShopSchema = new mongoose.Schema({
  name: String,
  address: String
})
const OrderSchema = new mongoose.Schema({
  user_id:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  items: {
    type: [String],
    default: undefined
  },
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  }

}, {timestamps: true})

OrderSchema.plugin(idValidator)
module.exports = {
  VaccineSchema: mongoose.model('User', UserSchema),
  BreedSchema: mongoose.model('Breed', BreedSchema),
  ItemsSchema: mongoose.model('Item', ItemsSchema),
  ShopSchema: mongoose.model('Shop', ShopSchema),
  OrderSchema: mongoose.model('Order', OrderSchema)
}
