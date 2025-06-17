const DataLoader = require('dataloader')
const Book = require('../models/book')

const bookCountLoader = new DataLoader(async (authorIds) => {
  const counts = await Book.aggregate([
    {
      $match: {
        author: { $in: authorIds },
      },
    },
    {
      $group: {
        _id: '$author',
        bookCount: { $sum: 1 },
      },
    },
  ])

  var countsByAuthor = counts.reduce((acc, curr) => {
    acc[curr._id] = curr.bookCount
    return acc
  }, {})

  return authorIds.map((id) => countsByAuthor[id] || 0)
})

module.exports = bookCountLoader
