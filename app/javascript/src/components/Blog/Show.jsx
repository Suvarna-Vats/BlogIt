import React, { useEffect, useState } from "react";

import { Left } from "@bigbinary/neeto-icons";
import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import { useHistory, useParams } from "react-router-dom";
import { fetchPost } from "src/apis/posts";

import Layout from "./Layout";

const Show = () => {
  const history = useHistory();
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPost(slug);
        setPost(response?.data?.post || null);
      } catch {
        // Errors are handled globally via axios interceptors.
        history.push("/blogs");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [history, slug]);

  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10">
          <Button
            icon={Left}
            label="Back"
            style="text"
            onClick={() => history.push("/blogs")}
          />
        </div>
        {isLoading ? (
          <div className="grid place-items-center py-24">
            <Spinner />
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <Typography component="h1" style="h2" weight="bold">
              {post?.title}
            </Typography>
            <Typography
              className="mt-6 whitespace-pre-wrap text-gray-700"
              style="body2"
            >
              {post?.description}
            </Typography>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Show;
