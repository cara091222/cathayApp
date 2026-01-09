import styles from './index.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                © 國泰人壽保險股份有限公司 Cathay Life Insurance | All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
