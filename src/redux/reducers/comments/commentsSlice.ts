import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CommentProps, PostProps } from "types/contexTypes"
import { deleteComment, getComments, postComment } from "./comments_action_creators"


export interface CommentsState {
    comments: CommentProps[],
    currentComment: CommentProps | null,
    loading: boolean,
    error: string
}

const initialState: CommentsState = {
    comments: [],
    currentComment: null,
    loading: false,
    error: ''
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setCurrentComment: (state, action) => {
            state.currentComment = action.payload 
        }   
    },
    extraReducers: (builder) => {
        builder
        .addCase(getComments.fulfilled.type, (state, action: PayloadAction<CommentProps[]>) => {
            state.loading = false;
            state.error = '';
            state.comments = action.payload.reverse();
        })
        .addCase(getComments.pending.type, (state) => {
            state.loading = true;
        })
        .addCase(getComments.rejected.type, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(postComment.fulfilled.type, (state, action: PayloadAction<PostProps>) => {
            state.loading = false;
            state.error = '';
            state.comments = action.payload.comments.reverse();
            
        })
        .addCase(postComment.pending.type, (state) => {
            state.loading = true;
        })
        .addCase(postComment.rejected.type, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteComment.fulfilled.type, (state, action: PayloadAction<PostProps>) => {
            state.loading = false;
            state.error = '';
            state.comments = action.payload.comments.reverse();
        })
        .addCase(deleteComment.pending.type, (state) => {
            state.loading = true;
        })
        .addCase(deleteComment.rejected.type, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })

    },
})
export const { setCurrentComment } = commentsSlice.actions
export default commentsSlice.reducer