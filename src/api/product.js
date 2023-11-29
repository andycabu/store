import axios from "./axios";

export const productsRequest = () => axios.get("/products");
export const addProductRequest = (product) =>
  axios.post("/product/add", product);
export const deleteProductRequest = (id) =>
  axios.delete(`/product/delete/${id}`);
export const updateProductRequest = (id, newStock) =>
  axios.put(`/product/update/${id}`, newStock);
