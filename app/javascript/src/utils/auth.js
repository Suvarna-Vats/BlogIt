import { getFromLocalStorage } from "./storage";

const getLoggedInUserEmail = () => getFromLocalStorage("authEmail");
const getLoggedInUserId = () => getFromLocalStorage("userId");

const isLoggedIn = () => {
  const token = getFromLocalStorage("authToken");
  const email = getLoggedInUserEmail();

  return Boolean(token && email);
};

const getLoggedInUserName = () => getFromLocalStorage("userName");

export {
  getLoggedInUserEmail,
  getLoggedInUserId,
  getLoggedInUserName,
  isLoggedIn,
};
