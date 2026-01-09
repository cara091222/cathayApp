import styles from './index.module.scss';
import FAQs from '../FAQSection/FAQ';
import { useState, useRef, useEffect } from 'react';
import FAQAccordion from '../FAQSection/FAQAccordion';
import DecoSpot from '../../assets/mobile-deco-spot.svg';

const ArrowRight = ({ ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        {...props}
    >
        <path
            d="M0.999999 1L9 9L1 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ArrowLeft = ({ ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        {...props}
    >
        <path
            d="M9 1L1 9L9 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

function MobileFAQSection() {
    const [currentCategory, setCurrentCategory] = useState(0);
    const faqButtonListRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
    const [isScrolledToEnd, setIsScrolledToEnd] = useState<boolean>(false);
    const [isScrolledToStart, setIsScrolledToStart] = useState<boolean>(true);

    const updateGlider = (button: HTMLButtonElement | null) => {
        if (!button || !faqButtonListRef.current) return;
        
        // 使用 offsetLeft 計算按鈕相對於 faqButtonList 的位置
        // glider 現在在 faqButtonList 內，所以不需要加 padding
        const relativeLeft = button.offsetLeft;
        faqButtonListRef.current.style.setProperty('--x', `${relativeLeft}px`);
        faqButtonListRef.current.style.setProperty('--w', `${button.offsetWidth}px`);
    };

    const checkScrollPosition = () => {
        const element = faqButtonListRef.current;
        if (!element) return;

        const { scrollLeft, scrollWidth, clientWidth } = element;
        // 檢查是否已經滾動到底部（容差 5px）
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;
        setIsScrolledToEnd(isAtEnd);
        // 檢查是否已經滾動到最左邊（容差 5px）
        const isAtStart = scrollLeft <= 5;
        setIsScrolledToStart(isAtStart);
    };

    useEffect(() => {
        const element = faqButtonListRef.current;
        if (!element) return;

        // 初始檢查
        checkScrollPosition();

        // 監聽滾動事件
        element.addEventListener('scroll', checkScrollPosition);
        
        // 監聽視窗大小變化（可能影響 clientWidth）
        window.addEventListener('resize', checkScrollPosition);

        return () => {
            element.removeEventListener('scroll', checkScrollPosition);
            window.removeEventListener('resize', checkScrollPosition);
        };
    }, []);

    useEffect(() => {
        const activeButton = buttonRefs.current.get(currentCategory);
        if (activeButton) {
            requestAnimationFrame(() => {
                updateGlider(activeButton);
            });
        }
    }, [currentCategory]);

    useEffect(() => {
        const handleResize = () => {
            const activeButton = buttonRefs.current.get(currentCategory);
            if (activeButton) {
                updateGlider(activeButton);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentCategory]);

    const handleFAQButtonClick = (index: number) => {
        setCurrentCategory(index);
        const faqButtonElement = faqButtonListRef.current?.querySelector(`.faq-button-${index}`) as HTMLButtonElement;
        const faqButtonElementPositionRelativeToPanel = faqButtonElement.offsetLeft;
        // scroll to the button
        faqButtonListRef.current?.scrollTo({
            left: faqButtonElementPositionRelativeToPanel - 20,
            behavior: 'smooth'
        });
        // 更新滑動背景位置
        const button = buttonRefs.current.get(index);
        if (button) {
            requestAnimationFrame(() => updateGlider(button));
        }
    }

    const handleArrowRightClick = () => {
        const nextIndex = currentCategory + 1;
        // 確保不會超出範圍
        if (nextIndex < FAQs.length) {
            handleFAQButtonClick(nextIndex);
        }
    }

    const handleArrowLeftClick = () => {
        const prevIndex = currentCategory - 1;
        // 確保不會超出範圍
        if (prevIndex >= 0) {
            handleFAQButtonClick(prevIndex);
        }
    }

    return (
        <div className={styles.mobileFAQSection} id="faq">
            <img src={DecoSpot} className={styles.decoSpot} />
            <h3>常見問題</h3>
            <div className={styles.faqButtonContainer}>
                <div className={styles.faqButtonList} ref={faqButtonListRef}>
                    <div className={styles.glider} />
                    {FAQs.map((faq, index) => (
                        <button
                            key={faq.category}
                            ref={(el) => {
                                if (el) {
                                    buttonRefs.current.set(index, el);
                                } else {
                                    buttonRefs.current.delete(index);
                                }
                            }}
                            onClick={() => handleFAQButtonClick(index)}
                            className={`${styles.faqButton} ${
                                currentCategory === index
                                    ? styles.activeFAQButton
                                    : ""
                            } faq-button-${index}`}
                        >
                            {faq.category}
                        </button>
                    ))}
                </div>
                <div
                    className={`${styles.arrowLeft} ${
                        isScrolledToStart ? styles.hidden : ""
                    }`}
                    onClick={handleArrowLeftClick}
                >
                    <ArrowLeft />
                </div>
                <div
                    className={`${styles.arrowRight} ${
                        isScrolledToEnd ? styles.hidden : ""
                    }`}
                    onClick={handleArrowRightClick}
                >
                    <ArrowRight />
                </div>
            </div>
            <div>
                {FAQs[currentCategory].items.map((item, idx) => (
                    <FAQAccordion
                        key={`${currentCategory}-${idx}`}
                        title={item.title}
                        content={item.content}
                    />
                ))}
            </div>
        </div>
    );
}

export default MobileFAQSection;