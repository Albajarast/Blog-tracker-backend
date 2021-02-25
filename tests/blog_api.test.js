const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/Blog')
const { initialBlogs, blogsInDb } = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('api returns a list of blogs', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get property id instead of _id', async () => {
  const blogs = await blogsInDb()

  if (blogs.length > 0) {
    expect(blogs[0].id).toBeDefined()
  } else {
    throw new Error('There are no blogs in the DB')
  }
})

afterAll(() => {
  mongoose.connection.close()
})
