'use client';
import { JSX, useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    TextField,
    Typography,
    Link,
    CircularProgress,
    Alert,
    Snackbar,
    keyframes,
    styled
} from '@mui/material';
import { Send, ArrowBack, Delete } from '@mui/icons-material';

const API_BASE_URL = 'http://localhost:8090/api/v1';

interface Message {
    id: string;
    content: string;
    isBot: boolean;
    createdAt?: string;
}

interface ChatResponseItem {
    id: number;
    user_id: number;
    task_id: number;
    role: string;
    content: string;
    created_at: string;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const typingAnimation = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

const MessageContainer = styled(Box)(({ theme }) => ({
    maxWidth: '80%',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[1],
    animation: `${fadeIn} 0.3s ease-out`,
    '& pre': {
        backgroundColor: theme.palette.grey[100],
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        overflowX: 'auto'
    }
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    animation: `${typingAnimation} 1.5s infinite`
}));

const MarkdownComponents = {
    p: ({ children }: any) => <Typography paragraph sx={{ margin: 0 }}>{children}</Typography>,
    a: ({ children, href }: any) => <Link href={href} target="_blank" rel="noopener">{children}</Link>,
    ul: ({ children }: any) => <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>{children}</ul>,
    ol: ({ children }: any) => <ol style={{ paddingLeft: '20px', margin: '8px 0' }}>{children}</ol>,
    li: ({ children }: any) => <li style={{ marginBottom: '4px' }}>{children}</li>,
    code: ({ children }: any) => (
        <code style={{
            backgroundColor: '#f5f5f5',
            padding: '2px 4px',
            borderRadius: '4px',
            fontFamily: 'monospace'
        }}>
            {children}
        </code>
    )
};

export default function ChatPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const taskNumber = searchParams.get('q');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [theoryContent, setTheoryContent] = useState('');

