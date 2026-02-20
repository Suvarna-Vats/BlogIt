import React from "react";

import { BackButton } from "components/commons";
import Layout from "src/components/commons/Layout";

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
