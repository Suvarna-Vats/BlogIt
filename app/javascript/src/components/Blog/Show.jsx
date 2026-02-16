import React, { useEffect, useState } from "react";

import { Left } from "@bigbinary/neeto-icons";
import { Button, Spinner, Tag, Typography } from "@bigbinary/neetoui";
import { is, isNil, reject } from "ramda";
import { useHistory, useParams } from "react-router-dom";
import { fetchPost } from "src/apis/posts";

import Layout from "./Layout";
import { formatPostDate } from "./utis";

const Show = () => {
  const history = useHistory();
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formattedDate = formatPostDate(post?.created_at);
  const authorName = post?.user?.name;
  const safeCategories = is(Array, post?.categories)
    ? reject(isNil, post.categories)
    : [];
  const hasCategories = safeCategories.length > 0;

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPost(slug);
        setPost(response?.data?.post || null);
      } catch {
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
            {hasCategories && (
              <div className="mb-4 flex flex-wrap gap-2">
                {safeCategories.map(({ id, name }) => (
                  <Tag
                    key={id ?? name}
                    label={name}
                    size="small"
                    style="success"
                    type="outline"
                  />
                ))}
              </div>
            )}
            <Typography component="h1" style="h2" weight="bold">
              {post?.title}
            </Typography>
            {(authorName || formattedDate) && (
              <Typography
                className="mt-3 text-gray-500"
                component="p"
                style="nano"
              >
                {authorName}
                {authorName && formattedDate ? " • " : ""}
                {formattedDate}
              </Typography>
            )}
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
