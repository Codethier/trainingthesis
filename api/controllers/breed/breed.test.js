const request = require('supertest')
const breedService = require('./breed.service')
const router = require('./breed.router')
const express = require("express");
const bodyParser = require("body-parser");
jest.mock('./breed.service')

let app = express()
app.use(bodyParser.json())
app.use('/breed', router.router)

let testData = {
  _id: 'feoiu8saovnwivewds',
  breed: 'dog',
  quantity: '12',
  price: '1200',
  description: 'A cute dog'
}
describe('/breed', () => {
  test('post./breed/create', async () => {
    breedService.create = () => ({})
    let response = await request(app).post('/breed/create').send(testData)
    expect(response.body).toStrictEqual(testData);
  })

  test('get./breed/:id', async () => {
  await breedService.findOne.mockReturnValue(testData._id)
  let response = await request(app).get(`/breed/${testData._id}`)
  expect(response.body).toStrictEqual(testData._id)
})
    test('get./breed/all', async () => {
  await breedService.findAll.mockReturnValue(testData)
  let response = await request(app).get(`/breed/all`)
  expect(response.body).toStrictEqual(testData)
})
    test('delete./breed/:id', async () => {
  await breedService.deleteById.mockReturnValue(testData._id)
  let response = await request(app).delete(`/breed/${testData._id}`)
  expect(response.body).toStrictEqual(testData._id)
})
})

