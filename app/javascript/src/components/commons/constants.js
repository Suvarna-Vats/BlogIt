import {
  AddCircle,
  Articles,
  Category,
  Edit,
  Folder,
} from "@bigbinary/neeto-icons";

const SIDEBAR_ITEMS = [
  { label: "Blog posts", to: "/blogs", icon: Articles },
  { label: "My blog posts", to: "/my-blog-posts", icon: Folder },
  { label: "Edit posts", to: "/edit", icon: Edit },
  { label: "Categories", icon: Category, action: "categories" },
  { label: "New blog post", to: "/blogs/new", icon: AddCircle },
];
const DEFAULT_ITEMS = [{ label: "Blog posts", to: "/blogs", icon: Articles }];

export { DEFAULT_ITEMS, SIDEBAR_ITEMS };
