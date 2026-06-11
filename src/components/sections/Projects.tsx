'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { projects } from '@/data/personal';
import styles from './Projects.module.css';

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              A selection of products I&apos;ve designed, architected, and shipped end-to-end.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {projects.map((project, i) => {
            const isExpanded = expanded === project.name;
            return (
              <AnimatedSection key={project.name} delay={i * 0.1}>
                <div
                  className={`${styles.card} ${project.featured ? styles.featured : ''} ${isExpanded ? styles.cardExpanded : ''}`}
                  onClick={() => setExpanded(isExpanded ? null : project.name)}
                >
                  {/* Card Front */}
                  <div className={styles.front}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIcon}>
                        {project.featured ? '🌾' : project.name === 'CV Builder' ? '📄' : '🔐'}
                      </div>
                      {project.featured && (
                        <span className={styles.featuredBadge}>Featured</span>
                      )}
                    </div>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <p className={styles.projectTagline}>{project.tagline}</p>
                    <div className={styles.techStack}>
                      {project.tech.slice(0, 5).map((t) => (
                        <span key={t} className="badge">{t}</span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="badge">+{project.tech.length - 5} more</span>
                      )}
                    </div>
                    <div className={styles.hoverHint}>
                      <span>{isExpanded ? 'Click to collapse' : 'Click to explore →'}</span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className={styles.details}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <p className={styles.description}>{project.description}</p>
                        <div className={styles.allTech}>
                          {project.tech.map((t) => (
                            <span key={t} className="badge">{t}</span>
                          ))}
                        </div>
                        <div className={styles.links}>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15,3 21,3 21,9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                              </svg>
                              Live Demo
                            </a>
                          )}
                          {!project.liveUrl && (
                            <span className={styles.privateBadge}>🔒 Private / NDA</span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
