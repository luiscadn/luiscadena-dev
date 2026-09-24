'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import { useLanguage } from '../../context/LanguageContext';
import './index.css'

/**
 * @typedef {"ai" | "security" | "gamedev" | "architecture"} ProjectCategory
 * @typedef {Object} Project
 * @property {string} id - unique slug, e.g. "salpicon"
 * @property {string} title
 * @property {ProjectCategory} category
 * @property {string} tag - short technical line, e.g. "Systems Architecture · Real-Time Physics"
 * @property {string} problem - the strategic decision or system problem behind the build
 * @property {string[]} architecture - pipeline stages, rendered as interactive pills
 * @property {string[]} stack - tech stack badges
 * @property {string} impact - impact and governance notes
 * @property {string} src - filename in /public/images
 * @property {string} color - modal background hex
 * @property {string} link - repo / demo url
 */

/** @type {Project[]} */
const projects = [
  {
    id: "salpicon",
    title: "Salpicon Game",
    category: "gamedev",
    architecture: ["Input Layer", "Physics Engine", "Scene Graph", "Render Pipeline"],
    stack: ["Next.js", "React", "Three.js", "Matter.js", "Vercel"],
    src: "salpicon.png",
    color: "#1C1B20",
    link: "https://salpicon-game.vercel.app/"
  },
  {
    id: "security-architecture",
    title: "Android Malware Detection",
    category: "security",
    architecture: ["Permission Signals", "Detection Model", "OpenTelemetry Observability", "Risk Scoring"],
    stack: ["Next.js", "Python", "PyTorch", "Docker", "OpenTelemetry"],
    src: "security.png",
    color: "#1C1B20",
    link: "https://android-permission-sentinel.vercel.app/"
  },
  {
    id: "ai-systems",
    title: "Applied AI Sugar Cane Harvest Forecasting",
    category: "ai",
    architecture: ["Field Data Input", "TFLite Edge Inference", "LLM Quality-Control Layer", "Harvest Forecast"],
    stack: ["Python", "TensorFlow Lite", "PyTorch", "LLM APIs", "Docker"],
    src: "ai-qc.png",
    color: "#1C1B20",
    link: "https://github.com/luiscadn/ProvidenciaCane-Harvest-Forecasting-ML.git"
  }
]

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
}

export default function Home() {
  const { t } = useLanguage();
  const [modal, setModal] = useState({ active: false, index: 0 })
  const [openIndex, setOpenIndex] = useState(null)
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 768) {
      xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" })
      yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" })
      xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" })
      yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" })
      xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" })
      yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" })
    }
  }, [])

  const moveItems = (x, y) => {
    if (
      window.innerWidth > 768 &&
      typeof xMoveContainer.current === "function" &&
      typeof yMoveContainer.current === "function" &&
      typeof xMoveCursor.current === "function" &&
      typeof yMoveCursor.current === "function" &&
      typeof xMoveCursorLabel.current === "function" &&
      typeof yMoveCursorLabel.current === "function"
    ) {
      xMoveContainer.current(x)
      yMoveContainer.current(y)
      xMoveCursor.current(x)
      yMoveCursor.current(y)
      xMoveCursorLabel.current(x)
      yMoveCursorLabel.current(y)
    }
  }

  const manageModal = (active, index, x, y) => {
    if (active && index === openIndex) return
    if (window.innerWidth > 768) {
      moveItems(x, y)
    }
    setModal({ active, index })
  }

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
    setModal({ active: false, index: idx })
  }

  return (
    <main
      id='work'
      onMouseMove={(e) => window.innerWidth > 768 ? moveItems(e.clientX, e.clientY) : null}
      className={styles.projects}
    >
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <span className={styles.sectionTag}>{t.projects.eyebrow}</span>
          <h2 className={styles.title}>{t.projects.title}</h2>
        </div>
        <p className={styles.subtitle}>
          {t.projects.subtitle}
        </p>
      </div>
      <div className={styles.body}>
        {
          projects.map((project, index) => {
            const copy = t.projects.items[project.id];
            const isRepoLink = project.link.includes('github.com');
            return <Project
              index={index}
              title={project.title}
              tag={copy.tag}
              problem={copy.problem}
              architecture={project.architecture}
              stack={project.stack}
              stackLabel={t.projects.stackLabel}
              impact={copy.impact}
              link={project.link}
              src={project.src}
              color={project.color}
              caseLabels={t.projects.caseLabels}
              ctaLabel={isRepoLink ? t.projects.sourceCode : t.projects.exploreSystem}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              manageModal={manageModal}
              key={index}
            />
          })
        }
      </div>
      <Rounded>
        <a href="https://github.com/luiscadn" target="_blank" rel="noopener noreferrer" id='github'>
          <p>{t.projects.moreOnGithub}</p>
        </a>
      </Rounded>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}
        >
          <div style={{ top: index * -100 + "%" }} className={styles.modalSlider}>
            {
              projects.map((project, index) => {
                const { src, color } = project
                return <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <Image
                    src={`/images/${src}`}
                    fill
                    sizes="400px"
                    alt={`${project.title} project image`}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              })
            }
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          style={{ cursor: 'pointer' }}
        >
          {t.projects.hoverView}
        </motion.div>
      </>
    </main>
  )
}