'use client';
import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import { useLanguage } from '../../context/LanguageContext';

export default function index() {

    const { t } = useLanguage();
    const phrase = t.about.headline;
    const description = useRef(null);
    const isInView = useInView(description, { once: true, amount: 0.15 })
    return (
        <div ref={description} id='description' className={styles.description}>
            <div className={styles.body}>
                <p className={styles.headline}>
                {
                    phrase.split(" ").map( (word, index) => {
                        return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                    })
                }
                </p>
                <div className={styles.rightColumn}>
                    <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
                        {t.about.body}
                    </motion.p>
                    <motion.ul variants={opacity} animate={isInView ? "open" : "closed"} className={styles.metrics}>
                        {t.about.metrics.map((metric, i) => (
                            <li key={metric.label} className={styles.metric}>
                                <span className={styles.metricIndex} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                <span className={styles.metricLabel}>{metric.label}</span>
                                <span className={styles.metricDetail}>{metric.detail}</span>
                            </li>
                        ))}
                    </motion.ul>
                    <div className={styles.buttonWrapper}>
                        <Rounded className={styles.button}>
                            <a href={t.about.cvFile} target="_blank" rel="noopener noreferrer" className='link' download>
                                <p className={styles.labelDesktop}>{t.about.cvLabelDesktopLine1} <br />{t.about.cvLabelDesktopLine2}</p>
                                <span className={styles.labelMobile}>
                                    <span>{t.about.cvLabelMobile}</span>
                                    <span aria-hidden="true">↓</span>
                                </span>
                            </a>
                        </Rounded>
                    </div>
                </div>
            </div>
        </div>
    )
}
