import styles from '../PhoneSlider.module.scss';

function Slide5() {
    return (
        <div className={styles.slide}>
            <img className="slide-bg" src="./images/slide-5-bg.webp" />
            <img className="slide-hint" src="./images/hint-5.webp" />
            <img
                className="slide-grey-mask"
                src="./images/slide-grey-mask.png"
            />
        </div>
    );
}

export default Slide5;
