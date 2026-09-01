import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRef } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Magnetic from "../../common/Magnetic";
import "./index.css";
import Link from "next/link";

export default function index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image
                fill={true}
                alt={"Luis Felipe Cadena"}
                src={`/images/Coding.webp`}
                style={{ objectPosition: 'center 15%' }}
              />
            </div>
            <h2>Let's build</h2>
          </span>
          <h2 id="together">together</h2>
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Link href="https://linkedin.com/in/luis-felipe-cadena-cortes/" target="_blank" rel="noopener noreferrer" className="links">
            <Rounded backgroundColor={"#455CE9"} className={styles.button}>
              <p>LinkedIn</p>
            </Rounded>
            </Link>
          </motion.div>
          <motion.svg
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
          <Rounded>
          <a href="mailto:lfcadenac@outlook.com" className="links">
            <p>lfcadenac@outlook.com</p>
          </a>
          </Rounded>
          <Rounded>
            <Link href="https://github.com/luiscadn" target="_blank" rel="noopener noreferrer" className="links">
              <p>GitHub @luiscadn</p>
            </Link>
          </Rounded>
        </div>
        <div id="contact" className={styles.info}>
          <div>
            <span>
              <h3>Location & Role</h3>
              <p>Cali, Colombia • Systems Engineering</p>
            </span>
          </div>
          <div>
            <span>
              <h3>Connect</h3>
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
    </motion.div>
  );
}
