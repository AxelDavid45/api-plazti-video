const app = require('./app')
const configs = require('./config/index')
// Server port
app.listen(configs.port, () => {
  console.log(`Listening http://localhost:${configs.port}`)
})
