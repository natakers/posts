import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "Api";
import { UserSignIn } from "components/Modal/ModalSignIn";
import { UserSignUp } from "components/Modal/ModalSignUp";
export interface SelfError {
    response: {
        data: {
            message: string
        }
    }
}

export const getUserInfo = createAsyncThunk(
    'user/getInfo',
    async (_, thunkAPI) => {
        const res = await api.getUserInfo().then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message))
        return res
    }
) 
export const singUpUser = createAsyncThunk(
    'user/singUp',
    async (data: UserSignUp, thunkAPI) => {
        const res = await api.singUpUser(data).then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message))
        return res
    },
)
export const singInUser = createAsyncThunk(
    'user/singIn',
    async (data: UserSignIn, thunkAPI) => {
        const res = await api.singInUser(data).then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message))
        return res
    },
)
export const setUserInfo = createAsyncThunk(
    'user/setInfo',
    async (data: {name: string, about: string}, thunkAPI) => {
        const res = await api.setUserInfo(data).then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message))
        return res
    },
)
export const setUserAvatar = createAsyncThunk(
    'user/setUserAvatar',
    async (data: string, thunkAPI) => {
        const res = await api.setUserAvatar(data).then(res => res.data ).catch((res: SelfError) => thunkAPI.rejectWithValue(res.response.data.message))
        return res
    },
)