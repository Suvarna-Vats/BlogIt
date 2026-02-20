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

const formatPostDateTime = value => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
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

const actionLabel = (status, t) => {
  if (typeof t === "function") {
    return status === "published"
      ? t("postForm.submit.publish")
      : t("postForm.submit.saveAsDraft");
  }

  return status === "published" ? "Publish" : "Save as draft";
};

const buildPostActions = ({ status, onChangeStatus, onDelete, t }) =>
  [
    status === "draft" && {
      key: "publish",
      label: typeof t === "function" ? t("postForm.submit.publish") : "Publish",
      onClick: () => onChangeStatus("published"),
    },
    status === "published" && {
      key: "unpublish",
      label:
        typeof t === "function" ? t("postForm.submit.unpublish") : "Unpublish",
      onClick: () => onChangeStatus("draft"),
    },
    {
      key: "delete",
      label: typeof t === "function" ? t("postForm.submit.delete") : "Delete",
      style: "danger",
      onClick: onDelete,
    },
  ].filter(Boolean);

export {
  actionLabel,
  buildCategoryValue,
  buildPostActions,
  defaultSubmitStatusFor,
  formatPostDate,
  formatPostDateTime,
  truncate,
};
