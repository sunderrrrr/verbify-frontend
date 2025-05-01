'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../_stores/authStore';
import { Logout } from '@mui/icons-material';
import theme from '../_config/theme';
export function LogoutButton() {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    // @ts-ignore
    return (
        <Button
            variant="text"
            color={theme.palette.primary.main}
            startIcon={<Logout fontSize="small" />}
            onClick={handleLogout}
            sx={{
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: 'errorContainer.main',

                }
            }}
        >

        </Button>
    );
}