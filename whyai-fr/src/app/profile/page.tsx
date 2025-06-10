// app/profile/page.tsx
'use client';
import { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    TextField,
    useTheme,
    Slide,
    Grow,
    Fade,
    styled,
    useMediaQuery,
    Divider
} from '@mui/material';
import { Lock, ShowChart, Settings } from '@mui/icons-material';

const AnimatedCard = styled(Card)(({ theme }) => ({
    transition: theme.transitions.create(['transform', 'box-shadow'], {
        duration: theme.transitions.duration.short,
    }),
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4]
    }
}));

const MainWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    display: 'flex',
    minHeight: '600px',
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row'
    }
}));

const NavigationPanel = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `2px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
        width: '30%',
        borderBottom: 'none',
        borderRight: `2px solid ${theme.palette.divider}`
    }
}));

const ContentPanel = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    position: 'relative'
}));

const StaticDivider = styled(Divider)(({ theme }) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '2px',
    backgroundColor: theme.palette.divider,
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block'
    }
}));

const mockStats = {
    totalQuestions: 127,
    completedEssays: 23,
    dailyLimit: 15
};

const subscriptions = [
    {
        tier: 'Базовая',
        questions: '15 вопросов/день',
        essays: '3 проверки/день',
        color: 'grey.500',
        price: 'Бесплатно',
        active: true
    },
    {
        tier: 'Про',
        questions: '30 вопросов/день',
        essays: '5 проверок/день',
        color: 'primary.main',
        price: '299 ₽/мес',
        active: false
    },
    {
        tier: 'Премиум',
        questions: '60 вопросов/день',
        essays: '10 проверок/день',
        color: 'secondary.main',
        price: '599 ₽/мес',
        active: false
    }
];

export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState('stats');
    const [userData, setUserData] = useState({
        name: 'Иван Иванов',
        email: 'user@example.com',
        password: ''
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const SectionButton = ({ icon, text, section }: { icon: React.ReactNode; text: string; section: string }) => (
        <Fade in={true} timeout={800}>
            <Button
                fullWidth
                variant={activeSection === section ? 'contained' : 'text'}
                startIcon={icon}
                onClick={() => setActiveSection(section)}
                sx={{
                    justifyContent: 'flex-start',
                    mb: 2,
                    borderRadius: 2,
                    py: 2,
                    minHeight: 56,
                    '& .MuiButton-startIcon': {
                        marginRight: theme.spacing(1.5),
                        marginLeft: { xs: 0, md: theme.spacing(0.5) }
                    }
                }}
            >
                {!isMobile && text}
            </Button>
        </Fade>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <MainWrapper>
                <NavigationPanel>
                    <SectionButton icon={<ShowChart />} text="Статистика" section="stats" />
                    <SectionButton icon={<Lock />} text="Подписка" section="subscription" />
                    <SectionButton icon={<Settings />} text="Настройки" section="settings" />
                </NavigationPanel>

                <StaticDivider orientation="vertical" />

                <ContentPanel>
                    <Slide direction={isMobile ? 'up' : 'left'} in={true} mountOnEnter unmountOnExit>
                        <Box>
                            {/* Статистика */}
                            {activeSection === 'stats' && (
                                <Grid container spacing={3}>
                                    {[
                                        ['Всего вопросов', mockStats.totalQuestions],
                                        ['Проверок сочинений', mockStats.completedEssays],
                                        ['Лимит вопросов', mockStats.dailyLimit]
                                    ].map(([title, value], index) => (
                                        <Grow in={true} key={title} timeout={index * 200}>
                                            <Grid item xs={12} md={4} component="div">
                                                <AnimatedCard>
                                                    <CardContent>
                                                        <Typography color="text.secondary">{title}</Typography>
                                                        <Typography variant="h4" sx={{ mt: 1 }}>
                                                            {value}
                                                        </Typography>
                                                    </CardContent>
                                                </AnimatedCard>
                                            </Grid>
                                        </Grow>
                                    ))}
                                </Grid>
                            )}

                            {/* Подписки */}
                            {activeSection === 'subscription' && (
                                <Grid container spacing={3}>
                                    {subscriptions.map((sub, index) => (
                                        <Grow in={true} key={sub.tier} timeout={index * 200}>
                                            <Grid item xs={12} md={4} component="div">
                                                <AnimatedCard sx={{
                                                    border: `2px solid ${theme.palette.primary.light}`,
                                                    position: 'relative',
                                                    '&:after': sub.active ? {
                                                        content: '"✓"',
                                                        position: 'absolute',
                                                        top: -12,
                                                        right: -12,
                                                        bgcolor: 'success.main',
                                                        color: 'white',
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: 18
                                                    } : {}
                                                }}>
                                                    <CardContent>
                                                        <Typography variant="h6" gutterBottom sx={{ color: sub.color }}>
                                                            {sub.tier}
                                                        </Typography>
                                                        <Typography>✓ {sub.questions}</Typography>
                                                        <Typography>✓ {sub.essays}</Typography>
                                                        <Box sx={{ mt: 2 }}>
                                                            <Typography variant="h6">{sub.price}</Typography>
                                                            {!sub.active && (
                                                                <Button
                                                                    fullWidth
                                                                    variant="contained"
                                                                    sx={{ mt: 2 }}
                                                                    color={sub.tier === 'Про' ? 'primary' : 'secondary'}
                                                                >
                                                                    Оформить
                                                                </Button>
                                                            )}
                                                            {sub.active && (
                                                                <Button
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    sx={{ mt: 2 }}
                                                                    disabled
                                                                >
                                                                    Активный план
                                                                </Button>
                                                            )}
                                                        </Box>
                                                    </CardContent>
                                                </AnimatedCard>
                                            </Grid>
                                        </Grow>
                                    ))}
                                </Grid>
                            )}

                            {/* Настройки */}
                            {activeSection === 'settings' && (
                                <Grow in={true}>
                                    <Box component="form">
                                        <Grid container spacing={3}>
                                            {[
                                                { label: 'Имя', value: userData.name, key: 'name' },
                                                { label: 'Email', value: userData.email, key: 'email', type: 'email' },
                                                { label: 'Новый пароль', value: userData.password, key: 'password', type: 'password' }
                                            ].map((field, index) => (
                                                <Grid item={true} xs={12} key={field.key} component="div">
                                                    <Fade in={true} timeout={index * 200}>
                                                        <TextField
                                                            fullWidth
                                                            label={field.label}
                                                            type={field.type || 'text'}
                                                            value={field.value}
                                                            onChange={(e) => setUserData({ ...userData, [field.key]: e.target.value })}
                                                        />
                                                    </Fade>
                                                </Grid>
                                            ))}
                                            <Grid item={true} xs={12} component="div">
                                                <Fade in={true} timeout={500}>
                                                    <Button
                                                        variant="contained"
                                                        size="large"
                                                        sx={{ mt: 2 }}
                                                    >
                                                        Сохранить изменения
                                                    </Button>
                                                </Fade>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grow>
                            )}
                        </Box>
                    </Slide>
                </ContentPanel>
            </MainWrapper>
        </Container>
    );
}