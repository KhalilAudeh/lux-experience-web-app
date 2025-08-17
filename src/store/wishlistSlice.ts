import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Film } from "../types";

// Load initial state from localStorage
const loadWishlist = (): Film[] => {
  const savedData = localStorage.getItem("wishlist");
  return savedData ? JSON.parse(savedData) : [];
};

interface WishlistState {
  films: Film[];
}

const initialState: WishlistState = {
  films: loadWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add film to wishlist
    addToWishlist: (state, action: PayloadAction<Film>) => {
      // Prevent duplicates
      if (!state.films.some((film) => film.id === action.payload.id)) {
        state.films.push(action.payload);
      }
    },
    // Remove film from wishlist
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.films = state.films.filter((film) => film.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
