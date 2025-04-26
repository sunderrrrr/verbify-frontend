import { useState } from 'react';
import { login, register } from '../api/auth';
import { setAuthData } from '../utils/storage';

export const useAuth = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            const { token } = await login(email, password);
            setAuthData(token);
            return token;
        } catch (err) {
            setError(err.response?.data?.message || 'Неверный email или пароль');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (email, password, username) => {
        setLoading(true);
        try {
            const { token } = await register(email, password, username);
            setAuthData(token);
            return token;
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка регистрации');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, handleRegister, error, loading };
};