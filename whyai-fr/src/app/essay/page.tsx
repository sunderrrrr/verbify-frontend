'use client';
import { JSX, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Box,
    Button,
    Container,
    CircularProgress,
    Alert,
    Snackbar,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Link,
    styled,
    keyframes,
    useMediaQuery,
    Chip,
    CardContent,
    Stack,
    Card
} from '@mui/material';
import { Send, ArrowBack,Star, Info, Article, TextSnippet } from '@mui/icons-material';
import theme from "@/app/_config/theme";

const API_BASE_URL = 'http://localhost:8090/api/v1/essay';

interface EssayTheme {
    id: number;
    theme: string;
    text: string;
}

interface EssayEvaluation {
    score: number;
    feedback: string;
    recommendations: string;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FadeContainer = styled(Box)(({ theme }) => ({
    animation: `${fadeIn} 0.5s ease-out both`,
}));

const MarkdownContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[1],
    '& pre': {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        borderRadius: '12px',
        overflowX: 'auto'
    }
}));

const MarkdownComponents = {
    p: ({ children }: any) => <Typography variant="body1" paragraph>{children}</Typography>,
    a: ({ children, href }: any) => <Link href={href} target="_blank" rel="noopener" color="primary">{children}</Link>,
    ul: ({ children }: any) => <ul style={{ paddingLeft: '24px', margin: '12px 0' }}>{children}</ul>,
    ol: ({ children }: any) => <ol style={{ paddingLeft: '24px', margin: '12px 0' }}>{children}</ol>,
    li: ({ children }: any) => <li style={{ marginBottom: '8px', lineHeight: 1.6 }}>{children}</li>,
    strong: ({ children }: any) => <strong style={{ color: theme.palette.primary.main }}>{children}</strong>
};

export default function EssayPage() {
    const router = useRouter();
    const resultRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [lastScore, setLastScore] = useState<number | null>(null);
    const [themes, setThemes] = useState<EssayTheme[]>([]);
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
        return document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1] || '';
    };

    useEffect(() => {
        if (!getToken()) router.push('/login');
    }, [router]);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/themes/`);
                if (!response.ok) throw new Error('Ошибка загрузки тем');
                const data = await response.json();
                setThemes(data);
            } catch (err) {
                handleError(err as Error);
            }
        };
        fetchThemes();
    }, []);

    useEffect(() => {
        if (selectedTheme) {
            setSourceText(selectedTheme.text);
        }
    }, [selectedThemeId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                theme: customTheme ? customThemeText : selectedTheme?.theme || '',
                text: customTheme ? sourceText : selectedTheme?.text || '',
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

            const data = await response.json();
            setEvaluation(data);
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
                    <Chip
                        icon={<Info />}
                        label="ИИ-Проверка сочинений"
                        color="primary"
                        sx={{ mb: 2, fontSize: isMobile ? '0.875rem' : '1rem' }}
                    />
                    <Typography variant="h1" sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        lineHeight: 1.2
                    }}>
                        Проверка сочинений с искусственным интеллектом
                    </Typography>
                    <Typography variant="body1" sx={{
                        mt: 2,
                        color: 'text.secondary',
                        fontSize: isMobile ? '0.875rem' : '1rem'
                    }}>
                        Получи моментальную оценку и рекомендации по улучшению
                    </Typography>
                </Box>
            </FadeContainer>
            {(
                <Box sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 3,
                    bgcolor: 'surfaceVariant.main',
                    borderRadius: '16px',
                    border: `1px solid ${theme.palette.text.primary}`
                }}>
                    <Star color="primary" sx={{ fontSize: 32 }} />
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Последняя проверка
                        </Typography>
                        <Typography variant="h4" color="primary">
                            {lastScore}19/22
                        </Typography>
                    </Box>
                </Box>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={customTheme}
                            onChange={(e) => setCustomTheme(e.target.checked)}
                            color="secondary"
                        />
                    }
                    label="Хочу писать по своему тексту"
                    sx={{ alignSelf: 'flex-start' }}
                />

                {!customTheme ? (
                    <FormControl fullWidth variant="filled">
                        <InputLabel>Выбери тему сочинения</InputLabel>
                        <Select
                            value={selectedThemeId}
                            label="Выберите тему сочинения"
                            onChange={(e) => setSelectedThemeId(e.target.value)}
                            required
                            MenuProps={{ sx: { maxHeight: 300 } }}
                            //IconComponent={Article}
                        >
                            {themes.map((theme) => (
                                <MenuItem
                                    key={theme.id}
                                    value={theme.id.toString()}
                                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                                >
                                    <Typography variant="subtitle1">{theme.theme}</Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '100%'
                                        }}
                                    >
                                        {theme.text}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    <>
                        <TextField
                            label="Ваша тема"
                            value={customThemeText}
                            onChange={(e) => setCustomThemeText(e.target.value)}
                            fullWidth
                            required
                            variant="filled"
                            InputProps={{
                                //startAdornment: <Article color="action" sx={{ mr: 1 }} />
                            }}
                        />
                        <TextField
                            label="Исходный текст"
                            value={sourceText}
                            onChange={(e) => setSourceText(e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                            required
                            variant="filled"
                            helperText="Текст, на основе которого пишется сочинение"
                            InputProps={{
                               // startAdornment: <TextSnippet color="action" sx={{ mr: 1 }} />
                            }}
                        />
                    </>
                )}

                {selectedTheme && !customTheme && (
                    <Box sx={{
                        p: 2,
                        borderRadius: '12px',
                        bgcolor: 'surfaceVariant.main',
                        border: `1px solid ${theme.palette.text.primary}`
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            Выбранный текст для сочинения:
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            {selectedTheme.text}
                        </Typography>
                    </Box>
                )}

                <TextField
                    label="Текст сочинения"
                    value={essayContent}
                    onChange={(e) => setEssayContent(e.target.value)}
                    multiline
                    minRows={8}
                    maxRows={12}
                    fullWidth
                    required
                    variant="filled"
                    helperText="Минимальный объем - 250 слов"
                    InputProps={{
                       // startAdornment: <TextSnippet color="action" sx={{ mr: 1 }} />
                    }}
                    sx={{ '& textarea': { lineHeight: 1.6 } }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading || essayContent.length < 250}
                    sx={{
                        width: '100%',
                        py: 2,
                        borderRadius: '16px',
                        fontWeight: 700,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        '&:hover': {
                            boxShadow: theme.shadows[3]
                        }
                    }}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        '🔍 Проверить сочинение'
                    )}
                </Button>
            </Box>

            {evaluation && (
                <MarkdownContainer ref={resultRef}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Chip
                            label={`Оценка: ${evaluation.score}/10`}
                            color="primary"
                            sx={{ fontWeight: 700 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Время проверки: {new Date().toLocaleTimeString()}
                        </Typography>
                    </Box>

                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                        {evaluation.feedback}
                    </ReactMarkdown>

                    <Box sx={{
                        mt: 4,
                        pt: 3,
                        borderTop: `1px solid black`
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                            Рекомендации для улучшения:
                        </Typography>
                        <ReactMarkdown components={MarkdownComponents}>
                            {evaluation.recommendations}
                        </ReactMarkdown>
                    </Box>
                </MarkdownContainer>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="error"
                    sx={{
                        width: '100%',
                        borderRadius: '12px',
                        boxShadow: theme.shadows[3]
                    }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
}