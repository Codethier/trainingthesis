const mongoose = require("mongoose");
const config = require("./CONFIG.json");
const crypto = require("crypto");
const userService = require("./routers/user/user.service");
const authService = require("./routers/auth/auth.service");
app = require('./app');


(async () => {
  await mongoose.connect(config.db_url.toString() + config.db_name.toString(), {useNewUrlParser: true, useUnifiedTopology: true})
  console.log("connected")
  let hashedPassword = crypto.createHash('sha512').update(config.default_password).digest('base64')
  let q = await authService.find({user: config.default_user, password: hashedPassword})
  if (q.length === 0) {
    console.log('creatign default user')
    let data = {
      user: config.default_user,
      password: hashedPassword,
      role: "admin",
      email: "akarmi@nethely.hu"
    }
    await userService.create(data)

    console.log(`default user has ben created ${data}`)
  }


})().catch(e => console.log(e))


app.app.listen(config.port, () => console.log('http://localhost:' + config.port))
