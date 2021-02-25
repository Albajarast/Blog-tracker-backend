const router = require('express').Router()
const Blog = require('../models/Blog')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const { author, title, url, likes } = request.body

  const blog = new Blog({
    author: author,
    title: title,
    url: url,
    likes: likes
  })

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = router
