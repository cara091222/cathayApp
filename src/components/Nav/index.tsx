import { useState } from 'react';
import CathayLogo from '../../assets/cathay-logo.svg';
import styles from './index.module.scss';
import { smoothScrollTo, getPosition } from '../../utils/smoothScrollTo';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (target: string) => {
        // 特色功能移動到第二屏輪播
        // 其他則依照區域標題移動到對應錨點
        const targetElement = document.getElementById(target);
        const targetPosition = getPosition(targetElement).y;
        const navHeight = document.querySelector('nav')?.offsetHeight || 0;
        const offset = window.innerWidth > 768 ? 80 : 0;
        if (targetElement) {
            smoothScrollTo(targetPosition - navHeight + offset);
        }
        // 關閉選單
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuItems = [
        { id: 'features', label: '特色功能' },
        { id: 'instructions', label: '操作流程' },
        { id: 'events', label: '活動專區' },
        { id: 'faq', label: '常見問題' },
    ];

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.logoSection}>
                    <a
                        href="https://www.cathaylife.com.tw/official/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={CathayLogo}
                            alt="國泰人壽"
                            className={styles.logo}
                        />
                    </a>
                </div>
                <div className={styles.navButtons}>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={styles.navButton}
                            onClick={() => handleNavClick(item.id)}
                        >
                            <p>{item.label}</p>
                        </button>
                    ))}
                </div>
                <button
                    className={styles.hamburgerButton}
                    onClick={toggleMenu}
                    aria-label="選單"
                >
                    {!isMenuOpen ? (
                        <svg
                            className={styles.openIcon}
                            width="33"
                            height="30"
                            viewBox="0 0 33 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.25 5H31.25"
                                stroke="#1F1F1F"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M1.25 15H31.25"
                                stroke="#1F1F1F"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M1.25 25H31.25"
                                stroke="#1F1F1F"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            className={styles.closeIcon}
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 24.3022L26.9813 5.01862"
                                stroke="#1F1F1F"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M4 5L26.9813 24.2836"
                                stroke="#1F1F1F"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    )}
                </button>
            </nav>
            {isMenuOpen && (
                <div className={styles.mobileMenuOverlay} onClick={toggleMenu}>
                    <div
                        className={styles.mobileMenu}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                className={styles.mobileMenuItem}
                                onClick={() => handleNavClick(item.id)}
                            >
                                <p>{item.label}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Nav;
