const normalizeStorageKey = key => (key === "email" ? "authEmail" : key);

const setToLocalStorage = values => {
  Object.entries(values).forEach(([key, value]) => {
    const storageKey = normalizeStorageKey(key);

    if (value === null || value === undefined) {
      localStorage.removeItem(storageKey);
      if (key === "email") localStorage.removeItem("email");

      return;
    }

    localStorage.setItem(storageKey, String(value));
    if (key === "email") localStorage.setItem("email", String(value));
  });
};

const getFromLocalStorage = key =>
  localStorage.getItem(normalizeStorageKey(key));

export { getFromLocalStorage, setToLocalStorage };
