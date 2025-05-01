'use client';
import {JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    TextField,
    Typography,
    Link,
    CircularProgress
} from '@mui/material';
import { Send, ArrowBack } from '@mui/icons-material';

interface Message {
    content: string | JSX.Element;
    isBot: boolean;
}

export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingTheory, setLoadingTheory] = useState(false);
    const taskNumber = new URLSearchParams(window.location.search).get('q');

    // Приветственное сообщение при загрузке
    useEffect(() => {
        if (!taskNumber) return;

        const welcomeMessage = (
            <Typography component="div">
                Привет! Я готов объяснить тебе задание №{taskNumber}.<br />
                Вот также ссылка на всю теорию, которая может тебе помочь:{' '}
                <Link
                    href={`/theory?q=${taskNumber}`}
                    target="_blank"
                    rel="noopener"
                    color="secondary"
                >
                    Открыть теорию
                </Link>
                <br /><br />
                Загружаю материалы задания...
            </Typography>
        );

        setMessages([{ content: welcomeMessage, isBot: true }]);

        // Затем загружаем теорию
        const fetchTheory = async () => {
            setLoadingTheory(true);
            try {
                const response = await fetch(`/api/v1/theory/${taskNumber}`);
                const data = await response.json();
                setMessages(prev => [...prev, {
                    content: data.theory,
                    isBot: true
                }]);
            } catch (error) {
                console.error('Error fetching theory:', error);
                setMessages(prev => [...prev, {
                    content: 'Не удалось загрузить теорию к заданию',
                    isBot: true
                }]);
            } finally {
                setLoadingTheory(false);
            }
        };

        fetchTheory();
    }, [taskNumber]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        const userMessage = { content: input, isBot: false };

        try {
            setMessages(prev => [...prev, userMessage]);
            setInput('');

            const response = await fetch(`/api/v1/theory/${taskNumber}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: input })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { content: data.response, isBot: true }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                content: 'Ошибка соединения с сервером',
                isBot: true
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="sticky" color="default">
                <Container maxWidth="md">
                    <Box display="flex" alignItems="center" py={2}>
                        <IconButton onClick={() => router.back()}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h6" ml={2}>
                            Задание {taskNumber}
                        </Typography>
                    </Box>
                </Container>
            </AppBar>

            <Container
                maxWidth="md"
                sx={{ flex: 1, overflowY: 'auto', py: 3 }}
            >
                {messages.map((msg, i) => (
                    <Box
                        key={i}
                        sx={{
                            maxWidth: '80%',
                            alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                            bgcolor: msg.isBot ? 'background.paper' : 'primary.main',
                            color: msg.isBot ? 'text.primary' : 'primary.contrastText',
                            borderRadius: 3,
                            p: 2,
                            mb: 2,
                            boxShadow: 1,
                            ml: msg.isBot ? 0 : 'auto'
                        }}
                    >
                        {typeof msg.content === 'string' ? (
                            <Typography variant="body1">{msg.content}</Typography>
                        ) : (
                            msg.content
                        )}
                        {loadingTheory && i === 0 && (
                            <Box display="flex" justifyContent="center" mt={2}>
                                <CircularProgress size={24} color="inherit" />
                            </Box>
                        )}
                    </Box>
                ))}
            </Container>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    py: 2
                }}
            >
                <Container maxWidth="md" sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth
                        variant="filled"
                        InputProps={{ disableUnderline: true }}
                        placeholder="Введите ваш вопрос..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading || loadingTheory}
                        sx={{
                            bgcolor: 'background.default',
                            borderRadius: 3,
                            '& .MuiFilledInput-root': { p: 1.5 }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || loadingTheory}
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
        </Box>
    );
}