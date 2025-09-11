import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { Footer } from '@/app/_components/footer';
import CookieWarning from './_components/cookieWarn';
import AuthInit from './_components/authInit';
import Script from "next/script";
import EmotionCacheProvider from "@/app/EmotionCacheProvider";

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
            {/* Яндекс.РСЯ */}
            <Script id="yandex-rtb-loader" strategy="beforeInteractive">
                {`
            window.yaContextCb=window.yaContextCb||[];
          `}
            </Script>
            <Script
                src="https://yandex.ru/ads/system/context.js"
                async
                strategy="beforeInteractive"
            />
        </head>
        <body
            className={inter.className}
            suppressHydrationWarning
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                margin: 0,
            }}
        >
        <EmotionCacheProvider>
        <Providers>
            <AuthInit />
            {children}
            <CookieWarning />
        </Providers>
        </EmotionCacheProvider>
        <Footer />
        </body>
        </html>
    );
}
