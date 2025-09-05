// api.js
import axios from "axios";
import { API_BASE_URL, API_KEYS } from "./config";

// istanza axios con timeout e baseURL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// helper: aggiunge le chiavi a ogni chiamata
function withAuthParams(params = {}) {
  return {
    ...params,
    consumer_key: API_KEYS.consumerKey,
    consumer_secret: API_KEYS.consumerSecret,
  };
}

// Categorie di primo livello (parent = 0)
export async function fetchRootCategories() {
  const res = await api.get("/products/categories", {
    params: withAuthParams({
      per_page: 100,
      parent: 0,
      orderby: "name",
      order: "asc",
      hide_empty: false,
    }),
  });
  return res.data;
}

// Sottocategorie per una categoria padre
export async function fetchSubcategories(parentId) {
  const res = await api.get("/products/categories", {
    params: withAuthParams({
      per_page: 100,
      parent: parentId,
      orderby: "name",
      order: "asc",
      hide_empty: false,
    }),
  });
  return res.data;
}

// Prodotti per id categoria
export async function fetchProductsByCategory(categoryId) {
  const res = await api.get("/products", {
    params: withAuthParams({
      per_page: 20,
      page: 1,
      category: categoryId, // WooCommerce attende l'ID categoria
      status: "publish",
      orderby: "date",
      order: "desc",
    }),
  });
  return res.data;
}

// Dettaglio prodotto
export async function fetchProduct(productId) {
  const res = await api.get(`/products/${productId}`, {
    params: withAuthParams(),
  });
  return res.data;
}
