const setToLocalStorage = values => {
  Object.entries(values).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
      if (key === "email") localStorage.removeItem("email");

      return;
    }

    localStorage.setItem(key, String(value));
    if (key === "email") localStorage.setItem("email", String(value));
  });
};

const getFromLocalStorage = key => localStorage.getItem(key);

const setUserDataToStorage = userData => {
  const { authentication_token, email, id, name } = userData ?? {};

  setToLocalStorage({
    authToken: authentication_token,
    email,
    userId: id,
    userName: name,
  });
};

export { getFromLocalStorage, setToLocalStorage, setUserDataToStorage };
