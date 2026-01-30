import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    subscribedProperty: [],
    viewedProperty: 0,
    favorites: [],
    page: 1,
    totalPage: 1,
    loading: false,
  },
  reducers: {
    addProperties: (state, action) => {
      state.properties = [...state.properties, ...action.payload.data];
      state.totalPage = action.payload.totalPage;
    },

    nextPage: (state) => {
        state.page += 1;
      
    },

    prevPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },

    addToFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload.data];
    },

    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.property_id !== action.payload.data.property_id
      );
    },

    setViewedProperty: (state, action) => {
      state.viewedProperty = action.payload.data.property_id;
    },
  },
});

export const {
  addProperties,
  nextPage,
  prevPage,
  addToFavorites,
  removeFromFavorites,
  setViewedProperty,
} = propertySlice.actions;

export default propertySlice.reducer;
