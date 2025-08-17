import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Film } from "../types";
import { getFilmsDetails } from "../services/filmAPI";

interface FilmDetailsState {
  currentFilm: Film | null;
  isLoading: boolean;
}

const initialState: FilmDetailsState = {
  currentFilm: null,
  isLoading: false,
};

// Async Thunk for fetching films
export const fetchFilmDetails = createAsyncThunk("films/fetchFilmDetails", async ({ id }: { id: number }, { dispatch }) => {
  try {
    const data = await getFilmsDetails(id);

    // Dispatch the data to the appropriate slice
    dispatch(setFilmDetailsAction({ data }));

    return data;
  } catch (error) {
    console.error("Failed to fetch films: ", error);
  }
});

const filmDetailsSlice = createSlice({
  name: "filmDetails",
  initialState,
  reducers: {
    setFilmDetailsAction: (
      state,
      action: PayloadAction<{
        data: FilmDetailsState["currentFilm"];
      }>
    ) => {
      const { data } = action.payload;
      state.currentFilm = data;
    },
    clearCurrentFilm: (state) => {
      state.currentFilm = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmDetails.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFilmDetails.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setFilmDetailsAction, clearCurrentFilm } = filmDetailsSlice.actions;
export default filmDetailsSlice.reducer;
