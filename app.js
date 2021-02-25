const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const {
  MONGODB_USER,
  mongodbUrl,
  MONGODB_URL,
  TEST_MONGODB_URL
} = require('./utils/config')
const blogRoutes = require('./controllers/blogs')

let connectedDb =
  process.env.NODE_ENV === 'test' ? TEST_MONGODB_URL : MONGODB_URL

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log(
      `Connected to MongoDB Atlas as ${MONGODB_USER} @ ${connectedDb}`
    )
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to Blog tracker!')
})

app.use('/api/blogs', blogRoutes)

module.exports = app
