const mongoose = require("mongoose");
const config = require("../CONFIG.json");
app = require('./app');


(async () => {
  await mongoose.connect(config.db_url.toString()+config.db_name.toString(), {useNewUrlParser: true, useUnifiedTopology: true})
})().catch(e => console.log(e))


app.app.listen(config.port, () => console.log('http://localhost:' + config.port))
