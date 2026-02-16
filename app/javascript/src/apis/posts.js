import axios from "axios";

const fetchPosts = async (params = {}) => axios.get("/posts", { params });
const fetchPost = async slug => axios.get(`/posts/${slug}`);

const createPost = async payload =>
  axios.post("/posts", {
    post: payload,
  });

export { createPost, fetchPost, fetchPosts };
