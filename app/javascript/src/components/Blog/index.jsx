import React from "react";

import { BackButton } from "components/commons";

import Show from "./Show";

import Layout from "../../commons/Layout";

const Blog = () => (
  <Layout>
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-10">
        <BackButton to="/blogs" />
      </div>
      <Show />
    </div>
  </Layout>
);

export default Blog;
