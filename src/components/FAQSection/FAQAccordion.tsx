import styles from './FAQAccordion.module.scss';
import { useRef, useState, useEffect } from 'react';

interface FAQAccordionProps {
    title: string;
    content: string | React.ReactNode;
}

function FAQAccordion({ title, content }: FAQAccordionProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (!contentRef.current) return;

        const content = contentRef.current;
        
        if (!isOpen) {
            // 展開
            setIsOpen(true);
            // 計算實際高度並設置
            const height = content.scrollHeight;
            content.style.maxHeight = `${height}px`;
        } else {
            // 收合：先設置狀態，然後立即開始動畫
            setIsOpen(false);
            
            // 獲取當前高度
            const height = content.scrollHeight;
            content.style.maxHeight = `${height}px`;
            
            // 強制重排，確保瀏覽器應用了 maxHeight
            void content.offsetHeight;
            
            // 立即開始收合動畫（不需要等待 requestAnimationFrame）
            content.style.maxHeight = '0px';
        }
    };

    // 當內容改變時，如果已展開，更新高度
    useEffect(() => {
        if (isOpen && contentRef.current) {
            const content = contentRef.current;
            content.style.maxHeight = `${content.scrollHeight}px`;
        }
    }, [content, isOpen]);

    return (
        <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
            <div className={styles.faqTitle} onClick={handleToggle}>
                <span>{title}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                >
                    <circle
                        cx="15"
                        cy="15"
                        r="14.5"
                        transform="matrix(-1 0 0 1 30 0)"
                        stroke="#1F1F1F"
                    />
                    <path
                        className={styles.faqArrowIcon}
                        d="M20.0898 12.9464L15.6256 17.4106L11.1613 12.9464"
                        stroke="#1F1F1F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div 
                ref={contentRef}
                className={`${styles.faqContent} faq-content`}
            >
                <div className={styles.faqContentInner}>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default FAQAccordion;

