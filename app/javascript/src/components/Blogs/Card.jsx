import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { is, isNil, reject } from "ramda";
import { NavLink } from "react-router-dom";
import routes from "routes";
import { formatPostDate, truncate } from "src/components/utis";

const Card = ({ post }) => {
  const {
    created_at: createdAt,
    description,
    slug,
    title,
    user,
    categories = [],
  } = post;
  const formattedDate = formatPostDate(createdAt);
  const preview = truncate(description);
  const authorName = user?.name;
  const safeCategories = is(Array, categories) ? reject(isNil, categories) : [];
  const hasCategories = safeCategories.length > 0;

  return (
    <article className="py-6">
      <NavLink to={routes.blogs.show(slug)}>
        <Typography
          className="text-gray-900 hover:underline"
          component="h2"
          style="h5"
          weight="semibold"
        >
          {title}
        </Typography>
      </NavLink>
      {hasCategories && (
        <div className="mt-3 flex flex-wrap gap-2">
          {safeCategories.map(({ id, name }) => (
            <span
              className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              key={id ?? name}
            >
              {name}
            </span>
          ))}
        </div>
      )}
      {(authorName || formattedDate) && (
        <Typography className="mt-2 text-gray-500" component="p" style="nano">
          {authorName}
          {authorName && formattedDate ? " • " : ""}
          {formattedDate}
        </Typography>
      )}
      <Typography
        className="mt-2 leading-6 text-gray-700"
        component="p"
        style="body2"
      >
        {preview}
      </Typography>
    </article>
  );
};

export default Card;
