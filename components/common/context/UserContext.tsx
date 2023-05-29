import React, { createContext, useContext } from 'react';
import { IGetUserDetails } from '@/services/user';

export interface IUserContext {
    data: IGetUserDetails | undefined;
    mutate: () => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    visible: boolean;
}

const initialState = {
    data: undefined,
    mutate: () => {},
    setVisible: () => {},
    visible: false,
};

const UserContext = createContext<IUserContext>(initialState);

export const useUserContext: () => IUserContext = () => useContext(UserContext);

export default UserContext;
