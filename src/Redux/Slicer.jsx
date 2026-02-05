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
      state.properties = [...state.properties,...action.payload];
     console.log("Property addedd:",state.properties);
     console.log("action payload:",action.payload);
    },
    
    deleteProperties:(state)=>{
      state.properties=[];
    },

    addToFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload.data];
    },

    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.property_id !== action.payload.data.property_id
      );
    },

  },
});

export const {
  addProperties,
  deleteProperties,
  nextPage,
  prevPage,
  addToFavorites,
  removeFromFavorites,
  setViewedProperty,
} = propertySlice.actions;

export default propertySlice.reducer;
