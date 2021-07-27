app = require('./app')
config = require('../CONFIG.json')


app.app.listen(config.port, () => console.log('http://localhost:' + config.port))
