import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface openDocumentState {
  documentId: number
}

const initialState: openDocumentState = {
  documentId : -1
};

export const openDocumentSlice = createSlice({
  name: "openDocument",  //the name of the reducer
  initialState,
  reducers: {
    changeDocument : (state, action) => { //these are the switch cases for different actions that can be passed into the reducer
      state.documentId = action.payload
      console.log("new doc Id: ", state.documentId)
    }
  },
});

export const { changeDocument } = openDocumentSlice.actions;

export default openDocumentSlice.reducer;
