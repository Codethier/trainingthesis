const request = require('supertest')
const userService = require('./auth.service')
const router = require('./auth.router')
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("../../../CONFIG.json");
const createError = require("http-errors");
jest.mock('./auth.service')

let app = express()
app.use(bodyParser.json())
app.use('/auth', router.router)

let testData = {
  id: 'feoiu8saovnwivewds',
  user: 'dog',
  role: 'admin',
  password: 'goodBoy2015',
  email: 'dog@wauf.bark'
}
describe('/auth', () => {
  test('post./auth/token', async () => {
    await userService.find.mockReturnValue([testData])
    let response = await request(app).post(`/auth/token`).send(testData)
    jwt.verify(response.body, config.secret, (err, data) => {
      expect(data.id).toStrictEqual(testData.id)
    })
  })
})

