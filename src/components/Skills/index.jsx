'use client';
import { useState, useRef } from 'react';
import styles from './style.module.scss';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function Skills() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const [hoveredIdx, setHoveredIdx] = useState(null);

    const categories = t.skills?.categories || [];

    return (
        <section ref={sectionRef} id="skills" className={styles.skillsSection}>
            <div className={styles.container}>
                {/* Editorial Section Header */}
                <div className={styles.sectionHeader}>
                    <div className={styles.headerLeft}>
                        <span className={styles.sectionNumber}>{t.skills?.sectionNum || "02"}</span>
                        <h2 className={styles.sectionTitle}>{t.skills?.sectionTitle || "Skills & Architecture"}</h2>
                    </div>
                    {t.skills?.subtitle && (
                        <p className={styles.sectionSubtitle}>{t.skills.subtitle}</p>
                    )}
                </div>

                {/* Skills Grid */}
                <div className={styles.grid}>
                    {categories.map((cat, idx) => {
                        const isHovered = hoveredIdx === idx;
                        return (
                            <motion.div
                                key={cat.id || idx}
                                className={`${styles.categoryCard} ${isHovered ? styles.cardActive : ''}`}
                                style={{ '--card-accent': cat.accent }}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className={styles.cardTop}>
                                    <span className={styles.categoryIndex}>0{idx + 1} / 0{categories.length}</span>
                                    <h3 className={styles.categoryName}>{cat.category}</h3>
                                </div>

                                {/* Skills tags */}
                                <div className={styles.skillsWrap}>
                                    {cat.items.map((skill, sIdx) => (
                                        <span key={sIdx} className={styles.skillPill}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
