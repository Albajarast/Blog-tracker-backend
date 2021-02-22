const mongoose = require('mongoose')
require('dotenv').config()

const blogSchema = mongoose.Schema({
  author: String,
  title: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
