import Slide1 from './SlideItems/Slide1';
import Slide2 from './SlideItems/Slide2';
import Slide3 from './SlideItems/Slide3';
import Slide4 from './SlideItems/Slide4';
import Slide5 from './SlideItems/Slide5';
import Slide6 from './SlideItems/Slide6';
import Slide7 from './SlideItems/Slide7';
import Slide8 from './SlideItems/Slide8';
import type { SlideTitle } from './types';

export const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8];
export const TOTAL_SLIDES = slides.length;

export const AUTO_SLIDE_INTERVAL = 6000; // 自動輪播間隔時間（毫秒）
export const MOBILE_BREAKPOINT = 600; // 手機版斷點
export const HINT_DELAY = 1000; // hint 顯示延遲時間（毫秒）

export const SLIDE_TITLES: SlideTitle[] = [
    {
        main: "輕鬆掌握全家人保單",
        sec: "靈活切換個人及家庭視角",
    },
    {
        main: "保單、保費隨時查看",
        sec: "即時掌握繳費資訊",
    },
    {
        main: "保障資訊一目了然",
        sec: "讓保障內容更清晰透明",
    },
    {
        main: "保單借款隨借隨還",
        sec: "滿足多元財務需求",
    },
    {
        main: "快速掌握保險資產",
        sec: "投資績效隨時追蹤",
    },
    {
        main: "健康習慣一起養成",
        sec: "讓健康有利於你",
    },
    {
        main: "共享小樹生活圈",
        sec: "質感享樂多一點",
    },
    {
        main: "國泰人壽，榮耀見證",
        sec: "專業實力值得信賴",
    },
];

