'use client';
import React from 'react'
import styles from './style.module.scss';
import Link from 'next/link';

export default function index({index, title, tag, link, manageModal}) {

    return (
        <Link 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectContainer}
        >
        <div onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}} onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}} className={styles.project}>
            <h2>{title}</h2>
            <p>{tag || "Engineering & Architecture"}</p>
        </div>
        </Link>
    )
}
