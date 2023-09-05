import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "Api";

export const getPosts = createAsyncThunk(
    'posts/get',
    async () => {
        const res = await api.getPostList()
        console.log(res);
        return res
        
    }
) 