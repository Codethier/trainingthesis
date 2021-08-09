const createError = require('http-errors')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const bodyParser = require('body-parser')
const fs = require('fs')
const mongoose = require("mongoose")
const schema = require('./schemas')
const config = require('./CONFIG.json')
const breed = require('./routers/breed/breed.router')
const user = require('./routers/user/user.router')
const jwt = require('jsonwebtoken')
let express = require('express');
const schemas = require("./schemas");
const item = require("./routers/item/item.router");
const shop = require("./routers/shop/shop.router");
const order = require("./routers/order/order.router");
const auth = require("./routers/auth/auth.router");
const cors = require('cors')
let app = express()
//handle test path
let swaggerDocument
if (fs.existsSync('./api')) {
  swaggerDocument = YAML.load('./api/docs/openapi.yaml')
} else {
  swaggerDocument = YAML.load('./docs/openapi.yaml')
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors())


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
app.use('/auth', auth.router)
app.get('/', (req, reds, next) => {
  res.send('index asda sd ')
})
app.use(checkAdmin)
//admin routes
app.use('/user', user.router)
app.use('/shop', shop.router)
app.use('/order', order.router)
app.use('/item', item.router)
app.use('/breed', breed.router)


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
