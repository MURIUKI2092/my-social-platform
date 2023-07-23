//@redux-tool-kit
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

//@api
import { baseUrl } from "../api/api";
//@types
import { UserProps } from "../model/type";

interface Props {
  userItems: UserProps[];
}

const initialState: Props = {
  userItems: [],
};

//get users
export const getUsers = createAsyncThunk<UserProps[]>(
  "users/getUsers",
  async () => {
    const response = await baseUrl.get("/users");
    return response?.data;
  }
);
const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Implement the addUser reducer here to update the state with new posts
    addUser: (state: Props, action: PayloadAction<UserProps>) => {
      state.userItems.push(action.payload); // Update postItems array with the new post
    },
    blockUser: (
      state: Props,
      action: PayloadAction<{
        userId: number | undefined | string;
      }>
    ) => {
      const { userId } = action.payload;

      // Find the user with the specified userId in state.userItems
      const singleItem = state.userItems.find((item) => item.id === userId);

      // Return early if the user is not found
      if (!singleItem) {
        return;
      }

      // Create an updated user object with isBlocked set to true
      const updatedUser = {
        ...singleItem,
        isBlocked: true,
      };

      // Find the index of the user with the specified userId in state.userItems
      const index = state.userItems.findIndex((user) => user.id === userId);

      // If the user is found in state.userItems, update the user at the specific index
      if (index !== -1) {
        state.userItems[index] = updatedUser;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.userItems = action.payload; // Update the state with fetched posts
    });
    // Add additional extraReducers here if needed
  },
});

export const { addUser, blockUser } = UsersSlice.actions;
export default UsersSlice.reducer;
