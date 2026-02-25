import React, { useState } from "react";

import { Tag, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { is, isNil, reject } from "ramda";
import { NavLink } from "react-router-dom";
import routes from "routes";
import { formatPostDate, truncate } from "src/components/utis";
import { useVotePost } from "src/hooks/usePosts";

const Card = ({ post }) => {
  const {
    created_at: createdAt,
    description,
    slug,
    title,
    user,
    categories = [],
    net_votes: initialNetVotes = 0,
    is_bloggable: initialIsBloggable = false,
    my_vote: initialMyVote = null,
  } = post;
  const formattedDate = formatPostDate(createdAt);
  const preview = truncate(description);
  const authorName = user?.name;
  const safeCategories = is(Array, categories) ? reject(isNil, categories) : [];
  const hasCategories = safeCategories.length > 0;

  const [netVotes, setNetVotes] = useState(initialNetVotes ?? 0);
  const [isBloggable, setIsBloggable] = useState(Boolean(initialIsBloggable));
  const [myVote, setMyVote] = useState(initialMyVote);

  const { mutate: votePost, isLoading: isVoting } = useVotePost({
    onSuccess: data => {
      setNetVotes(data?.net_votes ?? 0);
      setIsBloggable(Boolean(data?.is_bloggable));
      setMyVote(data?.my_vote ?? null);
    },
  });

  const handleVote = value => {
    if (!slug) return;
    votePost({ slug, value });
  };

  return (
    <article className="py-6">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
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
          {(hasCategories || isBloggable) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {safeCategories.map(({ id, name }) => (
                <span
                  className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                  key={id ?? name}
                >
                  {name}
                </span>
              ))}
              {isBloggable && (
                <Tag
                  label="Blog it"
                  size="small"
                  style="success"
                  type="outline"
                />
              )}
            </div>
          )}
          {(authorName || formattedDate) && (
            <Typography
              className="mt-2 text-gray-500"
              component="p"
              style="nano"
            >
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
        </div>
        <div className="flex flex-col items-center gap-1 pt-1">
          <button
            aria-label="Upvote"
            disabled={isVoting}
            type="button"
            className={classNames(
              "rounded px-2 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              {
                "bg-green-50 font-semibold text-green-700 ring-1 ring-inset ring-green-600/20 hover:bg-green-100":
                  myVote === "upvote",
                "text-gray-700 hover:bg-gray-100": myVote !== "upvote",
              }
            )}
            onClick={() => handleVote(1)}
          >
            ↑
          </button>
          <span
            className={classNames("text-sm font-semibold", {
              "text-green-700": netVotes >= 0,
              "text-rose-700": netVotes < 0,
            })}
          >
            {netVotes}
          </span>
          <button
            aria-label="Downvote"
            disabled={isVoting}
            type="button"
            className={classNames(
              "rounded px-2 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              {
                "bg-rose-50 font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/20 hover:bg-rose-100":
                  myVote === "downvote",
                "text-gray-700 hover:bg-gray-100": myVote !== "downvote",
              }
            )}
            onClick={() => handleVote(-1)}
          >
            ↓
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
