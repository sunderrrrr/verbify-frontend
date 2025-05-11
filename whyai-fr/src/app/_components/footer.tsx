'use client';
import { Box, Container, Typography, IconButton, Divider } from '@mui/material';
import { GitHub, Twitter, Telegram, Instagram } from '@mui/icons-material';
import theme from '../_config/theme';

export function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 1,
                mt: 'auto',
                background: theme.palette.background.default,
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Container maxWidth="md">
                {/* Социальные сети */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 2
                    }}
                >
                    <IconButton
                        aria-label="GitHub"
                        color="inherit"
                        sx={{
                            color: 'onSurfaceVariant.main',
                            '&:hover': {
                                color: theme.palette.primary.main,
                                bgcolor: 'transparent'
                            }
                        }}
                    >
                        <GitHub fontSize="small" />
                    </IconButton>
                    <IconButton
                        aria-label="Telegram"
                        color="inherit"
                        sx={{
                            color: 'onSurfaceVariant.main',
                            '&:hover': {
                                color: theme.palette.primary.main,
                                bgcolor: 'transparent'
                            }
                        }}
                    >
                        <Telegram fontSize="small" />
                    </IconButton>
                </Box>

                {/* Разделитель */}
                <Divider sx={{ my: 1 }} />

                {/* Копирайт и ссылки */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        © {new Date().getFullYear()} WhyAI. Все права защищены. В разработке.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 0 }}>
                        <Typography
                            variant="caption"
                            component="a"
                            href="/privacy"
                            sx={{
                                color: 'text.secondary',
                                textDecoration: 'none',
                                marginRight:1,
                                '&:hover': {
                                    color: theme.palette.primary.main,
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Политика конфиденциальности
                        </Typography>
                        <Typography
                            variant="caption"
                            component="a"
                            href="/terms"
                            sx={{
                                color: 'text.secondary',
                                textDecoration: 'none',
                                '&:hover': {
                                    color: theme.palette.primary.main,
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Условия использования
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}