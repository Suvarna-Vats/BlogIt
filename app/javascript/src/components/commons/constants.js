import {
  AddCircle,
  Articles,
  Category,
  Edit,
  Folder,
} from "@bigbinary/neeto-icons";
import routes from "routes";

const SIDEBAR_ITEMS = [
  {
    key: "blogs",
    labelKey: "sidebar.items.blogs",
    to: routes.blogs.index,
    icon: Articles,
  },
  {
    key: "myBlogPosts",
    labelKey: "sidebar.items.myBlogPosts",
    to: routes.myBlogPosts.index,
    icon: Folder,
  },
  {
    key: "editPosts",
    labelKey: "sidebar.items.editPosts",
    to: routes.edit.index,
    icon: Edit,
  },
  {
    key: "categories",
    labelKey: "sidebar.items.categories",
    icon: Category,
    action: "categories",
  },
  {
    key: "newBlogPost",
    labelKey: "sidebar.items.newBlogPost",
    to: routes.blogs.new,
    icon: AddCircle,
  },
];

const DEFAULT_ITEMS = [
  {
    key: "blogs",
    labelKey: "sidebar.items.blogs",
    to: routes.blogs.index,
    icon: Articles,
  },
];

export { DEFAULT_ITEMS, SIDEBAR_ITEMS };
