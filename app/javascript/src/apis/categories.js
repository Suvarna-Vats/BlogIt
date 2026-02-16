import axios from "axios";

const fetchCategories = async () => axios.get("/categories");

export { fetchCategories };
