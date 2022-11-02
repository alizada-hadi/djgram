import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import galleryService from "./galleryService";

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async (thunkAPI) => {
    try {
      return await galleryService.fetch();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async (image, thunkAPI) => {
    try {
      return await galleryService.upload(image);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  images: [],
  progress: 0,
  selectedImage: null,
  status: "idle", // loading, succeeded, failed
  error: null,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    reset: (state) => {
      state.images = [];
      state.progress = 0;
      state.status = "idle";
      state.error = null;
    },

    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    diselectImage: (state) => {
      state.selectedImage = null;
    },
    resetProgress: (state) => {
      state.progress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(uploadImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = [...state.images, action.payload];
        state.progress = action.payload.progress;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllImages = (state) => state.images;
export const { reset, selectImage, diselectImage, resetProgress } =
  gallerySlice.actions;
export default gallerySlice.reducer;
