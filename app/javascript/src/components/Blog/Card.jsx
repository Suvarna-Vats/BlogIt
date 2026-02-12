import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Card = ({ post }) => {
  const { date, excerpt, title } = post;

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
        {excerpt}
      </Typography>
      <Typography className="mt-2 text-gray-500" component="p" style="nano">
        {date}
      </Typography>
    </article>
  );
};

export default Card;
