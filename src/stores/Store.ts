import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice";
import SearchSlice from "./SearchSlice";

export const store = configureStore({
  reducer: { auth: AuthSlice, cart: CartSlice, search: SearchSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
