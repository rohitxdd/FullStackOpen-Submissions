const dummy = (blog) => {
  return 1;
};

const totalLikes = (blogList) => {
  return blogList.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogList) => {
  if (blogList.length > 0) {
    const favBlog = blogList.reduce(
      (fav, curr) => (curr.likes > fav.likes ? curr : fav),
      { likes: Number.NEGATIVE_INFINITY }
    );
    delete favBlog._id;
    delete favBlog.url;
    delete favBlog.__v;
    return favBlog;
  } else {
    return {};
  }
};

const mostBlogs = (blogList) => {
  if (blogList.length === 0) {
    return {};
  }
  let authors = {};
  let maxBlogNum = Number.NEGATIVE_INFINITY;
  let authorWithMaxBlog = "";
  blogList.forEach((blog) => {
    let { author } = blog;
    if (authors[author]) {
      authors[author]++;
    } else {
      authors[author] = 1;
    }
    if (authors[author] > maxBlogNum) {
      maxBlogNum = authors[author];
      authorWithMaxBlog = author;
    }
  });
  return { author: authorWithMaxBlog, blogs: maxBlogNum };
};

const mostLikes = (blogList) => {
  if (blogList.length > 0) {
    let mostLikedAuthor = {};
    let maxLikes = Number.NEGATIVE_INFINITY;
    let authorWithMaxLike = "";

    blogList.forEach((blog) => {
      let { author, likes } = blog;
      if (mostLikedAuthor[author]) {
        mostLikedAuthor[author] += likes;
      } else {
        mostLikedAuthor[author] = likes;
      }
      if (mostLikedAuthor[author] > maxLikes) {
        maxLikes = mostLikedAuthor[author];
        authorWithMaxLike = author;
      }
    });
    return { author: authorWithMaxLike, likes: maxLikes };
  } else {
    return {};
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
