import styles from '../PhoneSlider.module.scss';

function Slide4() {
    return (
        <div className={styles.slide}>
            <img className="slide-bg" src="./images/slide-4-bg.webp" />
            <img className="slide-hint" src="./images/hint-4.webp" />
            <img
                className="slide-grey-mask"
                src="./images/slide-grey-mask.png"
            />
        </div>
    );
}

export default Slide4;
