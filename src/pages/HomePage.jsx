import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Avatar,
    Container,
} from '@mui/material';
import { getAuthData, clearAuthData } from '../utils/storage';
import { getUserData } from '../api/user';

function HomePage() {
    const { token } = getAuthData();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const userData = await getUserData();
                setUser(userData);
            } catch (err) {
                console.error('Ошибка загрузки данных:', err);
                clearAuthData();
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token, navigate]);

    const handleLogout = () => {
        clearAuthData();
        navigate('/login');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        bgcolor: 'primary.main',
                        fontSize: 40,
                    }}
                >
                    {user?.username?.charAt(0).toUpperCase()}
                </Avatar>

                <Typography variant="h4" component="h1">
                    Добро пожаловать, {user?.username}!
                </Typography>

                <Button
                    onClick={handleLogout}
                    variant="outlined"
                    color="primary"
                    size="large"
                >
                    Выйти
                </Button>
            </Box>
        </Container>
    );
}

export default HomePage;