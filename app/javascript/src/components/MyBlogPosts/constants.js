import { DEFAULT_PAGE_NUMBER, PAGE_SIZE } from "src/components/constants";

const TITLE_TRUNCATE_LENGTH = 55;

const DEFAULT_FILTERS = {
  title: "",
  categories: [],
  status: null,
};

const DEFAULT_VISIBLE_COLUMNS = [
  "title",
  "categories",
  "last_published_at",
  "status",
];

export {
  DEFAULT_FILTERS,
  DEFAULT_VISIBLE_COLUMNS,
  TITLE_TRUNCATE_LENGTH,
  DEFAULT_PAGE_NUMBER,
  PAGE_SIZE,
};
