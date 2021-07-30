const request = require('supertest')
const breedService = require('./routers/breed/breed.service')
const app = require('./app')
const mongoose = require("mongoose");
const config = require("../CONFIG.json");
jest.setTimeout(3000)
jest.mock('./routers/breed/breed.service')
describe('integration tests', () => {
  beforeEach(() => {
    (async () => {
      await mongoose.connect(config.db_url.toString() + 'jest', {useNewUrlParser: true, useUnifiedTopology: true})
    })().catch(e => console.log(e))
  })

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close().catch()
  })

  describe('/breed', () => {

    let testData = {
      id: 'feoiu8saovnwivewds',
      breed: 'dog',
      quantity: '12',
      price: '1200',
      description: 'A cute dog'
    }
    test('post./breed/create', async () => {
      let response = await request(app).post('/breed/create').send(testData)
      expect(response.body).toStrictEqual(testData);
    })

    test('get./breed/:id', async () => {
      let response = await request(app).get(`/breed/${testData.id}`)
      expect(response.body).toStrictEqual(testData.id)
    })
    test('get./breed/all', async () => {
      await breedService.findAll.mockReturnValue(testData)
      let response = await request(app).get(`/breed/all`)
      expect(response.body).toStrictEqual(testData)
    })
    test('delete./breed/:id', async () => {
      await breedService.deleteById.mockReturnValue(testData.id)
      let response = await request(app).delete(`/breed/${testData.id}`)
      expect(response.body).toStrictEqual(testData.id)
    })
  })


})

