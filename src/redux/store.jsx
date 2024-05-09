import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
