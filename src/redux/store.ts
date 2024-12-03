import authSlice from './authSlice/userSlice';
import apiSlice from "../redux/authSlice/index" 
import searchSlice from './searchSlice/searchSlice';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authSlice'],
};


const rootReducer = combineReducers({
  authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,  
  [searchSlice.reducerPath]:searchSlice.reducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiSlice.middleware ,searchSlice.middleware), 
});


export type RootState = ReturnType<typeof rootReducer>;

const persistor = persistStore(store); 

export { store, persistor };
