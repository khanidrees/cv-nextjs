'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { experiences } from '@/data/personal';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Work History</span>
            <h2 className="section-title">Professional Experience</h2>
            <p className="section-subtitle">
              4+ years shipping real products across startups, agencies, and freelance engagements.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <AnimatedSection key={`${exp.company}-${i}`} direction="left" delay={i * 0.1}>
              <div className={styles.item}>
                {/* Timeline dot + line */}
                <div className={styles.dotCol}>
                  <div
                    className={styles.dot}
                    style={{ background: exp.accent, boxShadow: `0 0 12px ${exp.accent}` }}
                  />
                  {i < experiences.length - 1 && (
                    <div className={styles.line} style={{ borderColor: exp.accent + '22' }} />
                  )}
                </div>

                {/* Content */}
                <div className={`${styles.content} card`}>
                  <div className={styles.header}>
                    <div>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <div className={styles.meta}>
                        <span className={styles.company} style={{ color: exp.accent }}>
                          {exp.company}
                        </span>
                        <span className={styles.period}>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  {exp.projects && (
                    <div className={styles.projectTags}>
                      {exp.projects.map((p) => (
                        <span key={p} className={styles.projectTag} style={{ borderColor: exp.accent + '44', color: exp.accent }}>
                          🛠 {p}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className={styles.bullets}>
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className={styles.bullet}>
                        <span className={styles.bulletDot} style={{ background: exp.accent }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
