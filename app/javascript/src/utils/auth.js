import { getFromLocalStorage } from "./storage";

const isLoggedIn = () => {
  const token = getFromLocalStorage("authToken");
  const email = getFromLocalStorage("authEmail");

  return Boolean(token && email);
};

const getLoggedInUserName = () => getFromLocalStorage("userName");

export { getLoggedInUserName, isLoggedIn };
