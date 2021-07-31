const request = require('supertest')
const {app} = require('./app')
const mongoose = require("mongoose");
const config = require("../CONFIG.json");
const schema = require('./schemas')
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

jest.setTimeout(10000)
describe('integration tests', () => {
  beforeAll(async () => {
    await mongoose.connect(config.db_url.toString() + 'jest', {useNewUrlParser: true, useUnifiedTopology: true}).catch(e => console.log(e))
    let testuser = {
      "user": "testuser",
      "password": "12",
      "role": "admin",
      "email": "bsadsa@dasdsa"
    }
    testuser.password = crypto.createHash('sha512').update(testuser.password).digest('base64')
    const user = new schema.UserSchema(testuser)
    await user.save()
  })
  afterAll(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close().catch()
  })

  async function getTestToken() {
    let testToken = await request(app).post('/auth/token').send({
      "user": "testuser",
      "password": "12"
    })
    return testToken.body
  }

  let idMem = {
    shop_id: "",
    user_id: ""
  }

  describe('/breed', () => {
    let testData = {
      id: 'feoiu8saovnwivewds',
      breed: 'dog',
      quantity: '12',
      price: '1200',
      description: 'A cute dog'
    }
    test('post./breed/create', async () => {
      let token = await getTestToken()
      let response = await request(app).post('/breed/create').send(testData).set('Authorization', `Bearer ${token}`)
      testData.id = response.body._id
      expect(response.status).toStrictEqual(200);
    })

    test('get./breed/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/breed/${testData.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('get./breed/all', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/breed/all`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('delete./breed/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).delete(`/breed/${testData.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
  })

  describe('/auth', () => {
    test('post./auth/token', async () => {
      let response = await request(app).post(`/auth/token`).send({
        "user": "testuser",
        "password": "12"
      })
      jwt.verify(response.body, config.secret, (err, data) => {
        expect(response.status).toStrictEqual(200)
      })
    })
  })
  describe('/item', () => {
    let testData = {
      "id": "asdasdasdasdasd",
      "itemName": "dogfood",
      "amount": 12,
      "price": 1200,
      "description": "A cute dog's bone"
    }
    test('post./item/create', async () => {
      let token = await getTestToken()
      let response = await request(app).post('/item/create').send(testData).set('Authorization', `Bearer ${token}`)
      testData.id = response.body._id
      expect(response.status).toStrictEqual(200)
    })

    test('get./item/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/item/${testData.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('get./item/all', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/item/all`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('delete./item/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).delete(`/item/${testData.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
  })
  describe('/shop', () => {
    let testData = {
      "id": "asdsadsa",
      "name": "arena plaza",
      "address": "somdewhere"
    }
    test('post./shop/create', async () => {
      let token = await getTestToken()
      let response = await request(app).post('/shop/create').send(testData).set('Authorization', `Bearer ${token}`)
      testData.id = response.body._id
      idMem.shop_id = testData.id
      expect(response.status).toStrictEqual(200)
    })

    test('get./shop/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/shop/${testData.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('get./shop/all', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/shop/all`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('delete./shop/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).delete(`/shop/${testData.id}`).set('Authorization', `Bearer ${token}`)
      //for orders
      let newSave = await request(app).post('/shop/create').send(testData).set('Authorization', `Bearer ${token}`)
      idMem.shop_id = newSave.body._id
      expect(response.status).toStrictEqual(200)
    })
  })
  describe('/user', () => {
    let testData = {
      id: 'feoiu8saovnwivewds',
      user: 'dog',
      role: 'admin',
      password: 'goodBoy2015',
      email: 'dog@wauf.bark'
    }
    test('post./user/create', async () => {
      let token = await getTestToken()
      let response = await request(app).post('/user/create').send(testData).set('Authorization', `Bearer ${token}`)
      testData.id = response.body._id
      idMem.user_id = testData.id
      expect(response.status).toStrictEqual(200)
    })

    test('get./user/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/user/${testData.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('get./user/all', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/user/all`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('delete./user/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).delete(`/user/${testData.id}`).set('Authorization', `Bearer ${token}`)
      //for orders
      let newSave = await request(app).post('/user/create').send(testData).set('Authorization', `Bearer ${token}`)
      idMem.user_id = newSave.body._id
      expect(response.status).toStrictEqual(200)
    })
  })
  describe('/order', () => {
    let testData = {
      "id": "asdsadsa",
      "user_id": "idMem.user_id",
      "items": ["dog", "cat", "catfood"],
      "shop_id": "idMem.shop_id"
    }
    test('post./order/create', async () => {
      testData.user_id = idMem.user_id
      testData.shop_id = idMem.shop_id
      let token = await getTestToken()
      let response = await request(app).post('/order/create').send(testData).set('Authorization', `Bearer ${token}`)
      testData.id = response.body._id
      expect(response.status).toStrictEqual(200)
    })

    test('get./order/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/order/${testData.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('get./order/all', async () => {
      let token = await getTestToken()
      let response = await request(app).get(`/order/all`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
    test('delete./order/:id', async () => {
      let token = await getTestToken()
      let response = await request(app).delete(`/order/${testData.id}`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toStrictEqual(200)
    })
  })

})

