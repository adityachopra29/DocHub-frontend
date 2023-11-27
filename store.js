import { configureStore } from '@reduxjs/toolkit'

export default store = configureStore({ reducer: {
    counter : counterReducer,
    
}})

console.log(store.getState())
// {value: 0}