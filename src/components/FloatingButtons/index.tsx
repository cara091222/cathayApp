import CathayLogoSmall from '../../assets/cathay-logo-small.svg';
import { smoothScrollTo } from '../../utils/smoothScrollTo';
import styles from './index.module.scss';
import { useEffect, useState, useRef } from 'react';

function FloatingButtons() {
    const [isVisible, setIsVisible] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // 往下滾動（currentScrollY > lastScrollY）
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(true);
            } 
            // 往上滾動（currentScrollY < lastScrollY）或回到頂部
            else if (currentScrollY < lastScrollY.current || currentScrollY <= 100) {
                setIsVisible(false);
            }
            
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

       return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        smoothScrollTo(0);
    }

    return (
        <div
            className={`${styles.floatingButtons} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <a
                href="https://cathay.app.link/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={CathayLogoSmall} alt="Cathay Logo Small" />
            </a>
            <button onClick={scrollToTop}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                >
                    <path
                        d="M6.5 12.5L12.5 7.5L18.5 12.5"
                        stroke="#29A86F"
                        stroke-width="2.5"
                        stroke-linecap="round"
                    />
                    <path
                        d="M12.5 9.5V21.25"
                        stroke="#29A86F"
                        stroke-width="2.5"
                        stroke-linecap="round"
                    />
                    <path
                        d="M4.5 2.5H19.5"
                        stroke="#29A86F"
                        stroke-width="2.5"
                        stroke-linecap="round"
                    />
                </svg>
            </button>
        </div>
    );
}

export default FloatingButtons;