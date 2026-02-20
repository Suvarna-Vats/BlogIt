import React from "react";

import { PostForm } from "components/commons";
import { useHistory } from "react-router-dom";
import { useCreatePost } from "src/hooks/usePosts";

const New = () => {
  const history = useHistory();
  const { mutate: createPost } = useCreatePost();

  return (
    <PostForm
      heading="New blog post"
      onCancel={() => history.push("/blogs")}
      onSubmit={payload => {
        createPost(payload);
        history.push("/blogs");
      }}
    />
  );
};

export default New;
