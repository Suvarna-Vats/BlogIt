import React from "react";

import Layout from "src/components/commons/Layout";

import Blogs from "./Blogs";

const BlogsPage = () => (
  <Layout>
    <div className="mx-auto w-full max-w-5xl">
      <Blogs />
    </div>
  </Layout>
);

export default BlogsPage;
