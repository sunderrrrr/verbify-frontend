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
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { handleRegister, error, loading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRegister(email, password, username);
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <PersonAddOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Регистрация
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
                        label="Имя пользователя"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

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
                        autoComplete="new-password"
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
                        {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
                    </Button>

                    <Typography
                        variant="body2"
                        sx={{ textAlign: 'center', mt: 2 }}
                    >
                        Уже есть аккаунт?{' '}
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            Войдите
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default RegisterPage;