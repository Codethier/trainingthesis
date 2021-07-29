const request = require('supertest')
const breedService = require('./controllers/breed/breed.service')
const app = require('./app')
const mongoose = require("mongoose");
jest.setTimeout(3000)
jest.mock('./controllers/breed/breed.service')

let testData = {
    breed: 'dog',
    quantity:'12',
    price:'1200',
    description: 'A cute dog'
  }

afterAll( () => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close().catch()
})

test('test', async ()=> {
  breedService.create.mockReturnValue(testData)
  expect(breedService.create(testData)).toBe(testData)
})
test('should return same data', async () => {
  breedService.create.mockReturnValue(testData)
  let response = await request(app.app).post('/breed/create').send({asd: 2})
  expect(response.body).toStrictEqual(testData)
})
