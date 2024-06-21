// authProvider.ts
import axios from "axios";
import { AuthProvider } from "@refinedev/core";
import { AuthActionResponse, CheckResponse } from "@refinedev/core/dist/contexts/auth/types";

interface LoginParams {
    username: string;
    password: string;
}

export const authProvider: AuthProvider = {
    login: async ({ username, password }: LoginParams): Promise<AuthActionResponse> => {
        try {
            const response = await axios.post('http://localhost:8000/api/token/', { username, password });
            const { access, refresh } = response.data;
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            return Promise.resolve({ success: true });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: (): Promise<AuthActionResponse> => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
        return Promise.resolve({ success: true });
    },
    check: (): Promise<CheckResponse> => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return Promise.resolve({ authenticated: true });
        }
        return Promise.reject({ authenticated: false });
    },
    onError: (error: any): Promise<CheckResponse> => {
        if (error.response?.status === 401) {
            return Promise.resolve({ authenticated: false });
        }
        return Promise.reject(error);
    },
    getPermissions: (): Promise<any> => Promise.resolve(),
};