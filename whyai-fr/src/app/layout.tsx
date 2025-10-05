// app/layout.tsx
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import Providers from './providers';
import {Footer} from '@/app/_components/footer';
import CookieWarning from './_components/cookieWarn';
import AuthInit from './_components/authInit';
import EmotionCacheProvider from "@/app/EmotionCacheProvider";
import AuthWrapper from './_components/AuthWrapper'; // Добавьте эту строку

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Verbify',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <head>
        </head>
        <body
            className={inter.className}
            suppressHydrationWarning
            style={{
                display: 'flex',
                flexDirection: 'column',
                fontWeight: 500,
                minHeight: '100vh',
                margin: 0,
            }}
        >
        <EmotionCacheProvider>
            <Providers>
                <AuthInit />
                <AuthWrapper>
                    {children}
                </AuthWrapper>
                <CookieWarning />
            </Providers>
        </EmotionCacheProvider>
        <Footer />
        </body>
        </html>
    );
}