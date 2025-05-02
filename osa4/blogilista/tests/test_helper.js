const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Blog Title One",
        author: "Blog Author One",
        url: "www.example.com",
        likes: "12"
    },
    {
        title: "Blog Title Two",
        author: "Blog Author Two",
        url: "www.example.com",
        likes: "1"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
  }