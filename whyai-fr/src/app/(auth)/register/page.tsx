'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField,Divider, Typography, Container, Box, Stack, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import apiClient from '../../_config/api';
import { Google, GitHub } from '@mui/icons-material';
import config from '../../_config/app';
import Image from "next/image";
import theme from "@/app/_config/theme";
const schema = z.object({
    email: z.string().email('Некорректный email').min(1, 'Обязательное поле'),
    password: z.string()
        .min(8, 'Минимум 8 символов')
        .regex(/[A-Z]/, 'Должна быть заглавная буква')
        .regex(/[0-9]/, 'Должна быть цифра'),
    name: z.string().min(1, 'Обязательное поле'),
});

const MotionButton = motion(Button);
const MotionBox = motion(Box);

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            await apiClient.post(config.api.endpoints.register, data);
            window.location.href = '/login';
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ py: 8 }}>
            <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                sx={{
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    boxShadow: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: -60,
                        left: -60,
                        width: 120,
                        height: 120,
                        bgcolor: 'primary.light',
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                        zIndex: -1,
                    }
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        alignItems: 'center', // Вертикальное выравнивание по центру
                        justifyContent: 'center', // Горизонтальное выравнивание по центру
                        gap: 1, // Отступ между элементами
                        fontWeight: 700,
                        background: theme.palette.primary.main,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2
                    }}
                >
                    {process.env.NEXT_PUBLIC_APP_NAME}
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
                        label="Email"
                        variant="filled"

                        InputProps={{ disableUnderline: true }}
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message?.toString()}
                        sx={{
                            '& .MuiFilledInput-root': {
                                borderRadius: 2,
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

                    <TextField
                        label="Имя"
                        type="text"
                        variant="filled"
                        InputProps={{ disableUnderline: true }}
                        {...register('name')}
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
                        whileHover={{
                            scale: 1.02,
                            boxShadow: '0 4px 12px rgba(103, 80, 164, 0.2)'
                        }}
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
                        {isSubmitting ? (
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                ↻
                            </motion.span>
                        ) : (
                            'Зарегистрироваться'
                        )}
                    </MotionButton>

                    <Divider sx={{ color: 'text.secondary' }}>или</Divider>

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            variant="outlined"
                            startIcon={<Google />}
                            component={motion.div}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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
                        Уже есть аккаунт?{' '}
                        <Link
                            component={NextLink}
                            href="/login"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Войти
                        </Link>
                    </Typography>
                </Stack>
            </MotionBox>
        </Container>
    );
}