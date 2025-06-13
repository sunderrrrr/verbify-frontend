'use client';
import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    useMediaQuery,
    keyframes,
    styled,
    TextField,
    Tabs,
    Tab,
    Card,
    CardContent,
    CircularProgress,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FadeContainer = styled(Box)(({ theme }) => ({
    animation: `${fadeIn} 0.5s ease-out both`
}));

export default function ProfilePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [tab, setTab] = useState(0);
    const [loadingStats, setLoadingStats] = useState(true);
    const [stats, setStats] = useState({
        registeredAt: '2024-04-12',
        totalQuestions: 87,
        essaysChecked: 12,
        currentPlan: 'Базовая'
    });

    const [plans, setPlans] = useState([
        {
            name: 'Базовая',
            description: '15 вопросов в день, 3 проверки сочинения, реклама',
            price: 0,
            active: true
        },
        {
            name: 'Премиум',
            description: '25 вопросов в день, 6 проверок, без рекламы',
            price: 400,
            active: false
        },
        {
            name: 'Ультра',
            description: 'Бесконечные вопросы, 10 проверок, тест-система',
            price: 1000,
            active: false
        }
    ]);

    useEffect(() => {
        // Имитация запроса на сервер
        setTimeout(() => {
            setLoadingStats(false);
        }, 1000);
    }, []);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <FadeContainer>
                <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
                    Профиль и настройки
                </Typography>

                <Tabs
                    value={tab}
                    onChange={(_, newValue) => setTab(newValue)}
                    centered
                    variant="scrollable"
                    allowScrollButtonsMobile
                    sx={{ mb: 3 }}
                >
                    <Tab label="Настройки" />
                    <Tab label="Статистика" />
                    <Tab label="Подписка" />
                </Tabs>
            </FadeContainer>

            {tab === 0 && (
                <FadeContainer>
                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
                        gap={4}
                        width="100%"
                    >
                        {/* Смена пароля */}
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                p: 3,
                                borderRadius: 2,
                                boxShadow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Сменить пароль
                            </Typography>
                            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                                <TextField fullWidth label="Введите вашу почту" />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ minWidth: { xs: '100%', sm: '160px' } }}
                                >
                                    Сбросить
                                </Button>
                            </Box>
                        </Box>

                        {/* Интерфейс */}
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                p: 3,
                                borderRadius: 2,
                                boxShadow: 1,
                                width: '100%',
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Интерфейс
                            </Typography>
                            <Typography variant="subtitle2" mb={1}>
                                Тема
                            </Typography>
                            <RadioGroup defaultValue="light" row>
                                <FormControlLabel value="light" control={<Radio />} label="Светлая" />
                                <FormControlLabel value="dark" control={<Radio />} label="Тёмная" />
                            </RadioGroup>
                        </Box>

                        {/* Управление уведомлениями */}
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                p: 3,
                                borderRadius: 2,
                                boxShadow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Уведомления
                            </Typography>
                            <Button variant="outlined" fullWidth>
                                Управление уведомлениями
                            </Button>
                        </Box>

                        {/* Дополнительно */}
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                p: 3,
                                borderRadius: 2,
                                boxShadow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Дополнительно
                            </Typography>
                            <Button variant="outlined" color="error" fullWidth>
                                Удалить аккаунт
                            </Button>
                        </Box>
                    </Box>
                </FadeContainer>
            )}


            {tab === 1 && (
                <FadeContainer>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                        Статистика аккаунта
                    </Typography>
                    {loadingStats ? (
                        <Box display="flex" justifyContent="center" mt={4}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
                            <Card>
                                <CardContent>
                                    <Typography fontWeight={600}>Дата регистрации</Typography>
                                    <Typography color="text.secondary">{stats.registeredAt}</Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography fontWeight={600}>Всего заданий</Typography>
                                    <Typography color="text.secondary">{stats.totalQuestions}</Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography fontWeight={600}>Проверенных сочинений</Typography>
                                    <Typography color="text.secondary">{stats.essaysChecked}</Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography fontWeight={600}>Текущий план</Typography>
                                    <Typography color="text.secondary">{stats.currentPlan}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                </FadeContainer>
            )}

            {tab === 2 && (
                <FadeContainer>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                        Тарифные планы
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {plans.map((plan) => (
                            <Card
                                key={plan.name}
                                sx={{
                                    backgroundColor: plan.active
                                        ? theme.palette.primary.light
                                        : theme.palette.background.paper,
                                    border: plan.active ? `2px solid ${theme.palette.primary.main}` : '1px solid #ccc'
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600}>
                                        {plan.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mb={2}>
                                        {plan.description}
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {plan.price === 0 ? 'Бесплатно' : `${plan.price} ₽/мес`}
                                    </Typography>
                                    {!plan.active && (
                                        <Button
                                            variant="contained"
                                            sx={{ mt: 2 }}
                                            onClick={() => alert(`Оформление: ${plan.name}`)}
                                        >
                                            Оформить
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </FadeContainer>
            )}
        </Container>
    );
}
