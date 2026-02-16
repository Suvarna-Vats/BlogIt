import { __, gt, identity, ifElse, length, pipe, slice, trim } from "ramda";

const formatPostDate = createdAt => {
  if (!createdAt) return null;
  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

const truncate = (value = "", maxLength = 220) =>
  ifElse(
    pipe(length, gt(__, maxLength)),
    pipe(slice(0, maxLength), trim, truncated => `${truncated}…`),
    identity
  )(value);

export { formatPostDate, truncate };
