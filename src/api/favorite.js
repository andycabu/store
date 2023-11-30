import axios from "./axios";

export const favoritesRequest = () => axios.get("/users/:userId/favorites");
export const addProductRequest = (favorite) =>
  axios.post("/favorites/add", favorite);
export const deleteProductRequest = (id) =>
  axios.delete(`/favorite/delete/${id}`);
