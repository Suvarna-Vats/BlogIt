import React from "react";

import { BackButton } from "components/commons";

import Layout from "../../commons/Layout";
import Show from "./Show";

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
