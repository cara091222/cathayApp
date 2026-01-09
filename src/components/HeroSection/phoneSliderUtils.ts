import { TOTAL_SLIDES, MOBILE_BREAKPOINT } from './phoneSliderConstants';
import type { DistanceAndDirection } from './types';

/**
 * 計算兩個方向的路徑長度和方向
 */
export function getDistanceAndDirection(
    fromIndex: number,
    toIndex: number
): DistanceAndDirection {
    if (fromIndex === toIndex) return { distance: 0, direction: 0 };

    // 計算順時針方向的距離
    let forward = toIndex - fromIndex;
    if (forward < 0) forward += TOTAL_SLIDES;

    // 計算逆時針方向的距離
    let backward = fromIndex - toIndex;
    if (backward < 0) backward += TOTAL_SLIDES;

    // 選擇較短的路徑
    if (forward <= backward) {
        return { distance: forward, direction: 1 }; // 順時針（向右，+1）
    } else {
        return { distance: backward, direction: -1 }; // 逆時針（向左，-1）
    }
}

/**
 * 根據距離計算移動間隔時間（距離越遠，間隔越短，移動越快）
 */
export function getIntervalByDistance(distance: number): number {
    // 基礎間隔 200ms，距離越遠間隔越短
    // 最小間隔 40ms，最大間隔 200ms
    const interval = Math.max(40, 200 - (distance - 1) * 20);
    return interval;
}

/**
 * 計算下一個 index（根據方向）
 */
export function getNextIndex(current: number, direction: number): number {
    let next = current + direction;
    if (next < 0) next += TOTAL_SLIDES;
    if (next >= TOTAL_SLIDES) next -= TOTAL_SLIDES;
    return next;
}

/**
 * 計算相對角度（處理無限輪播，選擇較短的路徑）
 */
export function calculateRelativeAngle(slideIndex: number, centerIndex: number): number {
    let relativeAngle = slideIndex - centerIndex;

    // 處理無限輪播，選擇較短的路徑
    if (relativeAngle > TOTAL_SLIDES / 2) {
        relativeAngle -= TOTAL_SLIDES;
    } else if (relativeAngle < -TOTAL_SLIDES / 2) {
        relativeAngle += TOTAL_SLIDES;
    }

    return relativeAngle;
}

/**
 * 計算距離因子（用於動態調整半徑）
 */
export function getDistanceFactor(): number {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
        return 20;
    }
    return Math.min(window.innerWidth * 0.02, 40);
}

