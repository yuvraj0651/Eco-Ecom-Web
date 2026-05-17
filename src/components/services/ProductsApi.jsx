import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Fetch All Products
export const getProducts = async () => {
  const response = await api.get("/products");
  if (response.status !== 200) {
    throw new Error("Failed to fetch all products");
  }
  const data = response.data;
  return data;
};

// Create all products
export const createProduct = async (newProduct) => {
  const response = await api.post("/products", newProduct);
  if (response.status !== 201) {
    throw new Error("Failed to create new product");
  }
  const data = response.data;
  return data;
};

// Delete Existing Product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete existing product");
  }
  return id;
};

// Update Existing Product
export const updateProduct = async(id , updatedData) => {
  const response = await api.put(`/products/${id}`, updatedData);
  if(response.status !== 200){
    throw new Error("Failed to update existing product");
  };
  const data = response.data;
  return data;
};