import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
import axios from "axios";


const { LOGIN_API, REFRESH_API } = endpoints;

// Function to decode JWT and get expiration time
const getTokenExpirationTime = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken.exp * 1000; // exp is in seconds, so convert to milliseconds
};

// Function to determine if token is expired
export const isTokenExpired = (expTime) => {
  console.log(expTime)
  return Date.now() >= expTime;
};

// Helper function to safely access localStorage
const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

// Define the async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Return both the accessToken and refreshToken
      return {
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
        user: response.data.data.user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

// Define the async thunk for refreshing the token
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const refreshToken = state.auth.refreshToken;
          console.log(refreshToken)
          const response = await axios.post(REFRESH_API, null, {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbTEzMTB2cmYwMDAwcWMyMnV5MHh3dml3IiwiaWF0IjoxNzI2NDg5MTI5LCJleHAiOjE3MjczNTMxMjl9.i-M2U6XTTyQKfSldPhjFPPptIaLUdI8W5j0RnZuJsgQ"
            }
          });
          

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data.accessToken;  // Return the new access token
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred while refreshing the token"
      );
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getLocalStorage("user") ? JSON.parse(getLocalStorage("user")) : null,
    token: getLocalStorage("token") ? getLocalStorage("token") : null,
    refreshToken: getLocalStorage("refreshToken") ? getLocalStorage("refreshToken") : null,
    tokenExpiration: getLocalStorage("tokenExpiration") ? parseInt(getLocalStorage("tokenExpiration")) : null,
    loading: false,
    error: null,
    status: "idle",  // Could be 'idle', 'loading', 'succeeded', or 'failed'
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.tokenExpiration = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiration");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        toast.success("Login successful!");

        const expirationTime = getTokenExpirationTime(action.payload.accessToken);
         console.log(action.payload)
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.tokenExpiration = expirationTime;
        state.error = null;
        state.status = "succeeded";

        // Save tokens and user to localStorage
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("tokenExpiration", expirationTime);
      })
      .addCase(login.rejected, (state, action) => {
        toast.error(action.payload || "Login failed");
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        const newExpirationTime = getTokenExpirationTime(action.payload);

        state.token = action.payload;
        state.tokenExpiration = newExpirationTime;
        state.loading = false;

        localStorage.setItem("token", action.payload);
        localStorage.setItem("tokenExpiration", newExpirationTime);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        toast.error("Failed to refresh token, please log in again");
        state.error = action.payload;
        state.token = null;
        state.tokenExpiration = null;
        state.loading = false;
      });
  },
});

export const { clearError, logout } = authSlice.actions;

export default authSlice.reducer;
