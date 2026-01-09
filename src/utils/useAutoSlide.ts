import { useRef, useCallback } from 'react';

/**
 * 自訂 hook：管理自動輪播的 interval
 * 提供啟動、停止、重新啟動的功能
 */
export function useAutoSlide() {
    const autoSlideIntervalRef = useRef<number | null>(null);
    const stepIntervalRef = useRef<number | null>(null);
    const progressIntervalRef = useRef<number | null>(null);

    /**
     * 清除所有 interval
     */
    const clearAllIntervals = useCallback(() => {
        if (autoSlideIntervalRef.current) {
            clearInterval(autoSlideIntervalRef.current);
            autoSlideIntervalRef.current = null;
        }
        if (stepIntervalRef.current) {
            clearInterval(stepIntervalRef.current);
            stepIntervalRef.current = null;
        }
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    }, []);

    /**
     * 清除自動輪播 interval
     */
    const clearAutoSlide = useCallback((): void => {
        if (autoSlideIntervalRef.current) {
            clearInterval(autoSlideIntervalRef.current);
            autoSlideIntervalRef.current = null;
        }
    }, []);

    /**
     * 清除步驟移動 interval
     */
    const clearStepInterval = useCallback((): void => {
        if (stepIntervalRef.current) {
            clearInterval(stepIntervalRef.current);
            stepIntervalRef.current = null;
        }
    }, []);

    /**
     * 清除進度 interval
     */
    const clearProgressInterval = useCallback((): void => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    }, []);

    /**
     * 啟動自動輪播
     */
    const startAutoSlide = useCallback(
        (callback: () => void, interval: number): void => {
            clearAutoSlide();
            autoSlideIntervalRef.current = setInterval(callback, interval);
        },
        [clearAutoSlide]
    );

    /**
     * 啟動步驟移動
     */
    const startStepInterval = useCallback(
        (callback: () => void, interval: number): void => {
            clearStepInterval();
            stepIntervalRef.current = setInterval(callback, interval);
        },
        [clearStepInterval]
    );

    /**
     * 啟動進度倒數
     * 注意：目前進度計算未在 UI 中使用，保留此函數以備未來擴展
     */
    const startProgress = useCallback(
        (interval: number, onProgress?: (progress: number) => void): void => {
            clearProgressInterval();

            // 如果不需要進度回調，可以簡化為只清除舊的 interval
            if (!onProgress) {
                return;
            }

            const startTime = Date.now();

            progressIntervalRef.current = window.setInterval(() => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, interval - elapsed);
                const progressPercent = (remaining / interval) * 100;

                onProgress(progressPercent);

                if (progressPercent <= 0) {
                    clearProgressInterval();
                }
            }, 16); // 約 60fps 更新
        },
        [clearProgressInterval]
    );

    return {
        clearAllIntervals,
        clearAutoSlide,
        clearStepInterval,
        clearProgressInterval,
        startAutoSlide,
        startStepInterval,
        startProgress,
    };
}

