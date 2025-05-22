'use client';
import { useEffect, useId } from 'react';
import Script from 'next/script';

interface YandexAdProps {
    blockId: string;
    renderTo?: string;
    params?: Record<string, any>;
}

declare global {
    interface Window {
        Ya?: any;
    }
}

export const YandexAd = ({ blockId, renderTo, params }: YandexAdProps) => {
    const uid = useId().replace(/:/g, '');
    const targetElementId = renderTo || `yandex_rtb_${uid}`;

    useEffect(() => {
        if (window.Ya?.Context?.AdvManager) {
            window.Ya.Context.AdvManager.render({
                renderTo: targetElementId,
                blockId: blockId,
                ...(params || {})
            });
        }
    }, [blockId, targetElementId, params]);

    return (
        <div className="yandex-ad" style={{ textAlign: 'center' }}>
            <div id={targetElementId}></div>
            <Script
                strategy="afterInteractive"
                src="https://yandex.ru/ads/system/context.js"
                onReady={() => {
                    if (window.Ya?.Context?.AdvManager) {
                        window.Ya.Context.AdvManager.render({
                            renderTo: targetElementId,
                            blockId: blockId,
                            ...(params || {})
                        });
                    }
                }}
            />
        </div>
    );
};