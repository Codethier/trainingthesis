const request = require('supertest')
const itemService = require('./item.service')
const router = require('./item.router')
const express = require("express");
const bodyParser = require("body-parser");
jest.mock('./item.service')

let app = express()
app.use(bodyParser.json())
app.use('/item', router.router)

let testData = {
  "id": "asdasdasdasdasd",
  "itemName": "dogfood",
  "amount": 12,
  "price": 1200,
  "description": "A cute dog's bone"
}
describe('/item', () => {
  test('post./item/create', async () => {
    itemService.create = () => ({})
    let response = await request(app).post('/item/create').send(testData)
    expect(response.body).toStrictEqual(testData);
  })

  test('get./item/:id', async () => {
  await itemService.findOne.mockReturnValue(testData.id)
  let response = await request(app).get(`/item/${testData.id}`)
  expect(response.body).toStrictEqual(testData.id)
})
    test('get./item/all', async () => {
  await itemService.findAll.mockReturnValue(testData)
  let response = await request(app).get(`/item/all`)
  expect(response.body).toStrictEqual(testData)
})
    test('delete./item/:id', async () => {
  await itemService.deleteById.mockReturnValue(testData.id)
  let response = await request(app).delete(`/item/${testData.id}`)
  expect(response.body).toStrictEqual(testData.id)
})
})

