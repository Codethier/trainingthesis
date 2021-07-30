const request = require('supertest')
const orderService = require('./order.service')
const router = require('./order.router')
const express = require("express");
const bodyParser = require("body-parser");
jest.mock('./order.service')

let app = express()
app.use(bodyParser.json())
app.use('/order', router.router)

let testData = {
  "id": "asdsadsa",
  "user_id": "61036abb79c7e05a208f517e",
  "items": ["dog","cat","catfood"],
  "shop_id": "6103858fd858b41ad47614f7"
}
describe('/order', () => {
  test('post./order/create', async () => {
    orderService.create = () => ({})
    let response = await request(app).post('/order/create').send(testData)
    expect(response.body).toStrictEqual(testData);
  })

  test('get./order/:id', async () => {
  await orderService.findOne.mockReturnValue(testData.id)
  let response = await request(app).get(`/order/${testData.id}`)
  expect(response.body).toStrictEqual(testData.id)
})
    test('get./order/all', async () => {
  await orderService.findAll.mockReturnValue(testData)
  let response = await request(app).get(`/order/all`)
  expect(response.body).toStrictEqual(testData)
})
    test('delete./order/:id', async () => {
  await orderService.deleteById.mockReturnValue(testData.id)
  let response = await request(app).delete(`/order/${testData.id}`)
  expect(response.body).toStrictEqual(testData.id)
})
})

