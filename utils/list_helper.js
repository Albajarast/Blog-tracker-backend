const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 'there are no blogs'
  }

  return blogs.length === 1
    ? blogs[0].likes
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (favorite, blog) =>
      favorite.likes && favorite.likes > blog.likes ? favorite : blog,
    {}
  )
}

const mostLikes = (blogs) => {
  return blogs
    .map((blog) => ({ author: blog.author, likes: blog.likes }))
    .reduce((obj, currentObj) => {
      obj = [...obj]

      let objValues = Object.values(currentObj)
      let author = objValues[0]
      let likes = objValues[1]

      let foundIndex = obj.findIndex((el) =>
        el['author'] === author ? true : false
      )

      if (foundIndex >= 0) {
        obj[foundIndex]['likes'] += likes
      } else {
        obj.push(currentObj)
      }

      return obj
    }, [])
    .reduce((author, currentAuthor) => {
      author =
        author.likes && author.likes > currentAuthor.likes
          ? author
          : currentAuthor
      return author
    }, [])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes
}
