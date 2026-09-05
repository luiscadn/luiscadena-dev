import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRef } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Magnetic from "../../common/Magnetic";
import "./index.css";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

export default function index() {
  const { t } = useLanguage();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  return (
    <div ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.titleRow}>
            <div className={styles.imageContainer}>
              <Image
                fill={true}
                alt={"Luis Felipe Cadena"}
                src={`/images/Coding.webp`}
                sizes="100px"
                style={{ objectPosition: 'center 15%' }}
              />
            </div>
            <h2>{t.footer.buildLine1}</h2>
          </div>
          <h2 id="together">{t.footer.buildLine2}</h2>
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Link
              href="https://linkedin.com/in/luis-felipe-cadena-cortes/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.connectButton}
            >
              <span className={styles.linkedinIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.72.78-1.72 1.73a1.73 1.73 0 0 0 1.72 1.73 1.73 1.73 0 0 0 1.72-1.73Z"/>
                </svg>
              </span>
              <span className={styles.connectLabel}>
                <span className={styles.labelTrack}>
                  <span>LinkedIn</span>
                  <span>{t.footer.connectLabel}</span>
                </span>
              </span>
              <span className={styles.connectArrow}>→</span>
            </Link>
          </motion.div>
          <motion.svg
            className={styles.decorativeArrow}
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded backgroundColor="#F8FAFC" textColor="#203B5A">
          <a href="mailto:lfcadenac@outlook.com" className="links">
            <p>lfcadenac@outlook.com</p>
          </a>
          </Rounded>
          <Rounded backgroundColor="#F8FAFC" textColor="#203B5A">
            <Link href="https://github.com/luiscadn" target="_blank" rel="noopener noreferrer" className="links">
              <p>GitHub @luiscadn</p>
            </Link>
          </Rounded>
        </div>
        <div id="contact" className={styles.info}>
          <div>
            <span>
              <h3>{t.footer.locationTitle}</h3>
              <p>{t.footer.locationValue}</p>
            </span>
          </div>
          <div>
            <span>
              <h3>{t.footer.connectTitle}</h3>
              <Magnetic>
              <Link href="https://linkedin.com/in/luis-felipe-cadena-cortes/" target="_blank" rel="noopener noreferrer" className="links">
                <p>LinkedIn</p>
              </Link>
              </Magnetic>
            </span>
            <Magnetic>
            <Link href="https://github.com/luiscadn" target="_blank" rel="noopener noreferrer" className="links">
              <p>GitHub</p>
            </Link>
            </Magnetic>
            <Magnetic>
            <a href="mailto:lfcadenac@outlook.com" className="links">
              <p>Email</p>
            </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}
