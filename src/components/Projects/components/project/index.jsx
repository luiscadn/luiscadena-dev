'use client';
import React from 'react'
import styles from './style.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function index({ index, title, tag, problem, architecture, impact, link, src, color, caseLabels, ctaLabel, isOpen, onToggle, manageModal }) {

    return (
        <div className={styles.projectContainer}>
            <button
                type="button"
                onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }}
                onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }}
                onClick={onToggle}
                className={styles.project}
                aria-expanded={isOpen}
            >
                <span className={styles.heading}>
                    <h2>{title}</h2>
                    <p>{tag || "Systems Architecture"}</p>
                </span>
                <span className={`${styles.expandIcon} ${isOpen ? styles.expandIconOpen : ''}`} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className={styles.caseStudy}
                    >
                        <div className={styles.caseStudyInner}>
                            <div className={styles.caseStudyImage}>
                                <div className={styles.imageFrame}>
                                    <div className={styles.imageInner} style={{ backgroundColor: color }}>
                                        <Image
                                            src={`/images/${src}`}
                                            fill
                                            sizes="(min-width: 1024px) 400px, 100vw"
                                            alt={`${title} project preview`}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.caseStudyContent}>
                                <div className={styles.caseBlock}>
                                    <span className={styles.caseLabel}>{caseLabels.problem}</span>
                                    <p>{problem}</p>
                                </div>
                                <div className={styles.caseBlock}>
                                    <span className={styles.caseLabel}>{caseLabels.architecture}</span>
                                    <p className={styles.pipeline}>{architecture?.join(" → ")}</p>
                                </div>
                                <div className={styles.caseBlock}>
                                    <span className={`${styles.caseLabel} ${styles.caseLabelRisk}`}>{caseLabels.impact}</span>
                                    <p>{impact}</p>
                                </div>
                                <div className={styles.caseActions}>
                                    <Link
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.ctaPrimary}
                                    >
                                        {ctaLabel}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