    const getToken = () => {
        if (typeof window === 'undefined') return '';
        const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find(cookie => cookie.startsWith('authToken='));
        return tokenCookie ? tokenCookie.split('=')[1] : '';
    };

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isBotTyping]);

    const getAuthHeaders = () => {
        const token = getToken();
        if (!token) {
            router.push('/login');
            return null;
        }
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    // ... (предыдущий код остается без изменений до этого места)

    const loadChatHistory = async () => {
        try {
            const headers = getAuthHeaders();
            if (!headers || !taskNumber) return [];

            const response = await fetch(`${API_BASE_URL}/theory/${taskNumber}/chat`, {
                headers,
                credentials: 'include'
            });

            if (response.status === 401) {
                document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                router.push('/login');
                return [];
            }

            const data = await response.json();
            return (data.result || [])
                .filter((item: ChatResponseItem) => item?.content && item.role !== 'system') // Фильтруем system сообщения
                .map((item: ChatResponseItem) => ({
                    id: `msg-${item.id}`,
                    content: item.content,
                    isBot: item.role === 'assistant',
                    createdAt: item.created_at
                }));

        } catch (error) {
            console.error('Ошибка загрузки истории:', error);
            return [];
        }
    };



    useEffect(() => {
        if (!taskNumber) return;

        const loadInitialData = async () => {
            try {
                setLoadingData(true);
                const headers = getAuthHeaders();
                if (!headers) return;

                const [theoryResponse, chatHistory] = await Promise.all([
                    fetch(`${API_BASE_URL}/theory/${taskNumber}`, {
                        headers,
                        credentials: 'include'
                    }),
                    loadChatHistory()
                ]);

                if (!theoryResponse.ok) throw new Error('Ошибка загрузки теории');

                const theoryData = await theoryResponse.json();
                setTheoryContent(theoryData.theory || '');

                const initialMessages: Message[] = [
                    {
                        id: 'welcome-msg',
                        content: `Привет! Я помогу с заданием №${taskNumber}\n\n[Открыть полную теорию](/theory?q=${taskNumber})`,
                        isBot: true
                    }
                ];

                if (theoryData.theory) {
                    initialMessages.push({
                        id: 'theory-msg',
                        content: theoryData.theory,
                        isBot: true
                    });
                }

                if (chatHistory && chatHistory.length > 0) {
                    initialMessages.push(...chatHistory);
                }

                setMessages(initialMessages);

            } catch (err) {
                const error = err as Error;
                console.error('Ошибка загрузки:', error);
                setError(error.message);
                setSnackbarOpen(true);
            } finally {
                setLoadingData(false);
            }
        };

        loadInitialData();
    }, [taskNumber]);

    const handleDeleteHistory = async () => {
        if (!taskNumber) return;
        const headers = getAuthHeaders();
        if (!headers) return;

        try {
            const response = await fetch(`${API_BASE_URL}/theory/${taskNumber}/chat`, {
                method: 'DELETE',
                headers,
                credentials: 'include'
            });

            if (response.ok) {
                setMessages(prev => prev.filter(m => m.id === 'welcome-msg' || m.id === 'theory-msg'));
            }
        } catch (error) {
            console.error('Ошибка удаления истории:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !taskNumber || loading) return;

        const headers = getAuthHeaders();
        if (!headers) return;

        setLoading(true);
        setIsBotTyping(true);

        try {
            // Добавляем сообщение пользователя
            setMessages(prev => [...prev, {
                id: `user-${Date.now()}`,
                content: input,
                isBot: false
            }]);
            setInput('');

            const response = await fetch(`${API_BASE_URL}/theory/${taskNumber}/chat`, {
                method: 'POST',
                headers,
                credentials: 'include',
                body: JSON.stringify({
                    role: 'user',
                    content: input,
                    theory: theoryContent
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка сервера');
            }

            // Временное решение - перезагрузка страницы после получения ответа
            window.location.reload();

        } catch (err) {
            const error = err as Error;
            console.error('Ошибка:', error);
            setError(error.message);
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
            setIsBotTyping(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (loadingData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper' }}>
                <Container maxWidth="md">
                    <Box display="flex" alignItems="center" py={2}>
                        <IconButton onClick={() => router.back()} edge="start">
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h6" component="h1" ml={2}>
                            {taskNumber ? `Задание ${taskNumber}` : 'Чат с помощником'}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Delete />}
                            onClick={handleDeleteHistory}
                            sx={{ ml: 'auto' }}
                            disabled={loading}
                        > Сбросить
                        </Button>
                    </Box>
                </Container>
            </AppBar>

            <Container
                maxWidth="md"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    py: 3,
                    overflowY: 'auto',
                    position: 'relative'
                }}
            >
                {messages.map((msg) => (
                    <MessageContainer
                        key={msg.id}
                        sx={{
                            alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                            bgcolor: msg.isBot ? 'background.paper' : 'primary.main',
                            color: msg.isBot ? 'text.primary' : 'primary.contrastText',
                            ml: msg.isBot ? 0 : 'auto'
                        }}
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={MarkdownComponents}
                        >
                            {msg.content}
                        </ReactMarkdown>
                        {msg.createdAt && (
                            <Typography variant="caption" display="block" textAlign="right" mt={1}>
                                {new Date(msg.createdAt).toLocaleString()}
                            </Typography>
                        )}
                    </MessageContainer>
                ))}

                {isBotTyping && (
                    <MessageContainer
                        sx={{
                            alignSelf: 'flex-start',
                            bgcolor: 'background.paper'
                        }}
                    >
                        <TypingIndicator>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'text.primary'
                                }}
                            />
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'text.primary',
                                    animationDelay: '0.2s'
                                }}
                            />
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'text.primary',
                                    animationDelay: '0.4s'
                                }}
                            />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                Бот печатает...
                            </Typography>
                        </TypingIndicator>
                    </MessageContainer>
                )}
                <div ref={messagesEndRef} style={{ height: '1px' }} />
            </Container>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    py: 2,
                    bgcolor: 'background.paper'
                }}
            >
                <Container maxWidth="md" sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Введите ваш вопрос..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !input.trim()}
                        sx={{
                            minWidth: 56,
                            height: 56,
                            borderRadius: '50%'
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : <Send />}
                    </Button>
                </Container>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}