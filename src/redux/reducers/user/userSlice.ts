import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserProps } from "types/contexTypes"
import { getUserInfo, setUserInfo, singInUser, setUserAvatar  } from "./user_action_creators"


export interface UsersState {
    currentUser: UserProps | null,
    token: string,
    loading: boolean,
    error: string
}

const initialState: UsersState = {
    currentUser: null,
    token: '',
    loading: false,
    error: ''
}
const tokenJson = localStorage.getItem('tokenPost');
if (tokenJson !== null) {
    initialState.token = tokenJson
}  

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        exitUser: (state) => {
            state.token = ''
            localStorage.setItem("tokenPost", "");
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserInfo.fulfilled.type, (state, action: PayloadAction<UserProps>) => {
            state.loading = false;
            state.error = '';
            state.currentUser = action.payload;
        })
        .addCase(getUserInfo.pending.type, (state) => {
            state.loading = true;
        })
        .addCase(getUserInfo.rejected.type, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(singInUser.fulfilled.type, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = '';
            state.token = action.payload.token;
            localStorage.setItem('tokenPost', action.payload.token)
        })
        .addCase(singInUser.pending.type, (state) => {
            state.loading = true;
        })
        .addCase(singInUser.rejected.type, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(setUserInfo.fulfilled.type, (state, action: PayloadAction<UserProps>) => {
            state.loading = false;
            state.error = '';
            state.currentUser = action.payload;
        })
        .addCase(setUserInfo.pending.type, (state) => {
            state.loading = true;
        })
        .addCase(setUserInfo.rejected.type, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(setUserAvatar.fulfilled.type, (state, action: PayloadAction<UserProps>) => {
            state.loading = false;
            state.error = '';
            state.currentUser = action.payload;
        })
        .addCase(setUserAvatar.pending.type, (state) => {
            state.loading = true;
        })
        .addCase(setUserAvatar.rejected.type, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { setToken, exitUser } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer