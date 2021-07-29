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
    breed: 'dog',
    quantity:'12',
    price:'1200',
    description: 'A cute dog'
  }


test('should return same data', async () => {
  breedService.create.mockReturnValue(testData)
  let response = await request(app).post('/breed/create').send(testData)
  expect(response.body).toStrictEqual(testData)
})
