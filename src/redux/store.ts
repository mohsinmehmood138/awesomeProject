import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './authSlice/userSlice';
import apiSlice from "../redux/authSlice/index"

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authSlice'], // Persist only authSlice
};

// Combine reducers
const rootReducer = combineReducers({
  authSlice, // the key will be authSlice, which is where you store your auth data
  [apiSlice.reducerPath]: apiSlice.reducer, // API slice if you're using RTK Query
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
    }).concat(apiSlice.middleware), // Add RTK Query middleware if needed
});

// Type for the root state
export type RootState = ReturnType<typeof rootReducer>;

const persistor = persistStore(store); // Persist the store

export { store, persistor };
