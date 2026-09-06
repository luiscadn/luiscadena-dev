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
        style={{ objectPosition: 'center 20%' }}
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p>{t.hero.marquee}</p>
          <p>{t.hero.marquee}</p>
        </div>
      </div>
      <div className={styles.description}>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white" />
        </svg>
        <div className={styles.badge}>
          <p className={styles.name}>Luis Felipe Cadena</p>
          <p className={styles.role}>{t.hero.role}</p>
          <p className={styles.status}>
            <span className={styles.dot} />
            {t.hero.status}
          </p>
        </div>
      </div>
    </motion.main>
  )
}
