import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { PostProps } from "types/contexTypes"
import { getPosts } from "./post_action_creators"

interface PostsState {
    posts: PostProps[],
    loading: boolean,
    error: string
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: ''
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [getPosts.fulfilled.type]: (state, action: PayloadAction<PostProps[]>) => {
            state.loading = false;
            state.error = '';
            state.posts = action.payload;
        },
        [getPosts.pending.type]: (state) => {
            state.loading = true;
        },
        [getPosts.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default postsSlice.reducer