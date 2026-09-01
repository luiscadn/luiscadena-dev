'use client';
import React, { useState } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animation';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Link from './Link';
import Curve from './Curve';
import Footer from './Footer';

// Registrar el plugin
gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { title: "Home", href: "#landing" },
  { title: "Work", href: "#work" },
  { title: "About", href: "#description" },
  { title: "Experience", href: "#experience" },
  { title: "Contact", href: "#contact" },
];

export default function Index({ setIsActive }) {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  const handleSmoothScroll = (href) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetElement, offsetY: 80 },
        ease: "power2.out",
      });
    }
    // Cierra el menú
    setIsActive(false);
  };

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => (
            <div
              key={index}
              onClick={() => handleSmoothScroll(data.href)} // Cierra el menú y realiza el scroll
            >
              <Link
                data={{ ...data, index }}
                isActive={selectedIndicator === data.href}
                setSelectedIndicator={setSelectedIndicator}
              />
            </div>
          ))}
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
}

