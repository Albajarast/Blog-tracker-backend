const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_USER, mongodbUrl } = require('./utils/config')
const blogRoutes = require('./controllers/blogs')

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`Connected to MongoDB Atlas as ${MONGODB_USER}`)
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
