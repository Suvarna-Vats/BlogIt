import React, { useEffect, useState } from "react";

import { Spinner } from "@bigbinary/neetoui";
import Layout from "components/Blog/Layout";
import { BackButton, PostForm } from "components/commons";
import { useHistory, useParams } from "react-router-dom";
import { destroyPost, fetchPost, updatePost } from "src/apis/posts";

const EditPost = () => {
  const history = useHistory();
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPost(slug);
        setPost(response?.data?.post || null);
      } catch {
        history.push("/edit");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [history, slug]);

  const handleDelete = async () => {
    await destroyPost(slug);
    history.push("/edit");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-10">
            <BackButton to="/edit" />
          </div>
          <div className="grid place-items-center py-24">
            <Spinner />
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) return null;

  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10">
          <BackButton to="/edit" />
        </div>
        <PostForm
          heading="Edit blog post"
          initialValues={{
            title: post.title,
            description: post.description,
            categories: post.categories,
            status: post.status,
          }}
          onCancel={() => history.push("/edit")}
          onDelete={handleDelete}
          onSubmit={async payload => {
            await updatePost(slug, payload);
            history.push(`/blogs/${slug}`);
          }}
        />
      </div>
    </Layout>
  );
};

export default EditPost;
