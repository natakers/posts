import { createContext } from "react";
import { UserContexProps } from "types/contexTypes";

export const initialUser = {
        name: '',
        email: '',
        avatar: '',
        about: '',
        group: '',
        _id: ''
}
const initialState = {
    user: initialUser, 
    isLoading: false, 
    handleUpdateUser: () => {},
    handleUpdateAvatar: () => {}, 
    token: '', 
    setToken: () => {}, 
    handleDeleteUser: () => {}
}

export const UserContext = createContext<UserContexProps>(initialState);
UserContext.displayName = 'UserContext';
