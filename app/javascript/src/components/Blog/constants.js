const BLOG_NAV_ITEMS = [
  { label: "Blog posts", to: "/blogs", icon: "ri-file-list-2-line" },
  { label: "Edit posts", to: "/edit", icon: "ri-edit-2-line" },
  { label: "Categories", icon: "ri-price-tag-3-line", action: "categories" },
  { label: "New blog post", to: "/blogs/new", icon: "ri-add-line" },
];
const MAX_TITLE_LENGTH = 125;
const MAX_DESCRIPTION_LENGTH = 1000;

export { BLOG_NAV_ITEMS, MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH };
