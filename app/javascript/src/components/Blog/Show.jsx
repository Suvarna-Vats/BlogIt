import React from "react";

import { Spinner } from "@bigbinary/neetoui";
import Blog from "components/commons/Blog";
import { useHistory, useParams } from "react-router-dom";
import { useFetchPost } from "src/hooks/usePosts";

const Show = () => {
  const history = useHistory();
  const { slug } = useParams();

  const { data: { post = null } = {}, isLoading } = useFetchPost(slug, {
    onError: () => history.push("/blogs"),
  });

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
