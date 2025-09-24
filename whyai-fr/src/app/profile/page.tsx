'use client';
import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    keyframes,
    styled,
    Tab,
    Tabs,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import {useTheme} from '@mui/material/styles';

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
        avgEssayScore: 72,
        chatQuestions: 348,
        essaysChecked: 14,
        lastEssayDate: '2025-09-12'
    });

    const [user, setUser] = useState({
        name: 'Иван Петров',
        email: 'ivan@example.com',
        goal: 'Сдать ЕГЭ на 90+'
    });

    const [plans, setPlans] = useState([
        {
            name: 'Базовая',
            description: '15 вопросов в день, 3 проверки сочинения, реклама',
            price: 0,
            active: true,
            badge: null
        },
        {
            name: 'Премиум',
            description: '25 вопросов в день, 6 проверок, без рекламы, доступ к AI-советам',
            price: 400,
            active: false,
            badge: '🔥 Популярно'
        },
        {
            name: 'Ультра',
            description: 'Безлимит, 10 проверок, расширенная аналитика, приоритетная проверка',
            price: 1000,
            active: false,
            badge: '⭐ Лучший выбор'
        }
    ]);

    const [goalDialogOpen, setGoalDialogOpen] = useState(false);
    const [newGoal, setNewGoal] = useState(user.goal);

    useEffect(() => {
        setTimeout(() => {
            setLoadingStats(false);
        }, 1000);
    }, []);

    const handleOpenGoalDialog = () => setGoalDialogOpen(true);
    const handleCloseGoalDialog = () => setGoalDialogOpen(false);
    const handleSaveGoal = () => {
        setUser(prev => ({ ...prev, goal: newGoal }));
        setGoalDialogOpen(false);
    };

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
                        {/* Основные данные */}
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                p: 3,
                                borderRadius: 2,
                                boxShadow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Основные данные
                            </Typography>
                            <Typography><strong>Имя:</strong> {user.name}</Typography>
                            <Typography><strong>Почта:</strong> {user.email}</Typography>
                            <Typography mb={2}><strong>Цель подготовки:</strong> {user.goal}</Typography>
                            <Button variant="outlined" onClick={handleOpenGoalDialog}>Обновить цель</Button>
                        </Box>

                        {/* Смена пароля */}
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
                                Сменить пароль
                            </Typography>
                            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                                <TextField fullWidth label="Введите вашу почту" />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ minWidth: { xs: '100%', sm: '160px' } }}
                                >
                                    Сбросить пароль
                                </Button>
                            </Box>
                        </Box>

                        {/* Уведомления */}
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
                                Уведомления
                            </Typography>
                            <FormControlLabel control={<Checkbox disabled />} label="Напоминания о заданиях (в разработке)" />
                            <FormControlLabel control={<Checkbox disabled />} label="Результаты проверок (в разработке)" />
                            <FormControlLabel control={<Checkbox disabled />} label="Новости сервиса (в разработке)" />
                        </Box>
                    </Box>

                    {/* Диалог для обновления цели */}
                    <Dialog open={goalDialogOpen} onClose={handleCloseGoalDialog}>
                        <DialogTitle>Обновить цель подготовки</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Новая цель"
                                type="text"
                                fullWidth
                                value={newGoal}
                                onChange={(e) => setNewGoal(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseGoalDialog}>Отмена</Button>
                            <Button variant="contained" onClick={handleSaveGoal}>Сохранить</Button>
                        </DialogActions>
                    </Dialog>
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
                                    <Typography fontWeight={600}>Средний балл по сочинениям</Typography>
                                    <Typography color="text.secondary">{stats.avgEssayScore} / 100</Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography fontWeight={600}>Вопросов в чате</Typography>
                                    <Typography color="text.secondary">{stats.chatQuestions}</Typography>
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
                                    <Typography fontWeight={600}>Дата последнего сочинения</Typography>
                                    <Typography color="text.secondary">{stats.lastEssayDate}</Typography>
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
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                        <Typography variant="h6" fontWeight={600}>
                                            {plan.name}
                                        </Typography>
                                        {plan.badge && <Chip label={plan.badge} color="secondary" size="small" />}
                                    </Box>
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
