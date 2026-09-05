'use client';
import React, { useState } from 'react'
import styles from './style.module.scss';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function index({ index, title, tag, problem, architecture, impact, link, caseLabels, viewProjectLabel, manageModal }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.projectContainer}>
            <button
                type="button"
                onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY) }}
                onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY) }}
                onClick={() => setOpen((prev) => !prev)}
                className={styles.project}
                aria-expanded={open}
            >
                <span className={styles.heading}>
                    <h2>{title}</h2>
                    <p>{tag || "Systems Architecture"}</p>
                </span>
                <span className={`${styles.expandIcon} ${open ? styles.expandIconOpen : ''}`} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className={styles.caseStudy}
                    >
                        <div className={styles.caseStudyInner}>
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
                            <Link
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.caseLink}
                            >
                                {viewProjectLabel}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
