import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001/",
});

// Fetch All Routes
export const getRoutes = async () => {
  try {
    const response = await api.get("/routes");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch all routes");
  }
};
