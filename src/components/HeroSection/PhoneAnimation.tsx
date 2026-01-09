import { useEffect, useState } from 'react';
import styles from './PhoneAnimation.module.scss';
import PhoneLeft from '../../assets/phone_left.webp';
import PhoneRight from '../../assets/phone_right.webp';
import PhoneRightMobile from '../../assets/phone_right_mobile.webp';

function PhoneAnimation() {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // 組件掛載後觸發動畫，使用 setTimeout 確保 DOM 已渲染
        const timer = setTimeout(() => {
            setIsAnimating(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.phoneAnimation}>
            <div className={styles.phoneText}>
                <p className={`${styles.textLine1} ${isAnimating ? styles.fadeIn : ''}`}>
                    掌握全家人的保單
                </p>
                <p className={`${styles.textLine2} ${isAnimating ? styles.fadeIn : ''}`}>
                    保障資訊一目瞭然
                </p>
                <p className={`${styles.textLine3} ${isAnimating ? styles.fadeIn : ''}`}>
                    保單借款隨借隨還
                </p>
            </div>
            <img
                src={PhoneLeft}
                alt="Phone Left"
                className={`${styles.phoneLeft} ${isAnimating ? styles.fadeIn : ''}`}
            />
            <img
                src={PhoneRight}
                alt="Phone Right"
                className={`${styles.phoneRight} ${isAnimating ? styles.fadeIn : ''}`}
            />
            <img 
                src={PhoneRightMobile}
                alt="Phone Right Mobile"
                className={`${styles.phoneRightMobile} ${isAnimating ? styles.fadeIn : ''}`}
            />
        </div>
    );
}

export default PhoneAnimation;