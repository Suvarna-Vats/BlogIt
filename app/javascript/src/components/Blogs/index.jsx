import React from "react";

import Layout from "components/Blog/Layout";

import Blogs from "./Blogs";

const BlogsPage = () => (
  <Layout>
    <div className="mx-auto w-full max-w-5xl">
      <Blogs />
    </div>
  </Layout>
);

export default BlogsPage;
