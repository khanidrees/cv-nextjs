'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import styles from './GitHubStats.module.css';

const GITHUB_USER = 'khanidrees';

const streakUrl =
  `https://streak-stats.demolab.com/?user=${GITHUB_USER}` +
  `&theme=dark&background=0f0f1a&border=1c1c32` +
  `&ring=8b5cf6&fire=39d353&currStreakLabel=c0c0e0` +
  `&sideLabels=a0a0c0&dates=a0a0c0&stroke=1c1c32`;

const STATS = [
  { value: '4+', label: 'Years on GitHub', icon: '📅', accent: '#8b5cf6' },
  { value: '136+', label: 'Contributions', icon: '🟩', accent: '#39d353' },
  { value: '10+', label: 'Repos', icon: '📦', accent: '#00d4ff' },
  { value: '5+', label: 'Tech Stacks', icon: '⚡', accent: '#fbbf24' },
];

function StreakCard() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={styles.streakFallback}>
        <span>🔥</span>
        <p>Contribution streak loading...</p>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fallbackLink}
        >
          View on GitHub →
        </a>
      </div>
    );
  }

  return (
    <img
      src={streakUrl}
      alt="GitHub Contribution Streak"
      className={styles.streakImg}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function GitHubStats() {
  return (
    <section id="github" className="section section-alt">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Open Source</span>
            <h2 className="section-title">GitHub Activity</h2>
            <p className="section-subtitle">
              Consistent shipping — code quality and velocity you can see.
            </p>
          </div>
        </AnimatedSection>

        {/* Custom Stats Grid */}
        <div className={styles.statsGrid}>
          {STATS.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.08}>
              <div className={styles.statCard} style={{ '--accent': s.accent } as React.CSSProperties}>
                <span className={styles.statIcon}>{s.icon}</span>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <div className={styles.statGlow} />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Streak Card */}
        <AnimatedSection delay={0.2} className={styles.streakWrapper}>
          <StreakCard />
        </AnimatedSection>

        {/* Profile Link */}
        <AnimatedSection delay={0.3} className={styles.profileLink}>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View GitHub Profile
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
