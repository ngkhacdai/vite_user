import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectIndex: 0,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    onSelectIndex: (state, action) => {
      state.selectIndex = action.payload;
    },
  },
});

export const { onSelectIndex } = addressSlice.actions;

export default addressSlice.reducer;
