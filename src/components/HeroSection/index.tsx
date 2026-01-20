import styles from "./index.module.scss";
import { useEffect } from "react";

import DecoRing1 from "../../assets/deco-ring-1.png";
import MobileDecoWave from "../../assets/mobile-deco-wave.svg";
import MobileDecoRing from "../../assets/mobile-ring.png";
import DecoWave from "../../assets/deco-wave.svg";
import DecoBigRing from "../../assets/big-ring.svg";

import PhoneSlider from "./PhoneSlider";
import PhoneLeft from "../../assets/phone_left.webp";
import PhoneRight from "../../assets/phone_right.webp";
import PhoneRightMobile from "../../assets/phone_right_mobile.webp";

// import BgVideo from "../../assets/bg-desktop.mp4";
import GooeyBg from "./GooeyBg";

function HeroSection() {
    useEffect(() => {
    const setRealVH = () => {
        const height =
        window.visualViewport?.height ?? window.innerHeight;

        document.documentElement.style.setProperty(
        "--real-vh",
        `${height * 0.01}px`
        );
    };

    setRealVH();

    const onFirstScroll = () => {
        setRealVH();
        window.removeEventListener("scroll", onFirstScroll);
    };

    window.addEventListener("scroll", onFirstScroll, { passive: true });

    return () => {
        window.removeEventListener("scroll", onFirstScroll);
    };
    }, []);

    return (
        <div className={styles.heroSectionWrapper}>
        <div className={styles.decos}>
            <img src={DecoRing1} alt="Deco Ring 1" className={styles.decoRing1} />
            <img src={DecoWave} alt="Deco Wave" className={styles.decoWave} />
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
        <div className={styles["hero-section"]}>
            <div className={styles["hero-section-container"]}>
            <div className={styles["phone-area"]}>
                <div className={styles["phone-left"]}>
                <img src={PhoneLeft} alt="Phone Left" />
                </div>
                <a href="https://www.cathaylife.com.tw/cathaylife/services/CathayLife-APP" className={styles["phone-right"]}>
                <img
                    src={PhoneRight}
                    alt="Phone Right"
                    className={styles["phone-right-desk"]}
                />
                <img
                    src={PhoneRightMobile}
                    alt="Phone Right"
                    className={styles["phone-right-mobile"]}
                />
                </a>
                <div className={styles["desc-wrap"]}>
                <p className={styles.descA}>掌握全家人的保單</p>
                <p className={styles.descB}>保障資訊一目瞭然</p>
                <p className={styles.descC}>保單借款隨借隨還</p>
                </div>
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>國泰人壽App</h1>
                {/* 注意：title-main-share 若不在 styles 內，請維持原樣或加入 styles */}
                <h2 className={`${styles.subtitle} title-main-share`}>
                提供您簡單、聰明又安全的
                <br />
                數位保險體驗
                </h2>
                <a
                href="https://cathay.app.link/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btn}
                >
                立即點擊下載
                </a>
            </div>
            </div>
            {/* 背景影片 */}
            <GooeyBg />
            <div className={styles["scroll-down"]}>
            <span>SCROLL</span>
            <div className={styles["line-wrap"]}></div>
            </div>
        </div>
        {/* <div className={styles.heroSection} id="hero">
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
                        </div> */}
        <div id="features" className={styles.featuresSection}>
            <PhoneSlider />
        </div>
        </div>
    );
}

export default HeroSection;
