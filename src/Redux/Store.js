// store.js
import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./Slicer";

const Store = configureStore({
  reducer: {
    properties: propertyReducer,
  },
});

export default Store;
