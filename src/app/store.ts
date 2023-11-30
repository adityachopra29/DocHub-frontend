import { configureStore } from '@reduxjs/toolkit'
// import createDocModalReducer from '../features/createDocModalSlice'
import openDocumentReducer from '../features/openDocumentSlice'

const store = configureStore({
    reducer: {
        openDocument: openDocumentReducer,
      // Add other reducers here if needed
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;