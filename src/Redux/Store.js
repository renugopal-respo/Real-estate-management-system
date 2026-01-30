// store.js
import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./Slicer";

const Store = configureStore({
  reducer: {
    properties: propertyReducer, //  slice reducer
  },
});

export default Store;
