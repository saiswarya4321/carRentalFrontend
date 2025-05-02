import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveuser: (state, action) => {
      state.user = action.payload;
      
    },
    clearuser: (state) => {
      state.user = {};
    },
  },
});

export const { saveuser, clearuser } = userSlice.actions;
export default userSlice.reducer;
