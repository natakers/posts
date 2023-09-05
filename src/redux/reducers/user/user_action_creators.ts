import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "Api";

export const getUserInfo = createAsyncThunk(
    'user/getInfo',
    async () => {
        const res = await api.getUserInfo()
        console.log(res);
        return res
        
    }
) 