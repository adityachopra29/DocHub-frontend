import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateDocModalState {
  open: boolean;
}

const initialState: CreateDocModalState = {
  open: false,
};

export const createDocModalSlice = createSlice({
  name: "createDocModal",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = createDocModalSlice.actions;

export default createDocModalSlice.reducer;

