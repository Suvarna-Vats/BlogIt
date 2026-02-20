import React from "react";

import { BackButton } from "components/commons";
import routes from "routes";
import Layout from "src/components/commons/Layout";

import New from "./New";

const NewBlogPost = () => (
  <Layout>
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-10">
        <BackButton to={routes.blogs.index} />
      </div>
      <New />
    </div>
  </Layout>
);

export default NewBlogPost;
