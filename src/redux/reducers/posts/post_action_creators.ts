import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "Api";
import { PostPostProps } from "components/Modal/ModalPost";
import { changeLike } from "./postsSlice";
import { SelfError } from "../user/user_action_creators";

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, thunkAPI) => {
        const res = await api.getPostList().then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message)) 
        return res    
    }
)

export const getPostById = createAsyncThunk(
    'posts/getPost',
    async (id: string, thunkAPI) => {
        const res = await api.getPostById(id).then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message)) 
        return res    
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({id, data}: {id: string, data: PostPostProps}, thunkAPI) => {
        const res = await api.updatePost(id, data).then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message)) 
        return res    
    }
)
export const postPost = createAsyncThunk(
    'posts/postPost',
    async ( data: PostPostProps, thunkAPI) => {
        const res = await api.postPost(data).then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message)) 
        return res    
    }
)
export const changeLikePostStatus = createAsyncThunk(
    'posts/changeLike',
    async ( {postID, like}: {postID: string, like: boolean}, {rejectWithValue, dispatch}) => {
        const res = await api.changeLikePostStatus(postID, like).then(res => res.data ).catch((res: SelfError) => rejectWithValue(res.response.data.message)) 
        dispatch(changeLike(res))
        return res
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async ( postID: string, thunkAPI) => {
        const res = await api.deletePost(postID).then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message))
        return res 
    }
)