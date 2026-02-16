import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { NavLink } from "react-router-dom";

import { formatPostDate } from "./utis";

const truncate = (value = "", maxLength = 220) =>
  value.length > maxLength ? `${value.slice(0, maxLength).trim()}…` : value;

const Card = ({ post }) => {
  const { created_at: createdAt, description, slug, title } = post;
  const formattedDate = formatPostDate(createdAt);
  const preview = truncate(description);

  return (
    <article className="py-6">
      <NavLink to={`/blogs/${slug}`}>
        <Typography
          className="text-gray-900 hover:underline"
          component="h2"
          style="h5"
          weight="semibold"
        >
          {title}
        </Typography>
      </NavLink>
      <Typography
        className="mt-2 leading-6 text-gray-700"
        component="p"
        style="body2"
      >
        {preview}
      </Typography>
      {formattedDate && (
        <Typography className="mt-2 text-gray-500" component="p" style="nano">
          {formattedDate}
        </Typography>
      )}
    </article>
  );
};

export default Card;
