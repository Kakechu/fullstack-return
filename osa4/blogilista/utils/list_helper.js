const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    
    return blogs.reduce(reducer, 0)
  }

const favoriteBlog = (blogs) => {
    const reducer = (prev, current) => {
        return prev.likes > current.likes ? prev : current
    }

    return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    const names = blogs.map(blog => blog.author)

    const frequencyMap = names.reduce((acc, name) => {
        acc[name] = (acc[name] || 0) + 1 // Kun nimi tulee vastaan, sen arvoksi asetetaan joko vanha arvo + 1 tai 0 + 1
        return acc
    }, {})

    let maxCount = 0
    let mostFrequent = ""
    for (const [name, count] of Object.entries(frequencyMap)) {
        if (count > maxCount) {
            maxCount = count
            mostFrequent = name
        }
    }

    const result =  {
        "author": mostFrequent,
        "blogs": maxCount
    }

    return result
}

const mostLikes = (blogs) => {
    // Funktio selvittää kirjoittajan, jonka blogeilla on eniten tykkäyksiä.
    const names = blogs.map(blog => blog.author)

    const likesMap = blogs.reduce((sum, blog) => {
        sum[blog.author] = (sum[blog.author] || 0) + blog.likes
        return sum
    }, {})

    let maxLikes = 0
    let mostLiked = ""

    for (const [name, likes] of Object.entries(likesMap)) {
        if (likes > maxLikes) {
            maxLikes = likes
            mostLiked = name
        }
    }

    const result = {
        "author": mostLiked,
        "likes" : maxLikes
    }

    return result
}



module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}