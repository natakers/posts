import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserProps } from "types/contexTypes"
import { getUserInfo } from "./user_action_creators"


interface UsersState {
    user: UserProps | null,
    loading: boolean,
    error: string
}

const initialState: UsersState = {
    user: null,
    loading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [getUserInfo.fulfilled.type]: (state, action: PayloadAction<UserProps>) => {
            state.loading = false;
            state.error = '';
            state.user = action.payload;
        },
        [getUserInfo.pending.type]: (state) => {
            state.loading = true;
        },
        [getUserInfo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

const userReducer = userSlice.reducer
export default userReducer