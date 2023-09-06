import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "Api";
import { AxiosError } from "axios";

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, thunkAPI) => {
        const res = await api.getPostList().then(res => res.data ).catch((res: AxiosError) => thunkAPI.rejectWithValue(res.message)) 
        return res    
    }
) 