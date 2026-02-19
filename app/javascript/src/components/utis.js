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

const buildCategoryValue = category => {
  if (!category) return null;
  const id = category.value ?? category.id;
  const name = category.label ?? category.name;
  if (!id || !name) return null;

  return { label: name, value: id };
};

const defaultSubmitStatusFor = currentStatus =>
  currentStatus === "published" ? "draft" : "published";

const actionLabel = status =>
  status === "published" ? "Publish" : "Save as draft";

export {
  actionLabel,
  buildCategoryValue,
  defaultSubmitStatusFor,
  formatPostDate,
  truncate,
};
