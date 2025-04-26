import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Link,
} from '@mui/material';
import { login, register } from '../api/auth';

function AuthForm({ type }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === 'login') {
                await login(email, password);
            } else {
                await register(email, password, username);
            }
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                mx: 'auto',
                mt: 8,
                p: 4,
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" component="h1" color="primary">
                {type === 'login' ? 'Вход' : 'Регистрация'}
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {type === 'register' && (
                <TextField
                    label="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    required
                />
            )}

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
            />

            <TextField
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
            />

            <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
            >
                {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
                {type === 'login' ? (
                    <>Нет аккаунта? <Link href="/register">Зарегистрируйтесь</Link></>
                ) : (
                    <>Есть аккаунт? <Link href="/login">Войдите</Link></>
                )}
            </Typography>
        </Box>
    );
}

export default AuthForm;