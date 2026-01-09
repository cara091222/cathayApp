import styles from './index.module.scss';
import ScrollDown from './ScrollDown';

import DecoRing1 from '../../assets/deco-ring-1.png';
import MobileDecoWave from '../../assets/mobile-deco-wave.svg';
import MobileDecoRing from '../../assets/mobile-ring.png';
import DecoWave from '../../assets/deco-wave.svg';
import DecoBigRing from '../../assets/big-ring.svg';
import PhoneAnimation from './PhoneAnimation';
import GooeyBg from './GooeyBg';
import PhoneSlider from './PhoneSlider';

function HeroSection() {
    return (
        <div className={styles.heroSectionWrapper}>
            <div className={styles.decos}>
                <img
                    src={DecoRing1}
                    alt="Deco Ring 1"
                    className={styles.decoRing1}
                />
                <img
                    src={DecoWave}
                    alt="Deco Wave"
                    className={styles.decoWave}
                />
                <img
                    src={DecoBigRing}
                    alt="Deco Big Ring"
                    className={styles.decoBigRing}
                />
                <img
                    src={MobileDecoWave}
                    alt="Deco Wave"
                    className={styles.mobileDecoWave}
                />
                <img
                    src={MobileDecoRing}
                    alt="Mobile Deco Ring"
                    className={styles.mobileDecoRing}
                />
            </div>
            <div className={styles.heroSection} id="hero">
                <GooeyBg />
                <div className={styles.heroAnimationWrapper}>
                    <PhoneAnimation />
                    <div className={styles.content}>
                        <h1>國泰人壽App</h1>
                        <p>
                            提供您簡單、聰明又安全的
                            <br />
                            數位保險體驗
                        </p>
                        <a
                            href="https://cathay.app.link/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.downloadButton}
                        >
                            立即點擊下載
                        </a>
                    </div>
                </div>
                <ScrollDown className={styles.scrollDown} />
            </div>
            <div id="features" className={styles.featuresSection}>
                <PhoneSlider />
            </div>
        </div>
    );
}

export default HeroSection;