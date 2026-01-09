import { TOTAL_SLIDES } from './phoneSliderConstants';
import { calculateRelativeAngle, getDistanceFactor } from './phoneSliderUtils';

export interface SlideStyle {
    transform: string;
    zIndex: number;
    opacity?: number;
    pointerEvents?: 'none';
}

/**
 * 計算手機版樣式
 */
export function getMobileSlideStyle(
    slideIndex: number,
    centerIndex: number
): SlideStyle {
    const relativeAngle = calculateRelativeAngle(slideIndex, centerIndex);
    const distance = Math.abs(relativeAngle);
    const isCenter = distance === 0;
    const isLeft = relativeAngle < 0;

    // 只顯示距離中心 1 以內的卡片（即中心、左、右各一張）
    if (distance > 1) {
        return {
            transform: `translate(-50%, -50%) translateX(0) scale(0)`,
            zIndex: 0,
            opacity: 1,
            pointerEvents: 'none',
        };
    }

    // 水平排列：左邊卡片在左側，中心在中間，右邊卡片在右側
    // 讓左右兩邊的卡片往外露出一些
    const offset = window.innerWidth / 2 - 100;
    const x = isCenter ? 0 : isLeft ? -offset : offset;
    const scale = isCenter ? 1 : 0.8;
    const zIndex = isCenter ? 10 : 5;
    const opacity = isCenter ? 1 : 1;

    return {
        transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
        zIndex,
        opacity,
    };
}

/**
 * 計算桌面版樣式（圓圈排列）
 */
export function getDesktopSlideStyle(
    slideIndex: number,
    centerIndex: number
): SlideStyle {
    const relativeAngle = calculateRelativeAngle(slideIndex, centerIndex);

    const angleStep = 360 / TOTAL_SLIDES;
    const angle = relativeAngle * angleStep;

    const distance = Math.abs(relativeAngle);

    const distanceFactor = getDistanceFactor();
    const baseRadius = getResponsiveRadius(300); // ← 用響應式半徑
    const radius = baseRadius + distance * distanceFactor;

    const radian = (angle * Math.PI) / 180;
    const x = Math.sin(radian) * radius;
    const z = -Math.cos(radian) * radius;

    const scale = distance === 0 ? 1 : Math.max(0.3, 1 - distance * 0.15);
    const zIndex = distance === 0 ? 10 : Math.max(1, 10 - distance);

    return {
        transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${scale})`,
        zIndex,
    };
}


/**
 * 根據裝置類型計算樣式
 */
export function getSlideStyle(
    slideIndex: number,
    centerIndex: number,
    isMobile: boolean
): SlideStyle {
    if (isMobile) {
        return getMobileSlideStyle(slideIndex, centerIndex);
    }
    return getDesktopSlideStyle(slideIndex, centerIndex);
}

/**
 * 取得響應式半徑
 */
export function getResponsiveRadius(baseRadius: number): number {
    const w = window.innerWidth;

    if (w <= 1366 && w >= 1280) {
        return baseRadius * 0.82;
    }

    if (w <= 820) {
        return baseRadius * 0.7;
    }

    return baseRadius;
}

