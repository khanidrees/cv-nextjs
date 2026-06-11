'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { testimonials } from '@/data/personal';
import styles from './Testimonials.module.css';

function Stars({ count }: { count: number }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" width="16" height="16" className={styles.star}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Social Proof</span>
            <h2 className="section-title">What Clients Say</h2>
            <p className="section-subtitle">
              Don&apos;t take my word for it — here&apos;s what the people I&apos;ve worked with have to say.
            </p>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.12}>
              <div className={`${styles.card} card`}>
                <div className={styles.quoteIcon}>&ldquo;</div>
                <Stars count={t.stars} />
                <p className={styles.quote}>{t.quote}</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>
                    {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.role}>
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
