'use client';
import { useState } from 'react';
import { Box, Button, Container, Dialog, Typography, IconButton, DialogTitle, DialogContent, Grid } from '@mui/material';
import { ArrowForward, Close } from '@mui/icons-material';
import Link from 'next/link';
import theme from './_config/theme';

interface Category {
    name: string;
    range: [number, number];
    color: string;
}

export default function HomePage() {
    const [openCategory, setOpenCategory] = useState<Category | null>(null);

    const categories: Category[] = [
        {
            name: 'Лексика',
            range: [5, 8],
            color: theme.palette.primary.light
        },
        {
            name: 'Орфография',
            range: [9, 15],
            color: theme.palette.primary.light
        },
        {
            name: 'Пунктуация',
            range: [16, 21],
            color: theme.palette.primary.light
        },
        {
            name: 'Работа с текстом',
            range: [22, 26],
            color: theme.palette.primary.light
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" sx={{
                mb: 4,
                fontWeight: 700,
                textAlign: 'center'
            }}>
                Выберите раздел
            </Typography>

            {/* Контейнер с CSS Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)'
                    },
                    gap: 2,
                    '& > *': {
                        aspectRatio: '1 / 1',
                        minHeight: 240
                    }
                }}
            >
                {categories.map((category) => (
                    <Button
                        key={category.name}
                        onClick={() => setOpenCategory(category)}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                            background: category.color,
                            p: 3,
                            transition: 'all 0.3s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 3
                            }
                        }}
                    >
                        <Typography

                            variant="h4"
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                color:theme.palette.text.primary,
                                textAlign: 'center'
                            }}
                        >
                            {category.name}
                        </Typography>
                        <ArrowForward sx={{ fontSize: 40 }} />
                    </Button>
                ))}
            </Box>

            {/* Модальное окно (остается без изменений) */}
            <Dialog
                open={!!openCategory}
                onClose={() => setOpenCategory(null)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        bgcolor: 'background.paper'
                    }
                }}
            >
                {openCategory && (
                    <>
                        <DialogTitle sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            py: 3
                        }}>
                            <Typography variant="h5" fontWeight={600}>
                                {openCategory.name}
                            </Typography>
                            <IconButton onClick={() => setOpenCategory(null)}>
                                <Close />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent sx={{ p: 4 }}>
                            <Grid container spacing={4}>
                                {Array.from(
                                    { length: openCategory.range[1] - openCategory.range[0] + 1 },
                                    (_, i) => {
                                        const taskNumber = openCategory.range[0] + i;
                                        //@ts-ignore
                                        return (
                                            <Grid item xs={2} sm={2} key={taskNumber}>
                                                <Button
                                                    component={Link}
                                                    href={`/theory?q=${taskNumber}`}
                                                    variant="contained"
                                                    fullWidth
                                                    sx={{
                                                        height: 80,
                                                        borderRadius: 2,
                                                        marginTop:3,
                                                        background: theme.palette.primary.light,
                                                        fontWeight: 500,
                                                        fontSize: '1.1rem',
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    }}
                                                >
                                                    <span>Задание</span>
                                                    <span>№{taskNumber}</span>
                                                </Button>
                                            </Grid>
                                        );
                                    }
                                )}
                            </Grid>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </Container>
    );
}