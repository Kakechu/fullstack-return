const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)
let token


describe('logged in', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const userLogin = {
      username: "root",
      password: "sekret"
    }

    const userResponse = await api
      .post('/api/login')
      .send(userLogin)

    token = userResponse.body.token

    for (const blog of helper.initialBlogs) {
      await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: `Bearer ${token}`})
    }



  })

  describe('existing blogs', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')  
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
      })
    
    test('returned blog objects do not contain _id field', async () => {
        const response = await api.get('/api/blogs')
    
        const containsId = response.body.some(blog => '_id' in blog)
        assert.strictEqual(containsId, false)
    })
  })


  describe('adding a blog', () => {
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
          .set({ Authorization: `Bearer ${token}`})
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
  })

  describe('missing values', () => {
    test('if no likes are given, the returned value is 0', async () => {
        const blogWithoutLikes = {
            title: "Title Without Likes",
            author: "Added author",
            url: "www.example.com",
        }
    
        await api
          .post('/api/blogs')
          .send(blogWithoutLikes)
          .set({ Authorization: `Bearer ${token}`})
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        const latestAdded = blogsAtEnd[blogsAtEnd.length - 1]
    
        assert.strictEqual(latestAdded.likes, 0)
    })
  
    test('fails with status code 400 if title is missing', async () => {
        const missingTitle = {
            author: "Missing Title Author",
            url: "www.example.com",
            likes: 1
        }
    
        response = await api
          .post('/api/blogs')
          .send(missingTitle)
          .set({ Authorization: `Bearer ${token}`})
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        assert.strictEqual(response.body.error, "title missing")
    })

    test('fails with status code 400 if url is missing', async () => {
        const missingUrl = {
            title: "Missing Url Title",
            author: "Missing Url Author",
            likes: 1
        }
    
        response = await api
          .post('/api/blogs')
          .send(missingUrl)
          .set({ Authorization: `Bearer ${token}`})
          .expect(400)
    
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        assert.strictEqual(response.body.error, "url missing")
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set({ Authorization: `Bearer ${token}`})
          .expect(204)
    
        blogsAtEnd = await helper.blogsInDb()

        assert.notDeepStrictEqual(blogsAtStart[0], blogsAtEnd[0])

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
})

describe('editing a blog', () => {
    test('succeeds with status code 200', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToEdit = blogsAtStart[0]
        
        const updatedBlog = { ...blogToEdit, likes: blogToEdit.likes + 1}

        await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .send(updatedBlog)
        .set({ Authorization: `Bearer ${token}`})
        .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
        assert.strictEqual(blogsAtStart[0].id, blogsAtEnd[0].id)
        assert.strictEqual(blogsAtStart[0].likes + 1, blogsAtEnd[0].likes)
        assert.notDeepStrictEqual(blogsAtStart[0], blogsAtEnd[0])
    })

  })
})

describe('not logged in', () => {
  test('adding a blog fails with status code 401 if no token is given', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: "Not added",
      author: "No added author",
      url: "www.example.com",
      likes: 1,
      
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

  })
})


after(async () => {
  await mongoose.connection.close()
})