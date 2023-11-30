import axios from "./axios";

export const favoritesRequest = (userId) =>
  axios.get(`/users/${userId}/favorites`);
export const addProductRequest = (data) => axios.post("/favorites/add", data);
export const deleteProductRequest = (id) =>
  axios.delete(`/favorite/delete/${id}`);
