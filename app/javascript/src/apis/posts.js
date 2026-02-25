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

export {
  createPost,
  destroyPost,
  fetchMyPosts,
  fetchPost,
  fetchPosts,
  updatePost,
};
