'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
//import './globals.css';
import Providers from './providers';
import config from './_config/app'
import { useEffect } from 'react';
import { useAuthStore } from './_stores/authStore';
import {Footer} from "@/app/_components/footer";
const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    const initialize = useAuthStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);
    return (
        <html lang="en">
        <body className={inter.className}
              style={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                  margin: 0
              }}>
        <Providers>
            {children}
        </Providers>
        <Footer/>
        </body>
        </html>
    );
}