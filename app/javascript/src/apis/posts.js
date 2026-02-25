import axios from "axios";

const fetchPosts = async (params = {}) => axios.get("/posts", { params });
const fetchPost = async slug => axios.get(`/posts/${slug}`);
const fetchMyPosts = async (params = {}) =>
  axios.get("/posts/mine", { params });

const createPost = async payload =>
  axios.post("/posts", {
    post: payload,
  });

const updatePost = async (slug, payload) =>
  axios.put(`/posts/${slug}`, {
    post: payload,
  });

const destroyPost = async slug => axios.delete(`/posts/${slug}`);

const votePost = async (slug, value) =>
  axios.put(`/posts/${slug}/vote`, {
    vote: {
      value,
    },
  });

const createPostPdfExport = async slug =>
  axios.post(`/posts/${slug}/pdf_exports`);

const downloadPostPdfExport = async (slug, token) =>
  axios.get(`/posts/${slug}/pdf_exports/${token}`, {
    responseType: "blob",
  });

const bulkUpdatePosts = async payload =>
  axios.put("/posts/bulk", {
    post: payload,
  });

const bulkDestroyPosts = async ids =>
  axios.delete("/posts/bulk", {
    data: {
      post: {
        ids,
      },
    },
  });

export {
  bulkDestroyPosts,
  bulkUpdatePosts,
  createPost,
  createPostPdfExport,
  downloadPostPdfExport,
  destroyPost,
  fetchMyPosts,
  fetchPost,
  fetchPosts,
  updatePost,
  votePost,
};
