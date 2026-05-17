import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "db.json");

// Read JSON Data
const readData = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

// Write JSON Data
const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Eco Ecom API Running 🚀",
  });
});



// ==============================
// PRODUCTS ROUTES
// ==============================

// Get All Products
app.get("/api/products", (req, res) => {
  const data = readData();
  res.status(200).json(data.products);
});

// Get Single Product
app.get("/api/products/:id", (req, res) => {
  const data = readData();

  const product = data.products.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json(product);
});

// Create Product
app.post("/api/products", (req, res) => {
  const data = readData();

  const newProduct = {
    id: Date.now(),
    ...req.body,
  };

  data.products.push(newProduct);

  writeData(data);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product: newProduct,
  });
});

// Update Product
app.put("/api/products/:id", (req, res) => {
  const data = readData();

  const productIndex = data.products.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  data.products[productIndex] = {
    ...data.products[productIndex],
    ...req.body,
  };

  writeData(data);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product: data.products[productIndex],
  });
});

// Delete Product
app.delete("/api/products/:id", (req, res) => {
  const data = readData();

  data.products = data.products.filter(
    (item) => item.id !== Number(req.params.id)
  );

  writeData(data);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});



// ==============================
// AUTH ROUTES
// ==============================

// Get All Users
app.get("/api/auth", (req, res) => {
  const data = readData();
  res.status(200).json(data.auth);
});

// Get Single User
app.get("/api/auth/:id", (req, res) => {
  const data = readData();

  const user = data.auth.find(
    (item) => item.id === req.params.id
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json(user);
});

// Register User
app.post("/api/auth", (req, res) => {
  const data = readData();

  const newUser = {
    id: Date.now().toString(),
    ...req.body,
  };

  data.auth.push(newUser);

  writeData(data);

  res.status(201).json(newUser);
});

// Update User
app.put("/api/auth/:id", (req, res) => {
  const data = readData();

  const userIndex = data.auth.findIndex(
    (item) => item.id === req.params.id
  );

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  data.auth[userIndex] = {
    ...data.auth[userIndex],
    ...req.body,
  };

  writeData(data);

  res.status(200).json(data.auth[userIndex]);
});

// Delete User
app.delete("/api/auth/:id", (req, res) => {
  const data = readData();

  data.auth = data.auth.filter(
    (item) => item.id !== req.params.id
  );

  writeData(data);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});



// ==============================
// CART ROUTES
// ==============================

// Get Cart Data
app.get("/api/cart", (req, res) => {
  const data = readData();
  res.status(200).json(data.cart);
});

// Add To Cart
app.post("/api/cart", (req, res) => {
  const data = readData();

  const newCartItem = {
    id: Date.now(),
    ...req.body,
  };

  data.cart.push(newCartItem);

  writeData(data);

  res.status(201).json(newCartItem);
});

// Update Cart Item
app.put("/api/cart/:id", (req, res) => {
  const data = readData();

  const cartIndex = data.cart.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (cartIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Cart item not found",
    });
  }

  data.cart[cartIndex] = {
    ...data.cart[cartIndex],
    ...req.body,
  };

  writeData(data);

  res.status(200).json(data.cart[cartIndex]);
});

// Delete Cart Item
app.delete("/api/cart/:id", (req, res) => {
  const data = readData();

  data.cart = data.cart.filter(
    (item) => item.id !== Number(req.params.id)
  );

  writeData(data);

  res.status(200).json({
    success: true,
    message: "Cart item removed successfully",
  });
});



// ==============================
// COUPONS ROUTES
// ==============================

// Get Coupons
app.get("/api/coupons", (req, res) => {
  const data = readData();
  res.status(200).json(data.coupons);
});



// ==============================
// CHECKOUT ROUTES
// ==============================

// Get Checkout Data
app.get("/api/checkout", (req, res) => {
  const data = readData();
  res.status(200).json(data.checkout);
});

// Create / Place Order
app.post("/api/checkout", (req, res) => {
  const data = readData();

  const newOrder = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  data.checkout.push(newOrder);

  writeData(data);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order: newOrder,
  });
});



// ==============================
// SERVER
// ==============================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});