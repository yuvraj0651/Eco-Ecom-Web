import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Fetch All Featured Products
export const getFeaturedProducts = async () => {
  try {
    const response = await api.get("/featuredProducts");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch featured products");
  }
};
