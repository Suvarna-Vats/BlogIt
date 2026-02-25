import { createConsumer } from "@rails/actioncable";
import { getFromLocalStorage } from "utils/storage";

const buildCableUrl = () => {
  const email = getFromLocalStorage("authEmail");
  const token = getFromLocalStorage("authToken");
  const params = new URLSearchParams();
  if (email) params.set("email", email);

  if (token) params.set("token", token);

  const query = params.toString();

  return query ? `/cable?${query}` : "/cable";
};

export default createConsumer(buildCableUrl());
