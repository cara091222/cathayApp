import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './PhoneSlider.module.scss';
import { useAutoSlide } from '@/utils/useAutoSlide';
import {
    slides,
    TOTAL_SLIDES,
    AUTO_SLIDE_INTERVAL,
    MOBILE_BREAKPOINT,
    SLIDE_TITLES,
    HINT_DELAY,
} from './phoneSliderConstants';
import {
    getDistanceAndDirection,
    getIntervalByDistance,
    getNextIndex,
    calculateRelativeAngle,
} from './phoneSliderUtils';
import { getSlideStyle } from './slideStyleCalculators';
import type { TransitionState } from './types';

function PhoneSlider() {
    const [centerIndex, setCenterIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showHint, setShowHint] = useState(false); // 控制 hint 顯示的 state
    
    // 使用 ref 追蹤狀態（用於在 interval 中取得最新值）
    const centerIndexRef = useRef<number>(centerIndex);
    const transitionStateRef = useRef<TransitionState>({
        targetIndex: null,
        direction: 1,
    });

    // 使用自訂 hook 管理 interval
    const {
        clearAllIntervals,
        startAutoSlide,
        startStepInterval,
        startProgress,
    } = useAutoSlide();

    // 重新啟動自動輪播
    const resumeAutoSlide = useCallback((): void => {
        startAutoSlide(() => {
            setCenterIndex((prev) => (prev + 1) % TOTAL_SLIDES);
        }, AUTO_SLIDE_INTERVAL);
        // 目前進度條未在 UI 中使用，但保留以備未來擴展
        startProgress(AUTO_SLIDE_INTERVAL);
    }, [startAutoSlide, startProgress]);

    // 執行步驟移動（一次移動一張）
    const executeStepTransition = useCallback(
        (targetIndex: number): void => {
            const currentIndex = centerIndexRef.current;
            const { distance, direction } = getDistanceAndDirection(currentIndex, targetIndex);
            const interval = getIntervalByDistance(distance);

            // 更新 transition state
            transitionStateRef.current = {
                targetIndex,
                direction,
            };

            startStepInterval(() => {
                setCenterIndex((prev) => {
                    const current = prev;
                    const { targetIndex: target, direction: dir } = transitionStateRef.current;

                    // 如果已經到達目標，停止移動並重新啟動自動輪播
                    if (current === target || target === null) {
                        clearAllIntervals();
                        resumeAutoSlide();
                        return current;
                    }

                    // 根據方向移動
                    return getNextIndex(current, dir);
                });
            }, interval);
        },
        [startStepInterval, clearAllIntervals, resumeAutoSlide]
    );

    // 處理手動切換 - 一次移動一張卡片
    const handleSlideChange = useCallback(
        (targetIndex: number): void => {
        clearAllIntervals();
            setShowHint(false); // 隱藏 hint

            // 使用函數式更新來取得最新的 centerIndex
            setCenterIndex((currentIndex) => {
                // 如果已經在目標位置，重新啟動自動輪播
        if (currentIndex === targetIndex) {
                    window.setTimeout(() => {
                        resumeAutoSlide();
                    }, 0);
                    return currentIndex;
                }

                // 更新 ref 以確保 executeStepTransition 能取得最新值
                centerIndexRef.current = currentIndex;
                executeStepTransition(targetIndex);
                return currentIndex;
            });
        },
        [clearAllIntervals, resumeAutoSlide, executeStepTransition]
    );

    // 處理滑動手勢切換（僅手機版）
    const handleSwipeChange = useCallback(
        (direction: 'left' | 'right'): void => {
            if (!isMobile) return;

            clearAllIntervals();
            setShowHint(false);

            setCenterIndex((currentIndex) => {
                let targetIndex: number;
                if (direction === 'left') {
                    // 左滑：下一張（順時針）
                    targetIndex = (currentIndex + 1) % TOTAL_SLIDES;
                } else {
                    // 右滑：上一張（逆時針）
                    targetIndex = (currentIndex - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
                }

                centerIndexRef.current = currentIndex;
                executeStepTransition(targetIndex);
                return currentIndex;
            });
        },
        [isMobile, clearAllIntervals, executeStepTransition]
    );

    // 處理手機版點擊卡片（根據位置判斷前進或後退）
    const handleMobileCardClick = useCallback(
        (clickedIndex: number): void => {
            if (!isMobile) return;

            setCenterIndex((currentIndex) => {
                // 如果點擊的是中心卡片，不做任何事
                if (clickedIndex === currentIndex) {
                    return currentIndex;
                }

                // 計算相對位置
                const relativeAngle = calculateRelativeAngle(clickedIndex, currentIndex);

                // 判斷是左側還是右側
                // relativeAngle < 0 表示在左側（逆時針），應該切換到上一張
                // relativeAngle > 0 表示在右側（順時針），應該切換到下一張
                if (relativeAngle < 0) {
                    // 左側：切換到上一張
                    handleSwipeChange('right');
                } else {
                    // 右側：切換到下一張
                    handleSwipeChange('left');
                }

                return currentIndex;
            });
        },
        [isMobile, handleSwipeChange]
    );

    // 處理卡片點擊（統一入口）
    const handleCardClick = useCallback(
        (clickedIndex: number): void => {
            if (isMobile) {
                // 手機版：根據位置判斷前進或後退
                handleMobileCardClick(clickedIndex);
            } else {
                // 桌面版：直接切換到目標位置
                handleSlideChange(clickedIndex);
            }
        },
        [isMobile, handleMobileCardClick, handleSlideChange]
    );

    // 使用原生 JavaScript 處理滑動手勢（僅手機版）
    const phoneSliderRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const isSwipeRef = useRef<boolean>(false);

    // 處理觸控開始
    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            if (!isMobile || !phoneSliderRef.current) return;

            const touch = e.touches[0];
            touchStartRef.current = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now(),
            };
            isSwipeRef.current = false;
        },
        [isMobile]
    );

    // 處理觸控移動
    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (!isMobile || !touchStartRef.current || !phoneSliderRef.current) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - touchStartRef.current.x;
            const deltaY = touch.clientY - touchStartRef.current.y;

            // 判斷是否為水平滑動（水平移動距離大於垂直移動距離）
            const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10;

            if (isHorizontal && !isSwipeRef.current) {
                // 如果是水平滑動，阻止預設滾動行為
                e.preventDefault();
                isSwipeRef.current = true;
                clearAllIntervals();
            }
        },
        [isMobile, clearAllIntervals]
    );

    // 處理觸控結束
    const handleTouchEnd = useCallback(
        (e: TouchEvent) => {
            if (!isMobile || !touchStartRef.current || !phoneSliderRef.current) return;

            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartRef.current.x;
            const deltaY = touch.clientY - touchStartRef.current.y;
            const deltaTime = Date.now() - touchStartRef.current.time;

            // 判斷是否為水平滑動
            const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30;
            const velocity = Math.abs(deltaX) / deltaTime; // 計算速度 (px/ms)
            const swipeThreshold = 50; // 最小滑動距離（px）
            const velocityThreshold = 0.3; // 最小速度閾值 (px/ms)

            if (isHorizontal && isSwipeRef.current) {
                // 左滑（deltaX > 0）：切換到下一張
                if (deltaX > swipeThreshold || (deltaX > 0 && velocity > velocityThreshold)) {
                    handleSwipeChange('left');
                }
                // 右滑（deltaX < 0）：切換到上一張
                else if (deltaX < -swipeThreshold || (deltaX < 0 && velocity > velocityThreshold)) {
                    handleSwipeChange('right');
                }
                // 如果滑動距離不夠，恢復自動輪播
                else {
                    resumeAutoSlide();
                }
            } else {
                // 如果是垂直滾動或不是有效滑動，恢復自動輪播
                resumeAutoSlide();
            }

            // 重置觸控狀態
            touchStartRef.current = null;
            isSwipeRef.current = false;
        },
        [isMobile, handleSwipeChange, resumeAutoSlide]
    );

    // 綁定觸控事件（僅手機版）
    useEffect(() => {
        if (!isMobile || !phoneSliderRef.current) return;

        const element = phoneSliderRef.current;

        element.addEventListener('touchstart', handleTouchStart, { passive: true });
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMobile, handleTouchStart, handleTouchMove, handleTouchEnd]);

    // 初始化自動輪播
    useEffect(() => {
        resumeAutoSlide();

        return () => {
            clearAllIntervals();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 只在 mount 時執行一次

    // 更新 ref
    useEffect(() => {
        centerIndexRef.current = centerIndex;
    }, [centerIndex]);

    // 檢測是否為手機版
    useEffect(() => {
        const checkMobile = (): void => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []); // 只在 mount 時設定監聽器

    // 當中心卡片改變時，控制 hint 的顯示（使用 state 而非 DOM 操作）
    useEffect(() => {
        const currentIndex = centerIndex;

        // 延遲顯示中心卡片的 hint
        const showTimer = window.setTimeout(() => {
            // 檢查是否還是同一個 centerIndex
            if (centerIndex === currentIndex) {
                setShowHint(true);
            }
        }, HINT_DELAY);

        return () => {
            window.clearTimeout(showTimer);
            // 當 centerIndex 改變時，隱藏 hint
            setShowHint(false);
        };
    }, [centerIndex]);

    // 計算要顯示的所有 slide
    // 桌面版：顯示全部 8 張
    // 手機版：雖然渲染全部，但透過樣式只顯示三張
    const allSlideIndices = Array.from({ length: TOTAL_SLIDES }, (_, i) => i);

    return (
        <div className={styles.container}>
            <div className={styles.mobileSlideTitles} key={centerIndex}>
                <h3>{SLIDE_TITLES[centerIndex].main}</h3>
                <p>{SLIDE_TITLES[centerIndex].sec}</p>
            </div>
            <div
                ref={phoneSliderRef}
                className={styles.phoneSlider}
            >
                {allSlideIndices.map((slideIndex) => {
                    const slideStyle = getSlideStyle(slideIndex, centerIndex, isMobile);
                    const SlideComponent = slides[slideIndex];
                    const isCenter = slideIndex === centerIndex;
                    const shouldShowHint = isCenter && showHint;

                    return (
                        <div
                            key={slideIndex}
                            className={`${styles.slideWrapper} ${isCenter ? styles.center : ''}`}
                            style={slideStyle}
                            data-center={isCenter ? 'true' : 'false'}
                            data-show-hint={shouldShowHint ? 'true' : 'false'}
                            onClick={() => handleCardClick(slideIndex)}
                        >
                            <SlideComponent />
                        </div>
                    );
                })}
            </div>
            
            <div className={styles.controls}>
                {slides.map((_, index) => {
                    const isActive = centerIndex === index;
                    
                    return (
                        <button
                            key={index}
                            className={`${styles.controlButton} ${
                                isActive ? styles.active : ""
                            }`}
                            onClick={() => handleSlideChange(index)}
                            aria-label={`切換到第 ${index + 1} 頁`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                            >
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="6.5"
                                    className="dot"
                                />
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="19"
                                    stroke="#29A86F"
                                    className="ring"
                                />
                            </svg>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default PhoneSlider;