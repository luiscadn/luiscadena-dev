'use client';
import styles from './style.module.scss';
import Image from 'next/image';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { opacity } from './animation';
import { useLanguage } from '../../context/LanguageContext';

export default function Description() {
    const { t } = useLanguage();
    const phrase = t.about.headline;
    const description = useRef(null);
    const isInView = useInView(description, { once: true, amount: 0.1 });

    const handleScrollToContact = (e) => {
        e.preventDefault();
        const contactEl = document.querySelector('#contact');
        if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const renderFormattedText = (text) => {
        if (!text || typeof text !== 'string') return text;
        const parts = text.split(/(\*[^*]+\*)/g);
        return parts.map((part, idx) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={idx} className={styles.emphasis}>{part.slice(1, -1)}</em>;
            }
            return part;
        });
    };

    return (
        <section ref={description} id="about" className={styles.description}>
            <div className={styles.container}>
                {/* Editorial Section Header */}
                <div className={styles.sectionHeader}>
                    <div className={styles.headerLeft}>
                        <span className={styles.sectionNumber}>{t.about.sectionNum || "01"}</span>
                        <h2 className={styles.sectionTitle}>{t.about.sectionTitle || "About"}</h2>
                    </div>
                </div>

                <div className={styles.body}>
                    {/* Left Column: Mission headline, bio, action links, and compact community photo */}
                    <div className={styles.leftColumn}>
                        <motion.h3
                            variants={opacity}
                            animate={isInView ? "open" : "closed"}
                            className={styles.headline}
                        >
                            {renderFormattedText(phrase)}
                        </motion.h3>

                        <motion.p
                            variants={opacity}
                            animate={isInView ? "open" : "closed"}
                            className={styles.bioText}
                        >
                            {t.about.body}
                        </motion.p>

                        {/* Dataconale style editorial actions row */}
                        <motion.div
                            variants={opacity}
                            animate={isInView ? "open" : "closed"}
                            className={styles.actionRow}
                        >
                            <a
                                href={t.about.cvFile}
                                download
                                className={styles.primaryPill}
                                aria-label="Download Resume CV"
                            >
                                <span>{t.about.links?.resume || "Résumé ↓"}</span>
                            </a>
                            <a
                                href="https://github.com/luiscadn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.ghostLink}
                            >
                                <span>{t.about.links?.github || "GitHub ↗"}</span>
                            </a>
                            <a
                                href="https://linkedin.com/in/luis-felipe-cadena-cortes/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.ghostLink}
                            >
                                <span>{t.about.links?.linkedin || "LinkedIn ↗"}</span>
                            </a>
                            <a
                                href="#contact"
                                onClick={handleScrollToContact}
                                className={styles.ghostLink}
                            >
                                <span>{t.about.links?.contact || "Let's talk ↗"}</span>
                            </a>
                        </motion.div>

                        {/* Compact IEEE Community Card directly below the action buttons */}
                        <motion.div
                            variants={opacity}
                            animate={isInView ? "open" : "closed"}
                            className={styles.compactCommunity}
                        >
                            <div className={styles.compactImageFrame}>
                                <div className={styles.compactImageInner}>
                                    <Image
                                        src="/images/IEEE.jpg"
                                        alt="Universidad ICESI IEEE Student Branch Team"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 460px"
                                        className={styles.compactImg}
                                        quality={92}
                                    />
                                </div>
                            </div>
                            <div className={styles.compactCaption}>
                                <div className={styles.compactMeta}>
                                    <span className={styles.compactTag}>
                                        {t.about.communityTag || "COMMUNITY & LEADERSHIP"}
                                    </span>
                                    <h4 className={styles.compactHeading}>
                                        {t.about.communityTitle || "IEEE Student Branch — Universidad ICESI"}
                                    </h4>
                                </div>
                                <p className={styles.compactText}>
                                    {t.about.communityCaption || "Leading technical communication, brand identity, and student mentorship."}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: In short & Quick facts (Dataconale pattern) */}
                    <div className={styles.rightColumn}>
                        {/* In short. */}
                        <div className={styles.factGroup}>
                            <h4 className={styles.groupTitle}>{t.about.inShortTitle || "In short."}</h4>
                            <ul className={styles.inShortList}>
                                {(t.about.inShortItems || []).map((item) => (
                                    <li key={item.num} className={styles.inShortRow}>
                                        <span className={styles.rowNum}>{item.num}</span>
                                        <div className={styles.rowContent}>
                                            <strong className={styles.rowTitle}>{item.title}</strong>
                                            <span className={styles.rowSep}>—</span>
                                            <span className={styles.rowDetail}>{item.detail}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick facts */}
                        <div className={styles.factGroup}>
                            <h4 className={styles.groupTitle}>{t.about.quickFactsTitle || "Quick facts"}</h4>
                            <dl className={styles.quickFactsDl}>
                                {(t.about.quickFacts || []).map((fact, idx) => (
                                    <div key={idx} className={styles.quickFactRow}>
                                        <dt className={styles.factLabel}>{fact.label}</dt>
                                        <dd className={styles.factValue}>{fact.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
