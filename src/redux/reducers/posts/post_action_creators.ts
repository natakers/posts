import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "Api";
import { AxiosError } from "axios";
import { PostPostProps } from "components/Modal/ModalPost";
import { removePost, addPost, changeLike } from "./postsSlice";

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, thunkAPI) => {
        const res = await api.getPostList().then(res => res.data ).catch((res: AxiosError) => thunkAPI.rejectWithValue(res.message)) 
        return res    
    }
)

export const getPostById = createAsyncThunk(
    'posts/getPost',
    async (id: string, thunkAPI) => {
        const res = await api.getPostById(id).then(res => res.data ).catch((res: AxiosError) => thunkAPI.rejectWithValue(res.message)) 
        return res    
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({id, data}: {id: string, data: PostPostProps}, thunkAPI) => {
        const res = await api.updatePost(id, data).then(res => res.data ).catch((res: AxiosError) => thunkAPI.rejectWithValue(res.message)) 
        return res    
    }
)
export const postPost = createAsyncThunk(
    'posts/postPost',
    async ( data: PostPostProps, {rejectWithValue, dispatch}) => {
        const res = await api.postPost(data).then(res => res.data ).catch((res: AxiosError) => rejectWithValue(res.message)) 
        dispatch(addPost(res))
        return res    
    }
)
export const changeLikePostStatus = createAsyncThunk(
    'posts/changeLike',
    async ( {postID, like}: {postID: string, like: boolean}, {rejectWithValue, dispatch}) => {
        const res = await api.changeLikePostStatus(postID, like).then(res => res.data ).catch((res: AxiosError) => rejectWithValue(res.message)) 
        dispatch(changeLike(res))
        return res
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async ( postID: string, {rejectWithValue, dispatch}) => {
        const res = await api.deletePost(postID).catch((res: AxiosError) => rejectWithValue(res.message))
        dispatch(removePost(postID))
        return res 
    }
)