import styles from './index.module.scss';

function NoteSection() {
    return (
        <div className={styles.noteSection}>
            <div className={styles.noteContainer}>
                <p className={styles.title}>注意事項</p>
                <div className={styles.content}>
                    <ol className={styles.list}>
                        <li>
                            版本資訊：iOS版本6.6.0 (請使用iOS 15以上裝置) /Android版本6.6.0 (請使用Android 10以上裝置)。
                        </li>
                        <li>
                            為確保您的個人資訊及帳務安全並降低您的交易風險，本APP請勿於破解脫逃 iOS/Android系統原設計之安全控制機制 (Jailbreak, Root)使用，並確保僅透過公司提供之管道下載。
                        </li>
                        <li>
                            提醒您安裝防護軟體以提升您的行動裝置安全性 (如提供「遠端鎖定」防止未經授權的使用者進入手機資料、以及「遠端抹除」（如清空聯絡人、訊息和記憶卡資料）的防盜安全系統功能之防護軟體)。
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default NoteSection;
