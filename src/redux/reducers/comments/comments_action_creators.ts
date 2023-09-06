import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "Api";
import { AxiosError } from "axios";

export const getComments = createAsyncThunk(
    'comments/getComments',
    async (id: string, thunkAPI) => {
        const res = await api.getComments(id).then(res => res.data ).catch((res: AxiosError) => thunkAPI.rejectWithValue(res.message)) 
        return res    
    }
) 

export const postComment = createAsyncThunk(
    'comments/postComment',
    async ({id, text}: {id: string, text: string}, thunkAPI) => {
        const res = await api.postComment(id, text).then(res => res.data ).catch((res: AxiosError) => thunkAPI.rejectWithValue(res.message)) 
        return res    
    }
)

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async ({postID, commentID}: {postID: string, commentID: string}, thunkAPI) => {
        const res = await api.deleteComment(postID, commentID).then(res => res.data ).catch((res: AxiosError) => thunkAPI.rejectWithValue(res.message)) 
        return res    
    }
)
