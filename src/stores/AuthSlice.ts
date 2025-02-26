import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
  } | null;
}

// Get initial state from localStorage or use default
const getInitialState = (): AuthState => {
  const savedState = localStorage.getItem("authState");
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    isAuthenticated: false,
    user: null,
  };
};

const initialState: AuthState = getInitialState();

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Save to localStorage
      localStorage.setItem(
        "authState",
        JSON.stringify({
          isAuthenticated: true,
          user: action.payload,
        })
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Clear from localStorage
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
