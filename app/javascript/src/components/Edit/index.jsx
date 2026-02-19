import React from "react";

import Layout from "components/Blog/Layout";
import { BackButton } from "components/commons";

import Dashboard from "./Dashboard";

const Edit = () => (
  <Layout>
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-10">
        <BackButton to="/blogs" />
      </div>
      <Dashboard />
    </div>
  </Layout>
);

export default Edit;
