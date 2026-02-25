import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Button, Tag, Typography } from "@bigbinary/neetoui";
import { is, isNil, reject } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { formatPostDate } from "src/components/utis";
import { getLoggedInUserEmail } from "utils/auth";

const normalizeCategory = category => {
  if (!category) return null;
  const id = category.id ?? category.value;
  const name = category.name ?? category.label;
  if (!name) return null;

  return { id, name };
};

const Blog = ({
  title,
  description,
  categories,
  status,
  updated_at,
  user,
  slug,
  is_bloggable: isBloggable = false,
  isPreview = false,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const formattedDate = formatPostDate(updated_at);
  const authorName = user?.name;
  const loggedInEmail = getLoggedInUserEmail();
  const isOwner = Boolean(loggedInEmail) && loggedInEmail === user?.email;
  const isDraft = status === "draft";

  const safeCategories = is(Array, categories)
    ? reject(isNil, categories).map(normalizeCategory).filter(Boolean)
    : [];
  const hasCategories = safeCategories.length > 0;

  const canEdit = !isPreview && isOwner && Boolean(slug);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-8">
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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Typography component="h1" style="h2" weight="bold">
            {title}
          </Typography>
          {isBloggable && (
            <Tag label="Blog it" size="small" style="success" type="outline" />
          )}
          {isDraft && (
            <span
              aria-label={t("blog.draftAriaLabel")}
              className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700"
            >
              {t("common.draft")}
            </span>
          )}
        </div>
        {canEdit && (
          <Button
            aria-label={t("blog.editAriaLabel")}
            className="rounded bg-white transition-colors hover:bg-gray-100"
            icon={Edit}
            iconSize={20}
            size="small"
            style="text"
            tooltipProps={{
              content: t("blog.editTooltip"),
              position: "bottom",
            }}
            onClick={() => history.push(routes.blogs.edit(slug))}
          />
        )}
      </div>
      {(authorName || formattedDate) && (
        <Typography className="mt-3 text-gray-500" component="p" style="nano">
          {authorName}
          {authorName && formattedDate ? " • " : ""}
          {formattedDate}
        </Typography>
      )}
      <Typography
        className="mt-6 whitespace-pre-wrap text-gray-700"
        style="body2"
      >
        {description}
      </Typography>
    </div>
  );
};

export default Blog;
