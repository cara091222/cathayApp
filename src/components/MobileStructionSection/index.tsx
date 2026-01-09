import styles from './index.module.scss';
import INSTRUCTIONS from '../StructionSection/INSTRUCTIONS';
import { useState, useRef, useEffect, useMemo } from 'react';

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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

function MobileStructionSection() {
    const buttonPanelRef = useRef<HTMLDivElement>(null);
    const detailButtonPanelRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
    const detailButtonRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
    const [currentInstruction, setCurrentInstruction] = useState<number>(0);
    const [isScrolledToEnd, setIsScrolledToEnd] = useState<boolean>(false);
    const [isScrolledToStart, setIsScrolledToStart] = useState<boolean>(true);
    const [currentDetailIndex, setCurrentDetailIndex] = useState<number>(0);

    const updateGlider = (button: HTMLButtonElement | null) => {
        if (!button || !buttonPanelRef.current) return;
        
        // 使用 offsetLeft 計算按鈕相對於 buttonPanel 的位置
        const relativeLeft = button.offsetLeft;
        buttonPanelRef.current.style.setProperty('--x', `${relativeLeft}px`);
        buttonPanelRef.current.style.setProperty('--w', `${button.offsetWidth}px`);
    };

    const updateDetailGlider = (button: HTMLButtonElement | null) => {
        if (!button || !detailButtonPanelRef.current) return;
        
        // 使用 offsetLeft 計算按鈕相對於 instructionDetailHeader 的位置
        const relativeLeft = button.offsetLeft;
        detailButtonPanelRef.current.style.setProperty('--x', `${relativeLeft}px`);
        detailButtonPanelRef.current.style.setProperty('--w', `${button.offsetWidth}px`);
    };

    const trimmedDetails = useMemo(() => {
        // use regex to remove 步驟一、步驟二、步驟三...
        return INSTRUCTIONS[currentInstruction].details.map(detail => {
            return {
                ...detail,
                title: detail.title.split('、')[1]
            }
        });
    }, [currentInstruction])


    
    const checkScrollPosition = () => {
        const element = buttonPanelRef.current;
        if (!element) return;

        const { scrollLeft, scrollWidth, clientWidth } = element;
        // 檢查是否已經滾動到底部（容差 5px）
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;
        setIsScrolledToEnd(isAtEnd);
        // 檢查是否已經滾動到最左邊（容差 5px）
        const isAtStart = scrollLeft <= 5;
        setIsScrolledToStart(isAtStart);
    };

    const handleDetailButtonClick = (index: number) => {
        setCurrentDetailIndex(index);

        const detailButtonElement = detailButtonPanelRef.current?.querySelector(`.detail-button.button-${index}`) as HTMLButtonElement;
        const detailButtonElementPositionRelativeToPanel = detailButtonElement.offsetLeft;
        // scroll to the button
        detailButtonPanelRef.current?.scrollTo({
            left: detailButtonElementPositionRelativeToPanel-50,
            behavior: 'smooth'
        });
        // 更新滑動下底線位置
        const button = detailButtonRefs.current.get(index);
        if (button) {
            requestAnimationFrame(() => updateDetailGlider(button));
        }
    }

    useEffect(() => {
        const element = buttonPanelRef.current;
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

    const handleInstructionClick = (index: number) => {
        setCurrentInstruction(index);
        // 當切換 instruction 時，重置 detail 到第一筆
        setCurrentDetailIndex(0);

        // get button
        const buttonElement = buttonPanelRef.current?.querySelector(`.button-${index}`) as HTMLButtonElement;
        const buttonElementPositionRelativeToPanel = buttonElement.offsetLeft;
        // scroll to the button
        buttonPanelRef.current?.scrollTo({
            left: buttonElementPositionRelativeToPanel - 20,
            behavior: 'smooth'
        });
        // 更新滑動背景位置
        const button = buttonRefs.current.get(index);
        if (button) {
            requestAnimationFrame(() => updateGlider(button));
        }
    }

    const handleArrowRightClick = () => {
        const nextIndex = currentInstruction + 1;
        // 確保不會超出範圍
        if (nextIndex < INSTRUCTIONS.length) {
            handleInstructionClick(nextIndex);
        }
    }

    const handleArrowLeftClick = () => {
        const prevIndex = currentInstruction - 1;
        // 確保不會超出範圍
        if (prevIndex >= 0) {
            handleInstructionClick(prevIndex);
        }
    }

    useEffect(() => {
        const detailButtonPanelElement = detailButtonPanelRef.current;
        if (!detailButtonPanelElement) return;
        detailButtonPanelElement.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    }, [currentInstruction]);

    useEffect(() => {
        const activeDetailButton = detailButtonRefs.current.get(currentDetailIndex);
        if (activeDetailButton) {
            requestAnimationFrame(() => {
                updateDetailGlider(activeDetailButton);
            });
        }
    }, [currentDetailIndex, currentInstruction]);

    useEffect(() => {
        const handleResize = () => {
            const activeDetailButton = detailButtonRefs.current.get(currentDetailIndex);
            if (activeDetailButton) {
                updateDetailGlider(activeDetailButton);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentDetailIndex, currentInstruction]);

    useEffect(() => {
        const activeButton = buttonRefs.current.get(currentInstruction);
        if (activeButton) {
            requestAnimationFrame(() => {
                updateGlider(activeButton);
            });
        }
    }, [currentInstruction]);

    useEffect(() => {
        const handleResize = () => {
            const activeButton = buttonRefs.current.get(currentInstruction);
            if (activeButton) {
                updateGlider(activeButton);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentInstruction]);

    return (
        <div className={styles.mobileStructionSection} id="instructions">
            <h2>操作流程說明</h2>
            <div className={styles.mobileStructionSectionContent}>
                <div className={styles.buttonPanelContainer}>
                    <div className={styles.buttonPanel} ref={buttonPanelRef}>
                        <div className={styles.glider} />
                        {INSTRUCTIONS.map((instruction, index) => {
                            return (
                                <button
                                    key={index}
                                    ref={(el) => {
                                        if (el) {
                                            buttonRefs.current.set(index, el);
                                        } else {
                                            buttonRefs.current.delete(index);
                                        }
                                    }}
                                    onClick={() =>
                                        handleInstructionClick(index)
                                    }
                                    className={`panel-button button-${index} ${
                                        currentInstruction === index
                                            ? styles.activeButton
                                            : ""
                                    }`}
                                >
                                    <h3>{instruction.title}</h3>
                                </button>
                            );
                        })}
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
                <p className={styles.instructionText}>
                    {INSTRUCTIONS[currentInstruction].text}
                </p>
            </div>
            <div className={styles.instructionDetailContainer}>
                <div
                    className={styles.instructionDetailHeader}
                    ref={detailButtonPanelRef}
                >
                    <div className={styles.detailGlider} />
                    <div className={styles.detailButtonList}>
                        {trimmedDetails.map((detail, index) => {
                            return (
                                <button
                                    key={index}
                                    ref={(el) => {
                                        if (el) {
                                            detailButtonRefs.current.set(
                                                index,
                                                el
                                            );
                                        } else {
                                            detailButtonRefs.current.delete(
                                                index
                                            );
                                        }
                                    }}
                                    className={`${styles.detailButton} ${
                                        currentDetailIndex === index
                                            ? styles.activeDetailButton
                                            : ""
                                    } detail-button button-${index}`}
                                    onClick={() =>
                                        handleDetailButtonClick(index)
                                    }
                                >
                                    <small>{index + 1}</small>
                                    {detail.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.instructionDetailImages}>
                    {INSTRUCTIONS[currentInstruction].details[
                        currentDetailIndex
                    ].images.map((image, index) => {
                        return (
                            <img
                                key={index}
                                src={image}
                                alt={`Step ${currentInstruction + 1} - ${
                                    index + 1
                                }`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MobileStructionSection;