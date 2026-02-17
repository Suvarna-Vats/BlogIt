import axios from "axios";

const createUser = async payload =>
  axios.post("/users", {
    user: payload,
  });

export { createUser };
