'use client';
import styles from './style.module.scss';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className={styles.switcher} role="group" aria-label="Language">
            <button
                type="button"
                className={language === 'en' ? styles.active : styles.inactive}
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
            >
                EN
            </button>
            <span className={styles.divider}>|</span>
            <button
                type="button"
                className={language === 'es' ? styles.active : styles.inactive}
                onClick={() => setLanguage('es')}
                aria-pressed={language === 'es'}
            >
                ES
            </button>
        </div>
    )
}
