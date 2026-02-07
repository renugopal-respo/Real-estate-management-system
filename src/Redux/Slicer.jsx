import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    viewedProperty: 0,
    favorites: [],
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
     
    getPropertyById:(state,action)=>{
      const property=state.properties.filter(item=>item.id===action.payload);
      return property;
    },
    addToFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },

    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.property_id !== action.payload
      );
    },
    removeAllFavorites:(state,action)=>{
      state.favorites=[];
    }
  },
  
});

export const {
  addProperties,
  deleteProperties,
  nextPage,
  prevPage,
  addToFavorites,
  removeFromFavorites,
  removeAllFavorites,
  setViewedProperty,
} = propertySlice.actions;

export default propertySlice.reducer;
