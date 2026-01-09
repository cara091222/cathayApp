import FAQs from './FAQ';
import styles from './index.module.scss';
import FAQAccordion from './FAQAccordion';
import { useState, useMemo } from 'react';
import DecoSpot from '../../assets/deco-spot-1.png';

function FAQSection() {
   const allCategories = useMemo(() => {
    return FAQs.map((faq) => faq.category);
   }, []);

   const [currentCategory, setCurrentCategory] = useState(allCategories[0]);
   const currentCategoryFAQs = useMemo(() => {
    return FAQs.filter((faq) => faq.category === currentCategory);
   }, [currentCategory]);

    return (
        <div className={styles.faqSection} id="faq">
            <img src={DecoSpot} className={styles.decoSpot} />
            <h2>常見問題</h2>
            <div className={styles.faqContainer}>
                <div className={styles.faqCategories}>
                    {allCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setCurrentCategory(category)}
                            className={`${styles.faqCategoryButton} ${
                                currentCategory === category
                                    ? styles.activeCategory
                                    : ""
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className={styles.faqItems}>
                    {currentCategoryFAQs.length > 0 &&
                        currentCategoryFAQs[0].items.map((item, idx) => (
                            <FAQAccordion
                                key={`${currentCategory}-${idx}`}
                                title={item.title}
                                content={item.content}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default FAQSection;