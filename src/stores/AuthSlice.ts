import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  name?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
  } | null;
  users: User[];
}

// Get initial state from localStorage or use default
const getInitialState = (): AuthState => {
  const savedState = localStorage.getItem("authState");
  const savedUsers = localStorage.getItem("users");

  if (savedState && savedUsers) {
    return {
      ...JSON.parse(savedState),
      users: JSON.parse(savedUsers),
    };
  }
  return {
    isAuthenticated: false,
    user: null,
    users: [],
  };
};

const initialState: AuthState = getInitialState();

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
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
    register: (state, action: PayloadAction<User>) => {
      // Check if user already exists
      const userExists = state.users.some(
        (user) => user.email === action.payload.email
      );
      if (!userExists) {
        state.users.push(action.payload);
        // Save users to localStorage
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
  },
});

export const { login, logout, register } = AuthSlice.actions;
export default AuthSlice.reducer;
