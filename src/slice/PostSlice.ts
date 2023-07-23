import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

//@api
import { baseUrl } from "../api/api";
//@types
import { PostProps } from "../model/type";

interface Props {
  postItems: PostProps[]; // Change this to PostProps if you want to store a single post
}

const initialState: Props = {
  postItems: [],
};

//get posts
const getPosts = createAsyncThunk<PostProps[]>("posts/getPosts", async () => {
  const response = await baseUrl.get("/posts");
  return response?.data; // Return response?.data directly (array of PostProps)
});

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Implement the addPost reducer here to update the state with new posts
    addPost: (state: Props, action: PayloadAction<PostProps>) => {
      state.postItems.push(action.payload); // Update postItems array with the new post
    },
    updatePost: (
      state: Props,
      action: PayloadAction<{
        postId: string | null | undefined;
        updatedPost: PostProps;
      }>
    ) => {
      const { postId, updatedPost } = action.payload;
      const index = state.postItems.findIndex((post) => post.id === postId);
      if (index !== -1) {
        state.postItems[index] = updatedPost;
      }
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.postItems = action.payload; // Update the state with fetched posts
    });
    // Add additional extraReducers here if needed
  },
});

export const { addPost, updatePost } = PostsSlice.actions;
export default PostsSlice.reducer;
