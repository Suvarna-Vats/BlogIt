import React from "react";

import { PostForm } from "components/commons";
import { useHistory } from "react-router-dom";
import { createPost } from "src/apis/posts";

const New = () => {
  const history = useHistory();

  return (
    <PostForm
      heading="New blog post"
      onCancel={() => history.push("/blogs")}
      onSubmit={async payload => {
        await createPost(payload);
        history.push("/blogs");
      }}
    />
  );
};

export default New;
