import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { scfoxes } from "../utils";

export const getTrending = createAsyncThunk(
  "trending/getTrending",
  async () => {
    const { data } = await scfoxes(`${process.env.REACT_APP_FOXES_SKY}/videos`);
    data.sort((a, b) => b.views - a.views);
    return data;
  }
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getTrending.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export default trendingSlice.reducer;
