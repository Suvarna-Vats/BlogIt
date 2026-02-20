const routes = {
  root: "/",
  auth: {
    login: "/login",
    signup: "/signup",
  },
  blogs: {
    index: "/blogs",
    new: "/blogs/new",
    showPath: "/blogs/:slug",
    editPath: "/blogs/:slug/edit",
    show: slug => `/blogs/${slug}`,
    edit: slug => `/blogs/${slug}/edit`,
  },
  edit: {
    index: "/edit",
  },
  myBlogPosts: {
    index: "/my-blog-posts",
  },
};

export default routes;
