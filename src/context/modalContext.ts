import { createContext } from "react";
import { ModalContexProps } from "types/contexTypes";

const initialState = {
        open: false, 
        type: '', 
        setOpen: () => {},
        handleOpen: () => {}, 
        secondType: '', 
        setType: () => {}, 
        setCards: () => {},
        handleClose: () => {}, 
}

export const ModalContext = createContext<ModalContexProps>(initialState);
ModalContext.displayName = ' ModalContext';