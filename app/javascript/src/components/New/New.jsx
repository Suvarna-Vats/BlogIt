import React from "react";

import { PostForm } from "components/commons";
import { useHistory } from "react-router-dom";
import { useCreatePost } from "src/hooks/usePosts";

const New = () => {
  const history = useHistory();
  const { mutateAsync: createPost } = useCreatePost();

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
