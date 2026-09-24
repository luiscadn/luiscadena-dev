'use client';
import { useState, useRef } from 'react';
import styles from './style.module.scss';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { reveal } from './animation';
import { useLanguage } from '../../context/LanguageContext';

const experienceOrder = ["icesi", "ieee"];

const skillCategories = [
  {
    category: "Agentic Workflows & Orchestration",
    color: "#A3D900", // Lime Green (from left sculpture frame)
    items: ["LLM Integration", "RAG Pipelines", "Prompt Engineering", "Multi-Agent Coordination"]
  },
  {
    category: "System Design & Architecture",
    color: "#00D8F6", // Electric Cyan (from inner sculpture stripes and sky)
    items: ["UML & Architecture", "Design Patterns", "Spring Boot · Django · Next.js", "Docker & Cloud CI"]
  },
  {
    category: "Security & Guardrails",
    color: "#FF007A", // Vibrant Magenta / Pink (from right sculpture frame)
    items: ["Applied Cybersecurity", "Access Control & Auth", "API Threat Surface", "Threat Modeling"]
  },
  {
    category: "AI Auditing & Evaluation",
    color: "#A855F7", // Electric Violet (from World neon speech bubble)
    items: ["Model Evaluation Pipelines", "Hallucination Mitigation", "Observability (OpenTelemetry)", "Engineering Governance"]
  }
];

const coreStack = ["Java", "Python", "SQL", "TypeScript", "PostgreSQL", "MongoDB", "MySQL", "RESTful APIs"];

export default function Experience() {
  const [activeExp, setActiveExp] = useState(0);
  const [expandedCol, setExpandedCol] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const { t } = useLanguage();
  const experiences = experienceOrder.map((id) => ({ id, ...t.capabilities.experiences[id] }));

  const toggleCol = (idx) => {
    setExpandedCol((prev) => (prev === idx ? null : idx));
  };

  return (
    <section ref={sectionRef} id="experience" className={styles.experienceSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={reveal}
          custom={0}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className={styles.titleWrapper}>
            <span className={styles.sectionTag}>{t.capabilities.eyebrow}</span>
            <h2 className={styles.title}>{t.capabilities.title}</h2>
          </div>
          <p className={styles.subtitle}>
            {t.capabilities.subtitle}
          </p>
        </motion.div>

        {/* Experience Interactive Block */}
        <motion.div
          className={styles.experienceGrid}
          variants={reveal}
          custom={1}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className={styles.tabsList}>
            {experiences.map((exp, index) => (
              <button
                key={exp.id}
                onClick={() => setActiveExp(index)}
                className={`${styles.tabButton} ${activeExp === index ? styles.activeTab : ''}`}
              >
                <span className={styles.tabOrg}>{exp.organization}</span>
                <span className={styles.tabRole}>{exp.role}</span>
                <span className={styles.tabPeriod}>{exp.period}</span>
              </button>
            ))}
          </div>

          <div className={styles.detailCard}>
            <AnimatePresence mode="wait">
              <motion.div
                key={experiences[activeExp].id}
                initial={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
                exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className={styles.cardContent}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.cardTag}>{experiences[activeExp].tag}</span>
                    <h3 className={styles.cardRole}>{experiences[activeExp].role}</h3>
                    <h4 className={styles.cardOrg}>{experiences[activeExp].organization}</h4>
                  </div>
                  <span className={styles.cardPeriodBadge}>{experiences[activeExp].period}</span>
                </div>

                <p className={styles.cardDescription}>{experiences[activeExp].description}</p>

                <div className={styles.cardSkills}>
                  {experiences[activeExp].skills.map((skill, i) => (
                    <span key={i} className={styles.skillPill}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Skills Matrix */}
        <motion.div
          className={styles.skillsMatrix}
          variants={reveal}
          custom={2}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className={styles.matrixTitle}>{t.capabilities.matrixTitle}</h3>
          <div className={styles.matrixGrid}>
            {skillCategories.map((cat, idx) => {
              const isExpanded = expandedCol === idx;
              return (
                <motion.div
                  key={cat.category}
                  className={`${styles.matrixCol} ${isExpanded ? styles.expanded : ''}`}
                  style={{ '--col-accent': cat.color }}
                  variants={reveal}
                  custom={idx * 0.5 + 3}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  onClick={() => toggleCol(idx)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCol(idx); }}
                >
                  <h4 className={styles.matrixCategory}>
                    <span>{cat.category}</span>
                    <span className={styles.matrixCount}>{cat.items.length}</span>
                  </h4>
                  <ul className={styles.skillsList}>
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className={styles.matrixItem}>
                        <span className={styles.bullet} aria-hidden="true">&bull;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          <div className={styles.coreStack}>
            <span className={styles.coreStackLabel}>{t.capabilities.coreStackLabel}</span>
            <div className={styles.coreStackChips}>
              {coreStack.map((tech) => (
                <span key={tech} className={styles.stackChip}>{tech}</span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
