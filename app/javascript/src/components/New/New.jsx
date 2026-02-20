import React from "react";

import { PostForm } from "components/commons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { useCreatePost } from "src/hooks/usePosts";

const New = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { mutate: createPost } = useCreatePost();

  return (
    <PostForm
      heading={t("postForm.heading.new")}
      onCancel={() => history.push(routes.blogs.index)}
      onSubmit={payload => {
        createPost(payload);
        history.push(routes.blogs.index);
      }}
    />
  );
};

export default New;
