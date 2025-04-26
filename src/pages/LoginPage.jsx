import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Container,
    Paper,
    Avatar,
    CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin, error, loading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(email, password);
            navigate('/home');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper
                elevation={3}
                sx={{
                    mt: 8,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 3,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Вход
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Войти'}
                    </Button>

                    <Typography
                        variant="body2"
                        sx={{ textAlign: 'center', mt: 2 }}
                    >
                        Нет аккаунта?{' '}
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            Зарегистрируйтесь
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginPage;