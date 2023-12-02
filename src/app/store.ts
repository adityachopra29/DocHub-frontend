import { configureStore, current } from '@reduxjs/toolkit'
import openDocumentReducer from '../features/openDocumentSlice'
import userReducer from '../features/userSlice'

const store = configureStore({
    reducer: {
        openDocument: openDocumentReducer,
        currentUser:  userReducer
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;