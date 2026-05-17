import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Fetch cart data
export const getCartData = async () => {
  try {
    const response = await api.get("/cart");
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch cart data",
    );
  }
};

// Add To Cart
export const addToCart = async (newItem) => {
  try {
    const response = await api.post("/cart", newItem);
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add item to the cart",
    );
  }
};

// Remove from cart
export const removeCartItem = async (id) => {
  try {
    const response = await api.delete(`/cart/${id}`);
    return id;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to remove item from cart",
    );
  }
};

// Update Cart Item
export const updateCartItem = async (id, updatedItem) => {
  try {
    const response = await api.put(`/cart/${id}`, updatedItem);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update cart item",
    );
  }
};

// bulk Delete
export const bulkDeleteItem = async (cartIds) => {
  try {
    const response = await Promise.all(
      cartIds.map((id) => api.delete(`/cart/${id}`)),
    );
    return cartIds;
  } catch (error) {
    throw new Error("Failed to bulk delete cart items");
  }
};
