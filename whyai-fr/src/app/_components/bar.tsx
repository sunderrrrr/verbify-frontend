'use client';
import { AppBar as MuiAppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuthStore } from '../_stores/authStore';
import NextLink from 'next/link';
import Image from 'next/image';
import config from '../_config/app';

export default function AppBar() {
    const { token } = useAuthStore();

    return (
        <MuiAppBar position="static" elevation={0}>
            <Toolbar>
                <Image
                    src="/whyai-logo (1).png" // Путь от корня public
                    alt="PlantCare Logo"
                    width={60} // Оптимальный размер для PNG
                    height={60}
                    priority // Приоритетная загрузка
                    style={{
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                />
                {!token ? (
                    <>
                        <Button color="inherit" component={NextLink} href="/login">Вход</Button>
                        <Button color="inherit" component={NextLink} href="/register">Регистрация</Button>
                    </>
                ) : (
                    <Button color="inherit" component={NextLink} href="/">Home</Button>
                )}
            </Toolbar>
        </MuiAppBar>
    );
}