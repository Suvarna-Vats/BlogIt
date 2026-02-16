import axios from "axios";

const fetchPosts = async () => axios.get("/posts");
const fetchPost = async slug => axios.get(`/posts/${slug}`);

const createPost = async payload =>
  axios.post("/posts", {
    post: payload,
  });

export { createPost, fetchPost, fetchPosts };
