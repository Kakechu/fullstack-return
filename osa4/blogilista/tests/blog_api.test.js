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

after(async () => {
  await mongoose.connection.close()
})