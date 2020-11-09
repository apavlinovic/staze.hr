import { createContext } from 'react';
import { User } from '../../../types';

interface AuthContextState {
    isLoggedIn: boolean;
    token: string | null;
    currentUser: User | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const initialState: AuthContextState = {
    isLoggedIn: false,
    token: null,
    currentUser: null,

    login(user: User, token: string) {
        this.currentUser = user;
        this.isLoggedIn = true;
        this.token = token;
    },

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.token = null;
    },
};

export const AuthContext = createContext<AuthContextState>(initialState);
