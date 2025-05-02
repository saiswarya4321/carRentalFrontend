import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Userslice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import store from './store'



const persistConfig = {
  key: 'root',
  storage,
  whitelist:['user']
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export default configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:false
    })
  
});


export const persistor=persistStore(store)
