import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface DecodedToken {
  email: string;
  _id: string;
  role: string;
  exp: number;
  iat: number;
}

interface AuthState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null, // Get token from cookies
  role: null,
  isAuthenticated: !!Cookies.get("token"), // Check if token exists in cookies
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;

      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        state.token = token;
        state.role = decoded.role;
        state.isAuthenticated = true;

        // Save token to cookies
        Cookies.set("token", token);
      } catch (error) {
        console.error("Invalid token:", error);
        state.isAuthenticated = false;
      }
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;

      // Remove token from cookies
      Cookies.remove("token");
    },
    loadUserFromToken: (state) => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
          state.token = token;
          state.role = decoded.role;
          state.isAuthenticated = true;
        } catch (error) {
          console.error("Failed to decode token:", error);
          state.isAuthenticated = false;
        }
      }
    },
  },
});

export const { setCredentials, logout, loadUserFromToken } = authSlice.actions;
export default authSlice.reducer;
