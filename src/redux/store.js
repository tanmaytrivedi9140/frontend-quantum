// store.js
import { combineReducers } from "redux";
import userReducer from "./userslice";
import emailReducer from "./emailslice";
import { configureStore } from "@reduxjs/toolkit";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  email: emailReducer,
  // Add other reducers here if needed
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
