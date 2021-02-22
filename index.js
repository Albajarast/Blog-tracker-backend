const { PORT } = require('./utils/config')
const http = require('http')
const app = require('./app')

http.createServer(app).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
