import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { PostProps } from "types/contexTypes"
import { getPosts, getPostById, updatePost } from "./post_action_creators"

export interface PostsState {
    posts: PostProps[],
    currentPost: PostProps | null,
    loading: boolean,
    error: string
}

const initialState: PostsState = {
    posts: [],
    currentPost: null,
    loading: false,
    error: ''
}

export const postsSlice: any = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        changeLike: (state, action) => {
            state.posts.map(post => (post._id === action.payload._id) ? post.likes = action.payload.likes : post)
            if (state.currentPost) state.currentPost.likes = action.payload.likes
        },
        setCurrentPost: (state, action) => {
            state.currentPost = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.fulfilled.type, (state, action: PayloadAction<PostProps[]>) => {
            state.loading = false;
            state.error = '';
            state.posts = action.payload;
        })
        .addCase(getPosts.pending.type, (state) => {
            state.loading = true;
        })
        .addCase(getPosts.rejected.type, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getPostById.fulfilled.type, (state, action: PayloadAction<PostProps>) => {
            state.loading = false;
            state.error = '';
            state.currentPost = action.payload;
        })
        .addCase(getPostById.pending.type, (state) => {
            state.loading = true;
        })
        .addCase(getPostById.rejected.type, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updatePost.fulfilled.type, (state, action: PayloadAction<PostProps>) => {
            state.loading = false;
            state.error = '';
            state.currentPost = action.payload;
        })
        .addCase(updatePost.rejected.type, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
})
export const {removePost, addPost, changeLike, setCurrentPost } = postsSlice.actions
export default postsSlice.reducer