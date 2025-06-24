import { Suspense } from 'react';
import ChatPage from './ChatPage'; // это уже клиентский компонент с `use client` сверху

export default function Page() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <ChatPage />
        </Suspense>
    );
}