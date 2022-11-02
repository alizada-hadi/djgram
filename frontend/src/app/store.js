import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../features/gallery/gallerySlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    users: usersReducer,
  },
});
