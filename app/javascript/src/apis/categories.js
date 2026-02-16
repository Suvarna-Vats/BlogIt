import axios from "axios";

const fetchCategories = async () => axios.get("/categories");

const createCategory = async payload =>
  axios.post("/categories", {
    category: payload,
  });

export { createCategory, fetchCategories };
