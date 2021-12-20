import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { scfoxes } from "../utils";

export const getHistory = createAsyncThunk("history/getHistory", async () => {
  const { data } = await scfoxes(`${process.env.REACT_APP_FOXES_SKY}/users/history`);
  return data;
});

const historySlice = createSlice({
  name: "history",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getHistory.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export default historySlice.reducer;
