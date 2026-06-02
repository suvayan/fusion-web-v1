// src/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlice";
import commonReducer from "./slices/commonSlice";
import paymentProcessReducer from "./slices/paymentProcessSlice";

// Persist config only for the auth slice
const authPersistConfig = {
    key: "auth",
    storage,
};

// Only wrap auth with persistReducer
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer, // NOT persisted
    payment: paymentReducer, // NOT persisted
    common: commonReducer, // NOT persisted
    paymentProcess: paymentProcessReducer //NOT persisted
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        // Ignore redux-persist action types in serializable check
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);