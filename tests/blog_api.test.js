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

test('new valid blog is added to the DB', async () => {
  const newBlog = {
    author: 'David López Albajara',
    title: 'Testing the DB with POST request to /api/blogs',
    url: 'http://thisisatesturl.com',
    likes: 100
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const blogTitles = blogsAtEnd.map((blog) => blog.title)
  expect(blogTitles).toContain('Testing the DB with POST request to /api/blogs')
})

afterAll(() => {
  mongoose.connection.close()
})
