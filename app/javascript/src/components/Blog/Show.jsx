import React, { useEffect, useState } from "react";

import { Spinner } from "@bigbinary/neetoui";
import Blog from "components/commons/Blog";
import { useHistory, useParams } from "react-router-dom";
import { fetchPost } from "src/apis/posts";

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
        history.push("/blogs");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [history, slug]);

  if (isLoading) {
    return (
      <div className="grid place-items-center py-24">
        <Spinner />
      </div>
    );
  }

  if (!post) return null;

  return <Blog {...post} slug={slug} />;
};

export default Show;
