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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
