import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getCheckoutData = async () => {
  try {
    const response = await api.get("/checkout");
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch checkout data");
  }
};

export const createOrder = async (newOrder) => {
  try {
    const response = await api.post("/checkout", newOrder);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to create new order");
  }
};

export const placeOrder = async (newOrderData) => {
  try {
    const response = await api.post("/checkout", newOrderData);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to place your order");
  }
};
