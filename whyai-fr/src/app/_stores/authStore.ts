import { create } from 'zustand';
import Cookies from 'js-cookie';

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string) => void;
    logout: () => void;
    initialize: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
    token: null,
    isAuthenticated: false,

    // Инициализация состояния при загрузке
    initialize: () => {
        const token = Cookies.get('authToken');
        if (token) {
            set({ token, isAuthenticated: false });
        }
    },

    // Установка авторизации
    setAuth: (token) => {
        Cookies.set('authToken', token, {
            expires: 0.5,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        Cookies.set('isAuthenticated', "1", {
            expires: 0.5,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        set({ token, isAuthenticated: true });
    },

    // Выход из системы
    logout: () => {
        Cookies.remove('authToken');
        Cookies.set('isAuthenticated', "0", {
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
    }
}));