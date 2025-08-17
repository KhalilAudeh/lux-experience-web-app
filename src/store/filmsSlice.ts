import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getFilmsByCategory } from "../services/filmAPI";
import type filmsInterface from "../types";

const initialState: filmsInterface = {
  isLoading: false,
  nowPlayingFilms: null,
  topRatedFilms: null,
  popularFilms: null,
};

// Async Thunk for fetching films
export const fetchFilmsByCategory = createAsyncThunk("films/fetchFilms", async ({ category }: { category: string }, { dispatch }) => {
  try {
    const data = await getFilmsByCategory(category);

    // Dispatch the data to the appropriate slice based on the category
    dispatch(setFilmsDataAction({ category, data }));

    return data;
  } catch (error) {
    console.error("Failed to fetch films: ", error);
  }
});

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilmsDataAction: (
      state,
      action: PayloadAction<{
        category: string;
        data: filmsInterface["popularFilms"];
      }>
    ) => {
      const { category, data } = action.payload;

      switch (category) {
        case "now_playing":
          state.nowPlayingFilms = data;
          break;

        case "top_rated":
          state.topRatedFilms = data;
          break;

        case "popular":
          state.popularFilms = data;
          break;

        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmsByCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFilmsByCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setFilmsDataAction } = filmsSlice.actions;

export default filmsSlice.reducer;
