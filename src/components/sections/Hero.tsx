'use client';

import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import styles from './Hero.module.css';

const TECH_CHIPS = [
  { label: 'Next.js', color: '#fff' },
  { label: 'Node.js', color: '#339933' },
  { label: 'React Native', color: '#61DAFB' },
  { label: 'PostgreSQL', color: '#4169E1' },
  { label: 'Socket.io', color: '#fff' },
  { label: 'TypeScript', color: '#3178C6' },
  { label: 'Redis', color: '#FF4438' },
  { label: 'Prisma', color: '#5a67d8' },
];

// Interleave roles for TypeAnimation (text, delay pairs)
const typeSequence = personalInfo.roles.flatMap((role) => [role, 2200]);

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={`container ${styles.inner}`}>
        {/* Left: Text */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span className={styles.badgeDot} />
            Available for freelance work
          </motion.div>

          <h1 className={styles.name}>
            {personalInfo.name.split(' ').slice(0, 2).join(' ')}
            <br />
            <span className={styles.lastName}>{personalInfo.name.split(' ').slice(2).join(' ')}</span>
          </h1>

          <div className={styles.roleRow}>
            <span className={styles.roleLabel}>I&apos;m a </span>
            <span className={styles.roleType}>
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={50}
                deletionSpeed={70}
                repeat={Infinity}
              />
            </span>
          </div>

          <p className={styles.tagline}>{personalInfo.tagline}</p>

          <div className={styles.actions}>
            <a href="#contact" className={`btn btn-primary ${styles.btnHire}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Hire Me
            </a>
            <a href="/resume.pdf" download className={`btn btn-outline ${styles.btnCV}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { value: '4+', label: 'Years Experience' },
              { value: '3', label: 'Companies' },
              { value: '10+', label: 'Projects Shipped' },
            ].map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Photo + Chips */}
        <motion.div
          className={styles.photoWrapper}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className={styles.photoRing}>
            <div className={styles.photoInner}>
              <Image
                src="/profile.jpg"
                alt="Idrees Khan Pathan"
                width={340}
                height={340}
                className={styles.photo}
                priority
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Initials fallback */}
              <div className={styles.photoFallback}>IKP</div>
            </div>
          </div>

          {/* Floating tech chips */}
          <div className={styles.chipsContainer}>
            {TECH_CHIPS.map((chip, i) => (
              <motion.div
                key={chip.label}
                className={styles.chip}
                style={{ '--chip-color': chip.color } as React.CSSProperties}
                animate={{
                  y: [0, i % 2 === 0 ? -6 : 6, 0],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              >
                {chip.label}
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
