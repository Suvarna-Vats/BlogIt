import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";

import Card from "./Card";

const Posts = ({ posts = [], onAddNew }) => {
  if (!posts.length) {
    return (
      <div className="py-24">
        <Typography component="h2" style="h4" weight="semibold">
          No blog posts yet
        </Typography>
        <Typography className="mt-2 text-gray-600" style="body2">
          Create your first blog idea to get started.
        </Typography>
        <div className="mt-6">
          <Button label="Add new blog post" size="small" onClick={onAddNew} />
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {posts.map(post => (
        <Card key={post.id} {...{ post }} />
      ))}
    </div>
  );
};

export default Posts;
