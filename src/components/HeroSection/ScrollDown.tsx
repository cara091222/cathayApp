import styles from './ScrollDown.module.scss';

function ScrollDown({ className }: { className?: string }) {
    return (
        <div className={`${styles.scrollDown} ${className}`}>
                <p className={styles.text}>SCROLL</p>
            <a href="#features" className={styles.scrollLink}>Scroll</a>
        </div>
    );
}

export default ScrollDown;