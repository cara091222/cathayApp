import { useEffect, useRef } from 'react';

/**
 * 自訂 hook：管理 setInterval
 * @param callback 要執行的回調函數
 * @param delay 間隔時間（毫秒），null 時停止 interval
 */
export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<(() => void) | undefined>(undefined);

    // 記住最新的 callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // 設置 interval
    useEffect(() => {
        function tick() {
            savedCallback.current?.();
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

