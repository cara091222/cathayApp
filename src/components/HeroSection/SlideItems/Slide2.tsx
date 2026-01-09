import styles from '../PhoneSlider.module.scss';

function Slide2() {
    return (
        <div className={styles.slide}>
            <img className="slide-bg" src="./images/slide-2-bg.webp" />
            <img className="slide-hint" src="./images/hint-2.webp" />
            <img
                className="slide-grey-mask"
                src="./images/slide-grey-mask.png"
            />
        </div>
    );
}

export default Slide2;
