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
  destroyPost,
  fetchMyPosts,
  fetchPost,
  fetchPosts,
  updatePost,
};
