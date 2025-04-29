'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../_stores/authStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token } = useAuthStore();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token, router]);

    return <>{children}</>;
}