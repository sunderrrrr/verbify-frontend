'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField,Link, Typography, Container, Box, Stack, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import apiClient from '../../_config/api';
import { useAuthStore } from '../../_stores/authStore';
import { motion } from 'framer-motion';
import { Google, GitHub } from '@mui/icons-material';
import NextLink from 'next/link';
import theme from '../../_config/theme';
import config from '../../_config/app';
import Image from "next/image";
const schema = z.object({
    email: z.string().email('Неправильная почта').min(1, 'Required'),
    password: z.string().min(8, 'Минимум 8 символов'),
});

const MotionButton = motion.create(Button);

export default function LoginPage() {
    const { setAuth } = useAuthStore();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await apiClient.post(config.api.endpoints.login, data);
            setAuth(response.data.token, data.email);
        } catch (error) {
            console.error('Ошибка логина:', error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ py: 8 }}>
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    boxShadow: 3,
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        alignItems: 'center', // Вертикальное выравнивание по центру
                        justifyContent: 'center', // Горизонтальное выравнивание по центру
                        gap: 0, // Отступ между элементами
                        fontWeight: 700,
                        background: theme.palette.primary.main,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2
                    }}
                >
                    WhyAI
                    <Image
                        src="/whyai-logo-primary.png"
                        alt="WhyAI Logo"
                        width={65}
                        height={65}
                        priority
                        style={{
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                            // Убираем наследование текстовых стилей
                            margin: 0,
                            padding: 0
                        }}
                    />
                </Typography>

                <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Почта"
                        variant="filled"
                        InputProps={{ disableUnderline: true }}
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message?.toString()}
                        sx={{
                            '& .MuiFilledInput-root': {
                                borderRadius: 1,
                                bgcolor: 'background.default'
                            }
                        }}
                    />

                    <TextField
                        label="Пароль"
                        type="password"
                        variant="filled"
                        InputProps={{ disableUnderline: true }}
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message?.toString()}
                        sx={{
                            '& .MuiFilledInput-root': {
                                borderRadius: 2,
                                bgcolor: 'background.default'
                            }
                        }}
                    />

                    <MotionButton
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        sx={{
                            height: 48,
                            borderRadius: 2,
                            fontWeight: 600,
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            }
                        }}
                    >
                        {isSubmitting ? 'Входим...' : 'Войти'}
                    </MotionButton>

                    <Divider sx={{ color: 'text.secondary' }}>Другие варианты:</Divider>

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            variant="outlined"
                            startIcon={<Google />}
                            sx={{
                                flex: 1,
                                borderRadius: 2,
                                textTransform: 'none',
                                py: 1.5
                            }}
                        >
                            Google
                        </Button>


                    </Stack>

                    <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                        Ты новенький?{' '}
                        <Link
                            component={NextLink}
                            href="/register"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Зарегестрируйся
                        </Link>
                    </Typography>
                </Stack>
            </Box>
        </Container>
    );
}