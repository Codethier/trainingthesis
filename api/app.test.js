const request = require('supertest')
const breedService = require('./controllers/breed/breed.service')
const app = require('./app')
const mongoose = require("mongoose");
const config = require("../CONFIG.json");
jest.setTimeout(3000)
jest.mock('./controllers/breed/breed.service')
describe('integration tests', () => {
  beforeEach(() => {
    (async () => {
      await mongoose.connect(config.db_url.toString() + config.db_name.toString(), {useNewUrlParser: true, useUnifiedTopology: true})
    })().catch(e => console.log(e))
  })
  afterAll(() => {
    mongoose.connection.close().catch()
  })
  describe('/breed', () => {
    let testData = {
      breed: 'dog',
      quantity: '12',
      price: '1200',
      description: 'A cute dog'
    }


    describe('/breed/create', () => {
      test('should return same data', async () => {
        breedService.create.mockReturnValue(testData)
        let response = await request(app.app).post('/breed/create').send(testData)
        expect(response.body).toStrictEqual(testData)
      })
    })


  })
})

