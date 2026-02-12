import axios from "axios";

// axios doesn't ship with `fetch`; alias it for convenience.
axios.fetch = axios.fetch || axios.get;

const fetchPosts = async () => axios.fetch("/posts");

export { fetchPosts };

