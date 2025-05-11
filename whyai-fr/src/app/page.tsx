'use client';
import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    Typography,
    IconButton,
    CircularProgress,
    useMediaQuery,
    AlertTitle,
    Alert,
    keyframes,
    styled
} from '@mui/material';
import {ArrowForward, Close, Lightbulb} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './_stores/authStore';
import { useTheme } from '@mui/material/styles';
import TipsAndUpdates from '@mui/icons-material/TipsAndUpdates';
import Cookies from "js-cookie";

interface Category {
    name: string;
    description: string;
    range: [number, number];
    color: string;
}

// Анимация fadeIn
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Стилизованный контейнер с анимацией
const FadeContainer = styled(Box)(({ theme }) => ({
    animation: `${fadeIn} 0.5s ease-out both`,
}));

export default function HomePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openCategory, setOpenCategory] = useState<Category | null>(null);
    const isAuthenticated = Cookies.get("isAuthenticated");
    const router = useRouter();
    const [fact, setFact] = useState<string>('');
    const [loadingFact, setLoadingFact] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthenticated!="1") {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        const fetchFact = async () => {
            setLoadingFact(true);
            try {
                const mockFact = "Для запоминания сложных правил создавайте ассоциации с знакомыми образами - это повышает эффективность обучения на 40%";
                setFact(mockFact);
            } catch (error) {
                console.error('Error fetching fact:', error);
                setFact("Не удалось загрузить лайфхак. Попробуйте обновить страницу.");
            } finally {
                setLoadingFact(false);
            }
        };

        fetchFact();
    }, []);

    const categories: Category[] = [
        {
            name: '📒 Лексика',
            description:"Правильное употребление слов",
            range: [5, 8],
            color: theme.palette.primary.light
        },
        {
            name: '🖊️ Орфография',
            description:"Правописание букв в словах",
            range: [9, 15],
            color: theme.palette.primary.light
        },
        {
            name: '📃 Пунктуация',
            description:"Знаки препинания в предложениях",
            range: [16, 21],
            color: theme.palette.primary.light
        },
        {
            name: '📖 Текст',
            description:"Чтение и анализ содержимого текста",
            range: [22, 26],
            color: theme.palette.primary.light
        }
    ];

    if (isAuthenticated!="1") {
        return <Container maxWidth="md" sx={{ py: 3 }} />;
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                py: 3,
                px: { xs: 1.5, sm: 1 },
            }}
        >
            <FadeContainer>
                <Typography variant="h5" sx={{
                    mb: 2,
                    fontWeight: 700,
                    textAlign: 'center',
                    color: 'text.primary',
                    fontSize: isMobile ? '1.25rem' : '1.7rem'
                }}>
                    Добрый вечер, username!
                </Typography>
                <Typography variant="h1" sx={{
                    mb: 6,
                    fontWeight: 700,
                    textAlign: 'center',
                    color: 'text.primary',
                    fontSize: isMobile ? '1rem' : '1.25rem'
                }}>
                    Выбери раздел для изучения
                </Typography>
            </FadeContainer>

            <FadeContainer>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 3,
                        '& > *': {
                            maxHeight: isMobile ? 130 : 140,
                            width: '100%'
                        }
                    }}
                >
                    {categories.map((category) => (
                        <Button
                            key={category.name}
                            onClick={() => setOpenCategory(category)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 3,
                                background: category.color,
                                p: 1.5,
                                aspectRatio: '3/2',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 2
                                }
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                    textAlign: 'center',
                                    color: 'text.primary',
                                    fontSize: isMobile ? '0.875rem' : '1.5rem'
                                }}
                            >
                                {category.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                    textAlign: 'center',
                                    color: 'text.primary',
                                    fontSize: isMobile ? '0.875rem' : '1rem'
                                }}
                            >
                                {category.description}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.75rem'
                                }}
                            >
                                Задания {category.range[0]}-{category.range[1]}
                            </Typography>
                            <ArrowForward sx={{
                                fontSize: isMobile ? 20 : 24,
                                mt: 0.5
                            }} />
                        </Button>
                    ))}
                </Box>
            </FadeContainer>

            <FadeContainer>
                <Alert
                    severity="info"
                    icon={<TipsAndUpdates fontSize="small" />}
                    sx={{
                        borderRadius: 2,
                        marginTop: 5,
                        bgcolor: 'surfaceContainerLow.main',
                        color: 'onSurfaceVariant.main',
                        border: 'none',
                        '& .MuiAlert-icon': {
                            color: 'primary.main',
                            alignItems: 'center'
                        }
                    }}
                >
                    <AlertTitle sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: 'onSurface.main'
                    }}>
                        Полезный лайфхак
                    </AlertTitle>
                    {loadingFact ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress size={20} color="inherit" />
                        </Box>
                    ) : (
                        <Typography variant="body2" component="div" sx={{ color: 'onSurfaceVariant.main' }}>
                            {fact || "Для лучшего запоминания правил пробуйте объяснять их своими словами"}
                        </Typography>
                    )}
                </Alert>
            </FadeContainer>

            <Dialog
                open={!!openCategory}
                onClose={() => setOpenCategory(null)}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        m: 1,
                        maxHeight: '120vh',
                        animation: `${fadeIn} 0.3s ease-out`
                    }
                }}
            >
                {openCategory && (
                    <>
                        <Box sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {openCategory.name}
                            </Typography>
                            <IconButton onClick={() => setOpenCategory(null)} size="small">
                                <Close fontSize="small" />
                            </IconButton>
                        </Box>

                        <Box sx={{
                            p: 2,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 1.5
                        }}>
                            {Array.from(
                                { length: openCategory.range[1] - openCategory.range[0] + 1 },
                                (_, i) => {
                                    const taskNumber = openCategory.range[0] + i;
                                    return (
                                        <Button
                                            key={taskNumber}
                                            component={Link}
                                            href={`/theory?q=${taskNumber}`}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                height: 80,
                                                borderRadius: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 1
                                                }
                                            }}
                                        >
                                            <span style={{ fontSize: '1rem' }}>Задание</span>
                                            <span>№{taskNumber}</span>
                                        </Button>
                                    );
                                }
                            )}
                        </Box>
                    </>
                )}
            </Dialog>
        </Container>
    );
}