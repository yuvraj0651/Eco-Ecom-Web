import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

export const initialState = {
  authData: storedAuth?.user || null,
  currentUser: storedAuth?.currentUser || null,
  isAuthenticated: storedAuth?.isAuthenticated || false,
  token: storedAuth?.token || null,
  loginLoading: false,
  registerLoading: false,
  currentLoading: false,
  error: null,
};

const BASE_URL = "http://localhost:5000/auth";

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userResponse = await fetch(`${BASE_URL}`);
      if (!userResponse.ok) {
        throw new Error("Failed to fetch login data");
      }

      const users = await userResponse.json();

      const existingUser = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (!existingUser) {
        throw new Error("Invalid Credentials");
      }

      return existingUser;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

// Register New User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (newUser, { rejectWithValue }) => {
    const userWithData = {
      ...newUser,
      status: "active",
      role: "user",
      createdAt: new Date().toISOString(),
    };
    try {
      const userResponse = await fetch(`${BASE_URL}`);

      if (!userResponse.ok) {
        throw new Error("Failed to user auth data");
      }

      const users = await userResponse.json();

      const existingUser = users.find((user) => user.email === newUser.email);

      if (existingUser) {
        throw new Error("User Already Exists");
      }

      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userWithData),
      });

      if (!response.ok) {
        throw new Error("Failed to register new user");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

// Fetch Current User
export const fetchCurrentUser = createAsyncThunk(
  "auth/currentUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch current user data");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.authData = null;
      state.currentUser = null;
      state.currentLoading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.token = null;
      state.registerLoading = false;

      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const getToken = Math.random().toString(36).slice(2);

        state.loginLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.token = getToken;
        state.authData = action.payload;
        state.error = null;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.authData,
            currentUser: action.payload,
            isAuthenticated: true,
            token: state.token,
          }),
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const getToken = Math.random().toString(36).slice(2);

        state.registerLoading = false;
        state.isAuthenticated = true;
        state.token = getToken;
        state.authData = action.payload;
        state.error = null;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.authData,
            currentUser: action.payload,
            isAuthenticated: true,
            token: state.token,
          }),
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.currentLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentLoading = false;
        state.currentUser = action.payload;
        state.error = null;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.authData,
            currentUser: state.currentUser,
            isAuthenticated: true,
            token: state.token,
          }),
        );
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.currentLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
