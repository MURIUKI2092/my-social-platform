// singleUserSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "../model/type";

interface SingleUserState {
  user: UserProps | null;
}

const initialState: SingleUserState = {
  user: null,
};

const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  reducers: {
    setSingleUser: (state, action: PayloadAction<UserProps | null>) => {
      state.user = action.payload;
    },
    updateUserPremium: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.isPremium = action.payload;
      }
    },
    updateUserIsBlocked: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.isBlocked = action.payload;
      }
    },
  },
});

export const { setSingleUser, updateUserPremium, updateUserIsBlocked } =
  singleUserSlice.actions;
export default singleUserSlice.reducer;
