/**
 * PhoneSlider 相關的型別定義
 */

/**
 * 過渡狀態
 */
export interface TransitionState {
    targetIndex: number | null;
    direction: number;
}

/**
 * 距離和方向
 */
export interface DistanceAndDirection {
    distance: number;
    direction: number;
}

/**
 * Slide 標題資料
 */
export interface SlideTitle {
    main: string;
    sec: string;
}

