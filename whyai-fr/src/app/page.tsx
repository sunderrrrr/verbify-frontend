'use client';
import { Button, Typography, Container } from '@mui/material';
import AuthGuard from './_components/authGuard';
import { useAuthStore } from './_stores/authStore';

export default function HomePage() {
    const { user, logout } = useAuthStore();

    return (
        <AuthGuard>
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Typography variant="h3" gutterBottom>
                    Welcome, {user?.email}
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={logout}
                >
                    Logout
                </Button>
            </Container>
        </AuthGuard>
    );
}