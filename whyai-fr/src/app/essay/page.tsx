'use client';
import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    CircularProgress,
    Container,
    Fade,
    FormControl,
    FormControlLabel,
    Grow,
    InputLabel,
    keyframes,
    Link,
    MenuItem,
    Select,
    Slide,
    Snackbar,
    Stack,
    styled,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import {Star} from '@mui/icons-material';
import theme from "@/app/_config/theme";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/essay`;
const LOCAL_STORAGE_KEY = 'lastEssayResult';

interface EssayTheme {
    id: number;
    theme: string;
    text: string;
}

interface EssayEvaluation {
    score: number;
    feedback: string;
    recommendation: string;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.5; }
`;

const FadeContainer = styled(Box)(({ theme }) => ({
    animation: `${fadeIn} 0.8s ease-out both`,
}));

const MarkdownContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[1],
    animation: `${slideUp} 0.6s ease-out`,
    '& pre': {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
        borderRadius: '12px',
        overflowX: 'auto',
        animation: `${fadeIn} 0.6s ease-in`
    }
}));

const LoadingPulse = styled(CircularProgress)({
    animation: `${pulse} 1.5s ease-in-out infinite`
});

const MarkdownComponents = {
    p: ({ children }: any) => <Typography variant="body1" paragraph sx={{ animation: `${fadeIn} 0.3s` }}>{children}</Typography>,
    a: ({ children, href }: any) => <Link href={href} target="_blank" rel="noopener" color="primary" sx={{ animation: `${fadeIn} 0.3s` }}>{children}</Link>,
    ul: ({ children }: any) => <ul style={{ paddingLeft: '24px', margin: '12px 0', animation: `${fadeIn} 0.3s` }}>{children}</ul>,
    ol: ({ children }: any) => <ol style={{ paddingLeft: '24px', margin: '12px 0', animation: `${fadeIn} 0.3s` }}>{children}</ol>,
    li: ({ children }: any) => <li style={{ marginBottom: '8px', lineHeight: 1.6, animation: `${fadeIn} 0.3s` }}>{children}</li>,
    strong: ({ children }: any) => <strong style={{ color: theme.palette.primary.main }}>{children}</strong>
};

