'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { skillCategories } from '@/data/personal';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Tech Stack</span>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-subtitle">
              From frontend to backend, mobile to infra — here&apos;s what I build with.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.categories}>
          {skillCategories.map((cat, ci) => (
            <AnimatedSection key={cat.label} delay={ci * 0.1}>
              <div className={styles.category}>
                <div className={styles.categoryLabel} style={{ color: cat.accent }}>
                  <span
                    className={styles.categoryDot}
                    style={{ background: cat.accent, boxShadow: `0 0 8px ${cat.accent}` }}
                  />
                  {cat.label}
                </div>
                <div className={styles.badgeGrid}>
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={styles.skillBadge}
                      style={{ '--skill-color': skill.color, '--skill-accent': cat.accent } as React.CSSProperties}
                    >
                      {/* Simple Icons via CDN */}
                      <img
                        src={`https://cdn.simpleicons.org/${skill.icon}`}
                        alt={skill.name}
                        width={16}
                        height={16}
                        className={styles.skillIcon}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
