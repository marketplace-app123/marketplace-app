import axios from "axios";

const API_BASE_URL = "https://marketplace.eventiefiere.com/wp-json/marketplace/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getCategories = async (params = {}) => {
  // Returns array of category objects
  const response = await apiClient.get("/categories", { params });
  return response.data;
};

export const getProducts = async (params = {}) => {
  // Returns array of product objects with vendor info
  const response = await apiClient.get("/products", { params });
  return response.data;
};

export const getProduct = async (id) => {
  // Returns single product detail by ID
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export default {
  getCategories,
  getProducts,
  getProduct,
};
