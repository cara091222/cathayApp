import { useEffect, useRef } from 'react';
import styles from './GooeyBg.module.scss';
import DesktopBG from '../../assets/bg-desktop.mp4';
import MobileBG from '../../assets/bg-mobile.mp4';

function GooeyBg() {
    const desktopVideoRef = useRef<HTMLVideoElement>(null);
    const mobileVideoRef = useRef<HTMLVideoElement>(null);
    const desktopPlayedRef = useRef(false);
    const mobilePlayedRef = useRef(false);

    useEffect(() => {
        // 阻止所有互動事件（播放前、播放中、播放完畢都禁用）
        const preventAllInteraction = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        };

        // 播放完成後，確保停在最後一幀
        const handleEnded = (e: Event) => {
            const video = e.target as HTMLVideoElement;
            if (video) {
                video.pause();
            }
        };

        // 桌面版播放邏輯
        const setupDesktopVideo = () => {
            const desktopVideo = desktopVideoRef.current;
            if (!desktopVideo || desktopPlayedRef.current) return;

            const playDesktop = () => {
                if (desktopPlayedRef.current) return;
                desktopVideo.currentTime = 0;
                desktopVideo.play().catch(() => {
                    // 忽略自動播放被阻止的錯誤
                });
                desktopPlayedRef.current = true;
            };

            const handleDesktopCanPlay = () => {
                if (!desktopPlayedRef.current) {
                    playDesktop();
                }
            };

            // 禁用所有互動事件
            desktopVideo.addEventListener('click', preventAllInteraction);
            desktopVideo.addEventListener('dblclick', preventAllInteraction);
            desktopVideo.addEventListener('touchstart', preventAllInteraction);
            desktopVideo.addEventListener('touchmove', preventAllInteraction);
            desktopVideo.addEventListener('touchend', preventAllInteraction);
            desktopVideo.addEventListener('contextmenu', preventAllInteraction);
            desktopVideo.addEventListener('canplay', handleDesktopCanPlay);
            desktopVideo.addEventListener('ended', handleEnded);

            // 如果已經可以播放，直接播放
            if (desktopVideo.readyState >= 3) {
                playDesktop();
            }

            return () => {
                desktopVideo.removeEventListener('click', preventAllInteraction);
                desktopVideo.removeEventListener('dblclick', preventAllInteraction);
                desktopVideo.removeEventListener('touchstart', preventAllInteraction);
                desktopVideo.removeEventListener('touchmove', preventAllInteraction);
                desktopVideo.removeEventListener('touchend', preventAllInteraction);
                desktopVideo.removeEventListener('contextmenu', preventAllInteraction);
                desktopVideo.removeEventListener('canplay', handleDesktopCanPlay);
                desktopVideo.removeEventListener('ended', handleEnded);
            };
        };

        // 手機版播放邏輯
        const setupMobileVideo = () => {
            const mobileVideo = mobileVideoRef.current;
            if (!mobileVideo || mobilePlayedRef.current) return;

            const playMobile = () => {
                if (mobilePlayedRef.current) return;
                mobileVideo.currentTime = 0;
                mobileVideo.play().catch(() => {
                    // 忽略自動播放被阻止的錯誤
                });
                mobilePlayedRef.current = true;
            };

            const handleMobileCanPlay = () => {
                if (!mobilePlayedRef.current) {
                    // 檢查元素是否可見
                    const computedStyle = window.getComputedStyle(mobileVideo);
                    const isVisible = computedStyle.display !== 'none';
                    if (isVisible) {
                        playMobile();
                    }
                }
            };

            // 禁用所有互動事件
            mobileVideo.addEventListener('click', preventAllInteraction);
            mobileVideo.addEventListener('dblclick', preventAllInteraction);
            mobileVideo.addEventListener('touchstart', preventAllInteraction);
            mobileVideo.addEventListener('touchmove', preventAllInteraction);
            mobileVideo.addEventListener('touchend', preventAllInteraction);
            mobileVideo.addEventListener('contextmenu', preventAllInteraction);
            mobileVideo.addEventListener('canplay', handleMobileCanPlay);
            mobileVideo.addEventListener('loadeddata', handleMobileCanPlay);
            mobileVideo.addEventListener('ended', handleEnded);

            // 檢查並播放手機版影片
            const checkAndPlayMobile = () => {
                const computedStyle = window.getComputedStyle(mobileVideo);
                const isVisible = computedStyle.display !== 'none';
                
                if (isVisible && !mobilePlayedRef.current) {
                    // 確保影片已載入
                    if (mobileVideo.readyState === 0) {
                        // 如果還沒開始載入，強制載入
                        mobileVideo.load();
                    }
                    
                    // 如果已經可以播放，直接播放
                    if (mobileVideo.readyState >= 3) {
                        playMobile();
                    }
                }
            };

            // 使用 IntersectionObserver 檢測元素是否可見
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !mobilePlayedRef.current) {
                            // 元素可見且還沒播放過
                            checkAndPlayMobile();
                        }
                    });
                },
                {
                    threshold: 0.1, // 當 10% 的元素可見時觸發
                }
            );

            observer.observe(mobileVideo);

            // 初始檢查（多次嘗試，確保在樣式應用後能播放）
            setTimeout(checkAndPlayMobile, 100);
            setTimeout(checkAndPlayMobile, 300);
            setTimeout(checkAndPlayMobile, 500);
            setTimeout(checkAndPlayMobile, 1000);

            return () => {
                mobileVideo.removeEventListener('click', preventAllInteraction);
                mobileVideo.removeEventListener('dblclick', preventAllInteraction);
                mobileVideo.removeEventListener('touchstart', preventAllInteraction);
                mobileVideo.removeEventListener('touchmove', preventAllInteraction);
                mobileVideo.removeEventListener('touchend', preventAllInteraction);
                mobileVideo.removeEventListener('contextmenu', preventAllInteraction);
                mobileVideo.removeEventListener('canplay', handleMobileCanPlay);
                mobileVideo.removeEventListener('loadeddata', handleMobileCanPlay);
                mobileVideo.removeEventListener('ended', handleEnded);
                observer.disconnect();
            };
        };

        const cleanupDesktop = setupDesktopVideo();
        const cleanupMobile = setupMobileVideo();

        return () => {
            cleanupDesktop?.();
            cleanupMobile?.();
        };
    }, []);

    return (
        <div className={styles.container}>
            <video 
                ref={desktopVideoRef}
                src={DesktopBG}
                className={styles.desktopBG}
                loop={false}
                playsInline
                muted
                preload="auto"
                controls={false}
                disablePictureInPicture
            />
            <video 
                ref={mobileVideoRef}
                src={MobileBG}
                className={styles.mobileBG}
                loop={false}
                playsInline
                muted
                preload="auto"
                controls={false}
                disablePictureInPicture
            />
        </div>
    );
}

export default GooeyBg;