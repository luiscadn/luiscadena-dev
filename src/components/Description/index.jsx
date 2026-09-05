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
    const isInView = useInView(description)
    return (
        <div ref={description} id='description' className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map( (word, index) => {
                        return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                    })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
                    {t.about.body}
                </motion.p>
                <div>
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
    )
}
