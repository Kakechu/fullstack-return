const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

test('returned blog objects do not contain _id field', async () => {
    const response = await api.get('/api/blogs')

    const containsId = response.body.some(blog => '_id' in blog)
    assert.strictEqual(containsId, false)
})

test('a valid blog can be added', async () => {
    const newBlog = {
      title: "Added title",
      author: "Added author",
      url: "www.example.com",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const latestAdded = blogsAtEnd[blogsAtEnd.length - 1]

    assert.strictEqual(newBlog.title, latestAdded.title)
    assert.strictEqual(newBlog.author, latestAdded.author)
    assert.strictEqual(newBlog.url, latestAdded.url)
    assert.strictEqual(newBlog.likes, latestAdded.likes)
})

after(async () => {
  await mongoose.connection.close()
})