export default function EssayPage() {
    const router = useRouter();
    const resultRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [themes, setThemes] = useState<EssayTheme[]>([]);
    const [lastResult, setLastResult] = useState<EssayEvaluation | null>(null);
    const [customTheme, setCustomTheme] = useState(false);
    const [selectedThemeId, setSelectedThemeId] = useState<string>('');
    const [essayContent, setEssayContent] = useState('');
    const [customThemeText, setCustomThemeText] = useState('');
    const [sourceText, setSourceText] = useState('');
    const [evaluation, setEvaluation] = useState<EssayEvaluation | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const selectedTheme = themes.find(theme => theme.id.toString() === selectedThemeId);

    const getToken = () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
        if (!token) router.push('/login');
        return token || '';
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Загрузка тем
                const themesRes = await fetch(`${API_BASE_URL}/themes`, {
                    headers: { 'Authorization': `Bearer ${getToken()}` }
                });

                if (!themesRes.ok) throw new Error('Ошибка загрузки тем');
                const { result: themesData } = await themesRes.json();
                setThemes(themesData);

                // Загрузка последнего результата из localStorage
                const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (savedData) {
                    setLastResult(JSON.parse(savedData));
                }
            } catch (err) {
                handleError(err as Error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = customTheme ? {
                theme: customThemeText,
                text: sourceText,
                essay: essayContent
            } : {
                theme: selectedTheme?.theme,
                text: selectedTheme?.text || '',
                essay: essayContent
            };

            const response = await fetch(`${API_BASE_URL}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Ошибка оценки сочинения');

            const { result } = await response.json();
            setEvaluation(result);

            // Сохраняем результат в localStorage
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
            setLastResult(result);

            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            handleError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (error: Error) => {
        console.error(error);
        setError(error.message);
        setSnackbarOpen(true);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <FadeContainer>
                <Box textAlign="center" mb={6}>
                 
                    <Typography variant="h4" sx={{
                        fontWeight: 700,
                        animation: `${fadeIn} 1s ease-out`
                    }}>
                        Проверка сочинений с искусственным интеллектом
                    </Typography>
                </Box>
            </FadeContainer>

            <Grow in={!!lastResult} timeout={500}>
                <Card sx={{
                    mb: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    transformOrigin: 'top center'
                }}>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Star color="primary" />
                            <Typography variant="h6">
                                Последняя оценка: {lastResult?.score}/22
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Grow>

            <Box component="form" onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                '& > *': {
                    animation: `${slideUp} 0.6s ease-out`
                }
            }}>
                <Fade in timeout={600}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={customTheme}
                                onChange={(e) => setCustomTheme(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Использовать собственную тему"
                        sx={{ alignSelf: 'flex-start' }}
                    />
                </Fade>

                {!customTheme ? (
                    <Grow in timeout={700}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Выберите тему сочинения</InputLabel>
                            <Select
                                value={selectedThemeId}
                                label="Выберите тему сочинения"
                                onChange={(e) => setSelectedThemeId(e.target.value)}
                                required
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 400,
                                            '& .MuiMenuItem-root': {
                                                whiteSpace: 'normal',
                                                lineHeight: 1.5,
                                                py: 2,
                                                transition: 'all 0.2s'
                                            }
                                        }
                                    }
                                }}
                            >
                                {themes.map((theme) => (
                                    <MenuItem
                                        key={theme.id}
                                        value={theme.id.toString()}
                                        sx={{
                                            '&:hover': {
                                                transform: 'translateX(5px)'
                                            }
                                        }}
                                    >
                                        <Box sx={{ width: '100%' }}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                {theme.theme}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ whiteSpace: 'pre-wrap' }}
                                            >
                                                {theme.text.slice(0, 50)}...
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grow>
                ) : (
                    <Grow in timeout={700}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                label="Ваша тема"
                                value={customThemeText}
                                onChange={(e) => setCustomThemeText(e.target.value)}
                                fullWidth
                                required
                                variant="outlined"
                            />
                            <TextField
                                label="Исходный текст"
                                value={sourceText}
                                onChange={(e) => setSourceText(e.target.value)}
                                multiline
                                rows={4}
                                fullWidth
                                required
                                variant="outlined"
                            />
                        </Box>
                    </Grow>
                )}

                {selectedTheme && !customTheme && (
                    <Grow in timeout={800}>
                        <Box sx={{
                            p: 3,
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,
                            transition: 'all 0.3s'
                        }}>
                            <Typography variant="h6" gutterBottom>
                                Полный текст выбранной темы:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}
                            >
                                {selectedTheme.text}
                            </Typography>
                        </Box>
                    </Grow>
                )}

                <Grow in timeout={900}>
                    <TextField
                        label="Текст вашего сочинения"
                        value={essayContent}
                        onChange={(e) => setEssayContent(e.target.value)}
                        multiline
                        minRows={8}
                        fullWidth
                        required
                        variant="outlined"
                        helperText="Минимальный объем - 250 слов"
                        sx={{
                            '& textarea': {
                                lineHeight: 1.6,
                                transition: 'all 0.3s'
                            }
                        }}
                    />
                </Grow>

                <Grow in timeout={1000}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading || essayContent.length < 250}
                        sx={{
                            width: '100%',
                            py: 2,
                            borderRadius: 2,
                            fontWeight: 700,
                            textTransform: 'none',
                            transition: 'all 0.2s',
                            '&:hover': {
                                transform: 'scale(1.02)'
                            }
                        }}
                    >
                        {loading ? (
                            <LoadingPulse size={24} color="inherit" />
                        ) : 'Отправить на проверку'}
                    </Button>
                </Grow>
            </Box>

            {evaluation && (
                <MarkdownContainer ref={resultRef}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Chip
                            label={`Оценка: ${evaluation.score}/22`}
                            color="primary"
                            sx={{
                                fontWeight: 700,
                                animation: `${pulse} 1s ease`
                            }}
                        />
                    </Box>

                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                        {evaluation.feedback}
                    </ReactMarkdown>

                    <Box sx={{
                        mt: 4,
                        pt: 3,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        animation: `${fadeIn} 0.5s ease-out`
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                            Рекомендации:
                        </Typography>
                        <ReactMarkdown components={MarkdownComponents}>
                            {evaluation.recommendation}
                        </ReactMarkdown>
                        <Typography variant="caption" gutterBottom sx={{ fontWeight: 400 }}>
                            Напоминание: Результаты выданные нейросетью не являются окончательными и могут быть ошибочными
                        </Typography>
                    </Box>
                </MarkdownContainer>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={Slide}
            >
                <Alert
                    severity="error"
                    sx={{
                        width: '100%',
                        borderRadius: 2,
                        animation: `${slideUp} 0.3s ease-out`
                    }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
}