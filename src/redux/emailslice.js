import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
};

const userEmail = createSlice({
  name: "email",
  initialState,
  reducers: {
    mail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { mail } = userEmail.actions;
export default userEmail.reducer;
