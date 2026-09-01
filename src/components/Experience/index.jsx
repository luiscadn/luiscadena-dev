'use client';
import { useState, useRef } from 'react';
import styles from './style.module.scss';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { reveal } from './animation';

const experiences = [
  {
    id: "icesi",
    role: "Marketing & Identity Delegate",
    organization: "Student Council - Universidad ICESI",
    period: "2025 → Present",
    tag: "INSTITUTIONAL LEADERSHIP",
    description: "Leader in charge of projecting the Student Council's identity and strengthening its link with the student body. Responsible for narrative management, strategic communication, and institutional campaign positioning.",
    skills: ["Strategic Communication", "Brand Positioning", "Community Engagement", "Public Relations"]
  },
  {
    id: "ieee",
    role: "Marketing & Identity Lead",
    organization: "IEEE Student Branch (ICESI)",
    period: "2026 → Present",
    tag: "TECHNICAL COMMUNITY",
    description: "Communication strategist projecting technical excellence through modern visual identity and digital content. Leading cross-functional teams to execute high-impact engineering conferences and student mentoring initiatives.",
    skills: ["Technical Events", "Team Mentoring", "Creative Direction", "Operations Management"]
  }
];

const skillCategories = [
  {
    category: "Management & Methods",
    items: ["Agile & Scrum", "Design Patterns", "UML & Architecture", "Engineering Leadership"]
  },
  {
    category: "Languages",
    items: ["Java", "Python", "SQL", "JavaScript / TypeScript"]
  },
  {
    category: "Frameworks & Backend",
    items: ["Spring Boot", "Django", "Next.js & React", "Node.js", "Docker"]
  },
  {
    category: "Databases & Cloud",
    items: ["PostgreSQL", "MongoDB", "MySQL", "RESTful APIs", "Vercel / Cloud CI"]
  },
  {
    category: "AI & Security",
    items: ["LLM Integration", "RAG Pipelines", "Prompt Engineering", "Applied Cybersecurity"]
  }
];

export default function Experience() {
  const [activeExp, setActiveExp] = useState(0);
  const [expandedCol, setExpandedCol] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

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
            <span className={styles.sectionTag}>Engineering & Expertise</span>
            <h2 className={styles.title}>Key Initiatives & Experience</h2>
          </div>
          <p className={styles.subtitle}>
            Blending engineering rigor with proactive leadership and clear strategic communication.
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
          <h3 className={styles.matrixTitle}>Technical Stack & Core Competencies</h3>
          <div className={styles.matrixGrid}>
            {skillCategories.map((cat, idx) => {
              const isExpanded = expandedCol === idx;
              return (
                <motion.div
                  key={cat.category}
                  className={`${styles.matrixCol} ${isExpanded ? styles.expanded : ''}`}
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
                    <span className={styles.matrixCount}>{String(cat.items.length).padStart(2, '0')}</span>
                  </h4>
                  <ul className={styles.skillsList}>
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className={styles.matrixItem}>
                        <span className={styles.bullet}>{String(itemIdx + 1).padStart(2, '0')}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
