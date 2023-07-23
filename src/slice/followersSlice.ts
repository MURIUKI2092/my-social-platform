import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FollowersState {
  followerIds: number[]; // An array to store follower IDs
}

const initialState: FollowersState = {
  followerIds: [],
};

const followersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {
    addFollower: (state, action: PayloadAction<number>) => {
      state.followerIds.push(action.payload);
    },
    removeFollower: (state, action: PayloadAction<number>) => {
      state.followerIds = state.followerIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { addFollower, removeFollower } = followersSlice.actions;
export default followersSlice.reducer;
