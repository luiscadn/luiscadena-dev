"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import { useLanguage } from "../../context/LanguageContext";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function index() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(
            button.current,
            { scale: 0, duration: 0.25, ease: "power1.out" },
            setIsActive(false)
          );
        },
      },
    });
  }, []);

  return (
    <>
      <div ref={header} className={styles.header}>
        <div className={styles.leftGroup}>
          <div className={styles.logo}>
            <p className={styles.copyright}>©</p>
            <div className={styles.name}>
              <p className={styles.codeBy}>Code by</p>
              <p className={styles.luis}>Luis</p>
              <p className={styles.cadena}>Cadena</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
        <div className={styles.nav}>
          <Magnetic>
            <div className={styles.el}>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: "#work",
                    ease: "power2.out",
                  });
                }}
              >
                {t.nav.work}
              </a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a
                href="#description"
                onClick={(e) => {
                  e.preventDefault();
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: "#description",
                    ease: "power2.out",
                  });
                }}
              >
                {t.nav.about}
              </a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: "#experience",
                    ease: "power2.out",
                  });
                }}
              >
                {t.nav.experience}
              </a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: "#contact",
                    ease: "power2.out",
                  });
                }}
              >
                {t.nav.contact}
              </a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
        </div>
      </div>
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav setIsActive={setIsActive} />}</AnimatePresence>
    </>
  );
}
