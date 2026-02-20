import React from "react";

import { Spinner } from "@bigbinary/neetoui";
import { BackButton, PostForm } from "components/commons";
import { useHistory, useParams } from "react-router-dom";
import Layout from "src/components/commons/Layout";
import {
  useDestroyPost,
  useFetchPost,
  useUpdatePost,
} from "src/hooks/usePosts";

const EditPost = () => {
  const history = useHistory();
  const { slug } = useParams();

  const { data: { post = null } = {}, isLoading } = useFetchPost(slug, {
    onError: () => history.push("/edit"),
  });
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutate: destroyPost } = useDestroyPost();

  const handleDelete = () => {
    destroyPost(slug);
    history.push("/edit");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-10">
            <BackButton to={-1} />
          </div>
          <div className="grid place-items-center py-24">
            <Spinner />
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) return null;

  const initialFormValues = {
    title: post.title,
    description: post.description,
    categories: post.categories,
    status: post.status,
  };

  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10">
          <BackButton to={-1} />
        </div>
        <PostForm
          heading="Edit blog post"
          initialValues={initialFormValues}
          onCancel={() => history.goBack()}
          onDelete={handleDelete}
          onSubmit={async payload => {
            await updatePost({ slug, payload });
            history.push(`/blogs/${slug}`);
          }}
        />
      </div>
    </Layout>
  );
};

export default EditPost;
