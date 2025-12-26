import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfirmDialogPropsStoreRedux } from '../types/views';

const initialState: {
  dialogContent: ConfirmDialogPropsStoreRedux;
} = {
  dialogContent: {
    isOpen: false,
    buttonLeft: '',
    buttonRight: '',
    contentPopup: '',
    title: '',
  },
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    handleDialogContent: (
      state,
      action: PayloadAction<ConfirmDialogPropsStoreRedux>
    ) => {
      state.dialogContent = action.payload;
    },
    resetDialogContent: (state) => {
      state.dialogContent = initialState.dialogContent;
    },
  },
});

export const { handleDialogContent, resetDialogContent } = dialogSlice.actions;

export default dialogSlice.reducer;
