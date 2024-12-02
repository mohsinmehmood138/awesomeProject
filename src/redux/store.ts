import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './authSlice/userSlice';
import apiSlice from "../redux/authSlice/index" 
import searchSlice from './searchSlice/searchSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authSlice'], // Persist only authSlice
};

// Combine reducers
const rootReducer = combineReducers({
  authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,  
  [searchSlice.reducerPath]:searchSlice.reducer
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiSlice.middleware ,searchSlice.middleware), 
});

// Type for the root state
export type RootState = ReturnType<typeof rootReducer>;

const persistor = persistStore(store); // Persist the store

export { store, persistor };
