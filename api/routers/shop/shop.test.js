const request = require('supertest')
const shopService = require('./shop.service')
const router = require('./shop.router')
const express = require("express");
const bodyParser = require("body-parser");
jest.mock('./shop.service')

let app = express()
app.use(bodyParser.json())
app.use('/shop', router.router)

let testData = {
  "id": "asdsadsa",
  "name": "arena plaza",
  "address": "somewhere"
}
describe('/shop', () => {
  test('post./shop/create', async () => {
    shopService.create.mockReturnValue(testData)
    let response = await request(app).post('/shop/create').send(testData)
    expect(response.body).toStrictEqual(testData);
  })

  test('get./shop/:id', async () => {
  await shopService.findOne.mockReturnValue(testData.id)
  let response = await request(app).get(`/shop/${testData.id}`)
  expect(response.body).toStrictEqual(testData.id)
})
    test('get./shop/all', async () => {
  await shopService.findAll.mockReturnValue(testData)
  let response = await request(app).get(`/shop/all`)
  expect(response.body).toStrictEqual(testData)
})
    test('delete./shop/:id', async () => {
  await shopService.deleteById.mockReturnValue(testData.id)
  let response = await request(app).delete(`/shop/${testData.id}`)
  expect(response.body).toStrictEqual(testData.id)
})
})

