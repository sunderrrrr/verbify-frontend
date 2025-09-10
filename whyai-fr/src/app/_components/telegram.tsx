'use client';

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    IconButton,
    Box,
    Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Link from 'next/link';

export default function TGBanner() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (Math.random() < 0.33) {
            setOpen(true);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" sx={{ pb: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <span>🔔 Подпишись на наш Telegram</span>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ pt: 1 }}>
                <Box display="flex" alignItems="center">
                    <Box sx={{ mr: 3, flexShrink: 0 }}>
                        <Image
                            src="/whyai-logo.png"
                            alt="Telegram"
                            width={80}
                            height={80}
                            style={{ borderRadius: '50%' }}
                        />
                    </Box>
                    <DialogContentText id="alert-dialog-description">
                        Получай полезные материалы, уведомления о новых функциях и обновлениях, а также следи за разработкой!
                    </DialogContentText>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href="https://t.me/verbiffy"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    sx={{ px: 4 }}
                >
                    Подписаться
                </Button>
            </DialogActions>
        </Dialog>
    );
}