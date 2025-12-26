import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  showMenubar:boolean;
} = {
  showMenubar:true
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    resetHeaderStore: () => {
      return initialState;
    },

    handleShowMenubar: (state, action: PayloadAction<boolean>) => {
      state.showMenubar = action.payload;
    },
  },
});

export const { resetHeaderStore, handleShowMenubar } = headerSlice.actions;

export default headerSlice.reducer;
