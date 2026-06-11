'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import styles from './About.module.css';

const STATS = [
  { value: '4+', label: 'Years of Experience' },
  { value: '3', label: 'Companies Worked At' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '5', label: 'Tech Stacks Mastered' },
];

export default function About() {
  return (
    <section id="about" className={`section section-alt`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Photo */}
          <AnimatedSection direction="left" className={styles.photoCol}>
            <div className={styles.photoFrame}>
              <Image
                src="/profile.jpg"
                alt="Idrees Khan Pathan"
                width={420}
                height={500}
                className={styles.photo}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className={styles.photoFallback}>IKP</div>
              <div className={styles.photoAccent} />
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection direction="right" delay={0.15} className={styles.textCol}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.75rem' }}>
              <span className="section-tag">About Me</span>
              <h2 className="section-title">
                I build things that <span className="gradient-text">actually ship.</span>
              </h2>
            </div>

            <p className={styles.bio}>
              I&apos;m a Full-Stack Developer with 4+ years of experience turning product ideas into production-grade web and mobile applications. I&apos;ve worked across the full stack — from building high-performance Node.js backends to crafting pixel-perfect React interfaces and shipping React Native apps to the App Store.
            </p>
            <p className={styles.bio}>
              I thrive on the freelance cycle: understanding your goal, proposing the fastest path to value, and executing with quality code that doesn&apos;t need rewriting six months later. Whether you need an MVP in 4 weeks or want to scale an existing platform, I bring the architecture knowledge to make it happen.
            </p>

            <div className={styles.highlights}>
              {[
                { icon: '🚀', text: 'MVP-to-production in weeks, not months' },
                { icon: '🏗️', text: 'Scalable full-stack architecture (Node, Next.js, PostgreSQL)' },
                { icon: '📱', text: 'React Native iOS & Android development' },
                { icon: '💳', text: 'Payment integrations — Razorpay, webhooks, subscriptions' },
              ].map((h) => (
                <div key={h.text} className={styles.highlight}>
                  <span className={styles.highlightIcon}>{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>

            <div className={styles.statsRow}>
              {STATS.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
