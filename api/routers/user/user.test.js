const request = require('supertest')
const userService = require('./user.service')
const router = require('./user.router')
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("../../../CONFIG.json");
const createError = require("http-errors");
jest.mock('./user.service')

let app = express()
app.use(bodyParser.json())
app.use('/user', router.router)

let testData = {
  id: 'feoiu8saovnwivewds',
  user: 'dog',
  role: 'admin',
  password: 'goodBoy2015',
  email: 'dog@wauf.bark'
}
describe('/user', () => {
  test('post./user/create', async () => {
    userService.create.mockReturnValue(testData)
    let response = await request(app).post('/user/create').send(testData)
    expect(response.body).toStrictEqual(testData);
  })

  test('get./user/:id', async () => {
    await userService.findOne.mockReturnValue(testData.id)
    let response = await request(app).get(`/user/${testData.id}`)
    expect(response.body).toStrictEqual(testData.id)
  })
  test('get./user/all', async () => {
    await userService.findAll.mockReturnValue(testData)
    let response = await request(app).get(`/user/all`)
    expect(response.body).toStrictEqual(testData)
  })
  test('delete./user/:id', async () => {
    await userService.deleteById.mockReturnValue(testData.id)
    let response = await request(app).delete(`/user/${testData.id}`)
    expect(response.body).toStrictEqual(testData.id)
  })
  test('post./user/token', async () => {
    await userService.find.mockReturnValue([testData])
    let response = await request(app).post(`/user/token`).send(testData)
    jwt.verify(response.body, config.secret, (err, data) => {
      expect(data.id).toStrictEqual(testData.id)
    })
  })
})

