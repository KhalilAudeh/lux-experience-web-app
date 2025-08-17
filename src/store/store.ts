import { configureStore } from "@reduxjs/toolkit";
import filmDetailsSlice from "./filmDetailsSlice";
import filmsSlice from "./filmsSlice";
import wishlistSlice from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    films: filmsSlice,
    filmDetails: filmDetailsSlice,
    wishlistData: wishlistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
