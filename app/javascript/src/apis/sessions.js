import axios from "axios";

const createSession = async payload =>
  axios.post("/session", {
    login: payload,
  });

const destroySession = async () => axios.delete("/session");

export { createSession, destroySession };

