import styles from '../PhoneSlider.module.scss';

function Slide6() {
    return (
        <div className={styles.slide}>
            <img className="slide-bg" src="./images/slide-6-bg.webp" />
            <img className="slide-hint" src="./images/hint-6.webp" />
            <img
                className="slide-grey-mask"
                src="./images/slide-grey-mask.png"
            />
        </div>
    );
}

export default Slide6;
