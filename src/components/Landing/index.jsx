'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function Home() {

  const slider = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      onUpdate: (self) => {
        if (slider.current) {
          slider.current.style.animationDirection = self.direction === 1 ? "normal" : "reverse";
        }
      },
    });

    return () => trigger.kill();
  }, [])

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Image
        id='landing'
        src="/images/HelloWorld.webp"
        fill={true}
        alt="Luis Felipe Cadena"
        sizes="100vw"
        priority
        quality={95}
        className={styles.heroImage}
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p>{t.hero.marquee}</p>
          <p>{t.hero.marquee}</p>
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.badge}>
          <div className={styles.badgeHeader}>
            <h1 className={styles.name}>Luis Felipe Cadena</h1>
            <div className={styles.statusBadge}>
              <span className={styles.dot} />
              <span className={styles.statusText}>{t.hero.statusBadge || 'Open to work'}</span>
            </div>
          </div>
          <p className={styles.role}>{t.hero.role}</p>
        </div>
      </div>
    </motion.main>
  )
}
