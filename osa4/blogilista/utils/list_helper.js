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
    // Pitää laskea, millä kirjailijalla on eniten blogeja
    // Eli minkä kirjailijan nimi esiintyy listassa useimmiten
    // talteen siis myös tuo blogien määrä
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

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}