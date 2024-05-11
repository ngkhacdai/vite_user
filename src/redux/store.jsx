import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import userReducer from "./slice/userSlice";
import addressReducer from "./slice/addressSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    address: addressReducer,
  },
});
