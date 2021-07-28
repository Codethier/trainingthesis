const createError = require('http-errors')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/openapi.yaml')
const bodyParser = require('body-parser')
const fs = require('fs/promises')
const mongoose = require("mongoose")
const schema = require('./schemas')
const config = require('../CONFIG.json')
const breed = require('./controllers/breed/breed.router')

let express = require('express');
let app = express()

app.use(bodyParser.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/breed', breed.router);

(async () => {
  await mongoose.connect(config.db_url.toString(), {useNewUrlParser: true, useUnifiedTopology: true})
})().catch(e => console.log(e))

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
  res.status(500)
  res.end()
})

module.exports = {
  app: app
}
