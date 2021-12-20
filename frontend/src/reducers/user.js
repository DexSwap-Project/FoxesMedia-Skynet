import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticate } from "../utils";

export const skyconnect = createAsyncThunk(
  "user/skyconnect",
  async ({ payload }) => {
    const user = await authenticate("skyconnect", payload );

    if (user.token) {
      
      return user;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {
    addChannel(state, action) {
      state.data = {
        ...state.data,
        channels: [action.payload, ...state.data.channels],
      };
    },
    removeChannel(state, action) {
      state.data = {
        ...state.data,
        channels: state.data.channels.filter(
          (channel) => channel.id !== action.payload
        ),
      };
    },
    updateUser(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    logingOut(state, action) {
      state.data = {};
    },
  },
  extraReducers: {
    [skyconnect.fulfilled]: (state, action) => {
      state.data = action.payload || {};
    },
  },
});

export const {
  addChannel,
  removeChannel,
  updateUser,
  logingOut,
} = userSlice.actions;

export default userSlice.reducer;
