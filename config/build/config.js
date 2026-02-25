import { createRequire } from "module";
import path from "path";

import { absolutePath } from "./constants.js";

const require = createRequire(import.meta.url);

const alias = {
  images: path.resolve(process.cwd(), "app/assets/images"),
  crypto: require.resolve("crypto-browserify"),
  path: require.resolve("path-browserify"),
  buffer: require.resolve("buffer"),
  stream: require.resolve("stream-browserify"),
  assets: absolutePath("../assets"),
  src: absolutePath("src"),
  routes: absolutePath("src/routes.js"),
  apis: absolutePath("src/apis"),
  common: absolutePath("src/common"),
  components: absolutePath("src/components"),
  constants: absolutePath("src/constants"),
  utils: absolutePath("src/utils"),
  channels: absolutePath("src/channels"),
  "neeto-ui": absolutePath("src/neeto-ui"),
};

export { alias };
