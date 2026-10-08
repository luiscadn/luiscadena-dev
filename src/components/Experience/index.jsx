'use client';
import { useRef } from 'react';
import styles from './style.module.scss';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  const experiences = t.experience?.items || (
    t.capabilities?.experiences ? [
      { id: "icesi", ...t.capabilities.experiences.icesi },
      { id: "ieee", ...t.capabilities.experiences.ieee },
    ] : []
  );

  return (
    <section ref={sectionRef} id="experience" className={styles.experienceSection}>
      <div className={styles.container}>
        {/* Editorial Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.sectionNumber}>{t.experience?.sectionNum || "04"}</span>
            <h2 className={styles.sectionTitle}>{t.experience?.sectionTitle || "Experience & Leadership"}</h2>
          </div>
          {t.experience?.subtitle && (
            <p className={styles.sectionSubtitle}>{t.experience.subtitle}</p>
          )}
        </div>

        {/* Chronological Timeline Flow - Dataconale style, NO WHITE BOXES */}
        <div className={styles.timelineList}>
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id || idx}
              className={styles.timelineRow}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Meta column: period, organization, category kicker */}
              <div className={styles.metaCol}>
                <span className={styles.periodBadge}>{exp.period}</span>
                <span className={styles.tagKicker}>{exp.tag}</span>
                <h4 className={styles.orgName}>{exp.organization}</h4>
                {exp.location && <span className={styles.locationText}>{exp.location}</span>}
              </div>

              {/* Main column: role title, narrative and competencies */}
              <div className={styles.contentCol}>
                <h3 className={styles.roleTitle}>{exp.role}</h3>
                <p className={styles.roleDescription}>{exp.description}</p>

                {exp.skills && exp.skills.length > 0 && (
                  <div className={styles.skillsList}>
                    {exp.skills.map((skill, sIdx) => (
                      <span key={sIdx} className={styles.skillPill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
