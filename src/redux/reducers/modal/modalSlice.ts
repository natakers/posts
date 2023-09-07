import { createSlice } from "@reduxjs/toolkit"

export interface ModalState {
    open: boolean, 
    type: string, 
    secondType: string, 
}

const initialState: ModalState = {
    open: false, 
    type: '', 
    secondType: '', 
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setSecondType: (state, action) => {
            state.secondType = action.payload;
        },
        handleOpen: (state, action) => {
            state.type = action.payload.type;
            state.secondType = action.payload.secondType;
            state.open = true;
        },
        handleClose: (state) => {
            state.type = '';
            state.secondType = '';
            state.open = false;
        }
    },
})
export const {setOpen, setType, setSecondType, handleOpen, handleClose } = modalSlice.actions
export default modalSlice.reducer
