import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectProduct: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    onSelectProduct: (state, action) => {
      state.selectProduct = action.payload;
    },
  },
});

export const { onSelectProduct } = cartSlice.actions;

export default cartSlice.reducer;
