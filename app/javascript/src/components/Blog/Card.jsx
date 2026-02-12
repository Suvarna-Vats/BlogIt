import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Card = ({ post }) => {
  const { description, downvotes, title, upvotes } = post;

  return (
    <article className="py-6">
      <Typography component="h2" style="h5" weight="semibold">
        {title}
      </Typography>
      <Typography
        className="mt-2 leading-6 text-gray-700"
        component="p"
        style="body2"
      >
        {description}
      </Typography>
      <div className="mt-3 flex gap-4">
        <Typography className="text-gray-600" component="p" style="nano">
          Upvotes: {upvotes}
        </Typography>
        <Typography className="text-gray-600" component="p" style="nano">
          Downvotes: {downvotes}
        </Typography>
      </div>
    </article>
  );
};

export default Card;
