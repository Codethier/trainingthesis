const createError = require('http-errors')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const bodyParser = require('body-parser')
const fs = require('fs')
const mongoose = require("mongoose")
const schema = require('./schemas')
const config = require('../CONFIG.json')
const breed = require('./routers/breed/breed.router')
const user = require('./routers/user/user.router')
const jwt = require('jsonwebtoken')
let express = require('express');
const schemas = require("./schemas");
const item = require("./routers/item/item.router");
const shop = require("./routers/shop/shop.router");
const order = require("./routers/order/order.router");
let app = express()
//handle test path
let swaggerDocument
if (fs.existsSync('./api')) {
  swaggerDocument = YAML.load('./api/docs/openapi.yaml')
} else {
  swaggerDocument = YAML.load('./docs/openapi.yaml')
}

app.use(bodyParser.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/user', user.router)

async function checkToken(req, res) {
  const header = req.headers.authorization

  if (header) {
    const token = header.split(' ')[1]
    jwt.verify(token, config.secret, (err, data) => {
      if (err) {
        return next(new createError(403, 'Unauthorized'), {expose: false})
      }
      req.user = data.id
    })
  } else {
    res.sendStatus(401)
  }
}

async function checkAdmin(req, res, next) {
  await checkToken(req, res)
  let q = await schemas.UserSchema.findById(req.user).exec()
  let role = q.role
  if (role === "admin") {
    next()
  } else {
    return next(new createError(403, 'Unauthorized'), {expose: false})
  }
}

// non admin routes

app.get('/', (req, res, next) => {
  res.json('index')
})
app.use(checkAdmin)
//admin routes
app.use('/shop', shop.router)
app.use('/order', order.router)
app.use('/item',item.router)
app.use('/breed', breed.router)
app.get('/person/:id/vaccinated', (req, res, next) => {
  let id = db.findIndex(i => {
    return i.id === parseInt(req.params.id)
  })
  if (id === -1) {
    return next(new createError(404, 'no such id'), {expose: false})
  }
  res.send(true)
})
app.post('/person', async (req, res) => {
  let person = req.body
  let Person = schema.PersonSchema({
    first_name: person.first_name,
    last_name: person.last_name,
    count: person.count,
    vaccine: person.vaccine
  })
  await Person.save()
  res.send(person)
})
app.post('/vaccine', async (req, res) => {
  let vaccine = req.body
  let Vaccine = schema.VaccineSchema({
    name: vaccine.vaccine,
    efficiency: vaccine.efficiency
  })
  await Vaccine.save().catch(e => console.log(e))
  res.send(vaccine)
})
app.put('/person/:id/:vaccine', async (req, res) => {
  let id = db.findIndex(i => {
    return i.id === parseInt(req.params.id)
  })
  db[id].vaccine = req.params.vaccine
  await fs.writeFile('./MOCK_DATA.json', JSON.stringify(db))
  res.json(db[id])
})
app.delete('/person/:vaccine', async (req, res) => {
  let swap = req.params.vaccine
  for (let i = 0; i < db.length; i++) {
    console.log(db[i].id)
    if (db[i].vaccine === swap) {
      db.splice(i, 1)
      i -= 1
    }
  }
  await fs.writeFile('./MOCK_DATA.json', JSON.stringify(db))
  res.json(db)
})

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    return next()
  }
  res.status(err.statusCode)
  res.json(err.message)
})
app.use((req, res) => {
  res.status(444)
  res.end()
})

module.exports = {
  app: app
}
