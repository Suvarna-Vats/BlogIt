import React from "react";

import Layout from "src/commons/Layout";
import { BackButton } from "components/commons";

import New from "./New";

const NewBlogPost = () => (
  <Layout>
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-10">
        <BackButton to="/blogs" />
      </div>
      <New />
    </div>
  </Layout>
);

export default NewBlogPost;
