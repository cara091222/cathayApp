import styles from '../PhoneSlider.module.scss';

function Slide7() {
    return (
        <div className={styles.slide}>
            <img className="slide-bg" src="./images/slide-7-bg.webp" />
            <img className="slide-hint" src="./images/hint-7.webp" />
            <img
                className="slide-grey-mask"
                src="./images/slide-grey-mask.png"
            />
        </div>
    );
}

export default Slide7;
