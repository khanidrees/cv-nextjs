'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { caseStudies } from '@/data/caseStudies';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CaseStudyPage({ params }: PageProps) {
  const { id } = use(params);
  const study = caseStudies[id];

  if (!study) {
    return (
      <div className="min-h-screen bg-[#0d1515] flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
        <p className="text-gray-400 mb-8">The requested project case study does not exist.</p>
        <Link
          href="/"
          className="bg-[#00f0ff] hover:bg-[#00dbe9] text-[#0d1515] px-6 py-3 rounded-lg font-bold transition-all"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Icon mapping helper (maps name strings to SVGs)
  const getIcon = (name: string) => {
    switch (name) {
      case 'hub':
        return (
          <svg className="w-6 h-6 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx={12} cy={12} r={3} />
            <circle cx={12} cy={4} r={2} />
            <circle cx={4} cy={12} r={2} />
            <circle cx={12} cy={20} r={2} />
            <circle cx={20} cy={12} r={2} />
            <path d="M12 6v3M6 12h3M12 18v-3M18 12h-3" />
          </svg>
        );
      case 'database':
        return (
          <svg className="w-6 h-6 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <ellipse cx={12} cy={5} rx={9} ry={3} />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
          </svg>
        );
      case 'input':
        return (
          <svg className="w-4 h-4 text-[#0d1515]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        );
      case 'router':
        return (
          <svg className="w-4 h-4 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <rect x={2} y={15} width={20} height={6} rx={2} />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18h.01M10 18h.01M18 18h.01M12 15V8m0 0l-4 4m4-4l4 4" />
          </svg>
        );
      case 'sync_alt':
        return (
          <svg className="w-4 h-4 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case 'done_all':
        return (
          <svg className="w-4 h-4 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx={12} cy={12} r={10} />
          </svg>
        );
    }
  };

  return (
    <div className="bg-[#0d1515] text-[#dce4e5] min-h-screen font-sans overflow-x-hidden selection:bg-[#00f0ff]/30">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-20 h-20 flex items-center justify-between pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto bg-[#232b2c]/80 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-[#00f0ff]/50 transition-all flex items-center gap-2 group"
        >
          <svg
            className="w-5 h-5 text-[#00f0ff] transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs text-[#b9cacb] group-hover:text-[#00f0ff] uppercase tracking-widest font-medium font-mono">
            Back to Projects
          </span>
        </Link>
        <div className="pointer-events-auto flex gap-4">
          {study.liveUrl ? (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 flex items-center gap-2 bg-[#00f0ff] hover:bg-[#00dbe9] text-[#0d1515] rounded-lg font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] pointer-events-auto"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#0d1515] animate-pulse"></span>
              Visit Live Site
            </a>
          ) : (
            <div className="h-10 px-4 flex items-center gap-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-lg text-[#00f0ff] font-mono text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
              Live Case
            </div>
          )}
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative w-full h-[90vh] flex flex-col justify-end overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          <Image
            src={study.heroImage}
            alt={study.title}
            fill
            priority
            className="object-cover opacity-60 grayscale-[40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1515] via-[#0d1515]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[#0d1515]/20 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 md:px-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dbe9]/10 border border-[#00dbe9]/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-pulse"></span>
            <span className="text-xs text-[#00dbe9] uppercase tracking-widest font-mono font-bold">
              {study.subtitle}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold mb-10 leading-tight text-[#dbfcff] font-sans"
          >
            {study.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {study.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className="bg-[#192122]/40 backdrop-blur-md p-8 rounded-xl border border-white/10 border-l-4 border-l-[#00f0ff]"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#b9cacb] font-mono mb-2">
                  {metric.label}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-[#00f0ff] font-sans">
                  {metric.value}
                </p>
                <p className="text-sm text-[#dce4e5]/80 mt-2">
                  {metric.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Narrative Section */}
      <section className="py-24 bg-[#0d1515] relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-16">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#00f0ff]">The Challenge</h2>
                <p className="text-base md:text-lg text-[#dce4e5]/90 leading-relaxed font-light">
                  {study.challenge}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#00f0ff]">Technical Approach</h2>
                <p className="text-base md:text-lg text-[#dce4e5]/90 leading-relaxed font-light">
                  {study.technicalApproach}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {study.features.map((feature, i) => (
                    <div
                      key={feature.title}
                      className="p-6 rounded-xl bg-[#151d1e] border border-white/5 hover:border-[#00f0ff]/20 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {getIcon(feature.icon)}
                        <h3 className="text-lg font-bold text-[#dbfcff]">{feature.title}</h3>
                      </div>
                      <p className="text-sm text-[#b9cacb]">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Timeline */}
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="sticky top-32 p-8 bg-[#192122]/40 backdrop-blur-md rounded-2xl border border-white/10">
                <h4 className="text-xs uppercase tracking-[0.25em] text-[#b9cacb] font-mono mb-10">
                  System Architecture Flow
                </h4>
                <div className="relative space-y-0">
                  {study.timeline.map((step, idx) => (
                    <div key={step.step} className="flex gap-6 pb-12 last:pb-0 relative">
                      {idx < study.timeline.length - 1 && (
                        <div className="absolute left-[15px] top-[30px] bottom-0 w-[1px] border-l border-dashed border-[#3b494b]"></div>
                      )}
                      <div className="relative z-10 w-8 h-8 rounded-full bg-[#192122] border border-[#00f0ff]/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                        {getIcon(step.icon)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#00f0ff] mb-1 font-mono">{step.title}</p>
                        <p className="text-xs text-[#b9cacb] leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Bento Grid */}
      <section className="py-24 bg-[#151d1e] relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-extrabold text-[#dbfcff] mb-4">Measurable Impact</h2>
            <p className="text-[#b9cacb]">Data-driven results optimized across active deployments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
            {study.impact.map((card, i) => {
              if (card.type === 'large') {
                return (
                  <div
                    key={card.title}
                    className="md:col-span-2 md:row-span-2 bg-[#192122]/60 backdrop-blur-md rounded-2xl p-10 flex flex-col justify-between border border-white/5 hover:border-[#00f0ff]/30 transition-all"
                  >
                    <div>
                      <div className="w-12 h-12 bg-[#00f0ff]/10 rounded-lg flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#dbfcff] mb-4">{card.title}</h3>
                      <p className="text-[#b9cacb] text-base leading-relaxed">{card.desc}</p>
                    </div>
                    <div className="mt-12">
                      <div className="flex items-end gap-1">
                        <span className="text-6xl md:text-7xl font-extrabold text-[#00f0ff] leading-none">
                          {card.value}
                        </span>
                        <span className="text-2xl font-bold text-[#00f0ff] mb-2">%</span>
                      </div>
                      <p className="text-[10px] uppercase text-[#b9cacb]/80 tracking-widest font-mono mt-2">
                        {card.subvalue}
                      </p>
                    </div>
                  </div>
                );
              } else if (card.type === 'medium') {
                return (
                  <div
                    key={card.title}
                    className="md:col-span-2 bg-[#192122]/60 backdrop-blur-md rounded-2xl p-8 flex items-center justify-between border border-white/5 hover:border-[#00f0ff]/30 transition-all"
                  >
                    <div>
                      <p className="text-xs uppercase text-[#00f0ff] font-mono mb-2">Throughput</p>
                      <h4 className="text-xl md:text-2xl font-bold text-[#dbfcff] mb-1">{card.value}</h4>
                      <p className="text-xs text-[#b9cacb]">{card.desc}</p>
                    </div>
                    <div className="w-20 h-20 rounded-full border-[6px] border-[#2e3637] border-t-[#00f0ff] flex items-center justify-center text-lg font-bold text-[#00f0ff]">
                      {card.subvalue}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={card.title}
                    className="bg-[#192122]/60 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-[#00f0ff]/30 transition-all"
                  >
                    <p className="text-xs uppercase text-[#b9cacb] font-mono mb-6">{card.title}</p>
                    <div className="text-3xl font-extrabold text-[#dbfcff] mb-2">{card.value}</div>
                    <p className="text-xs text-[#b9cacb]">{card.desc}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-24 bg-[#0d1515]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20">
          <div className="bg-[#192122]/40 backdrop-blur-md rounded-3xl overflow-hidden p-4 md:p-8 border border-white/5">
            <div className="aspect-video w-full rounded-2xl overflow-hidden relative group border border-white/10">
              <Image
                src={study.showcaseImage}
                alt="AgriThread Interface Showcase"
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#00f0ff] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.4)] cursor-pointer hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-[#0d1515] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080f10] w-full py-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto px-6 md:px-20 gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-[#dbfcff]">DevPortfolio</span>
            <span className="text-sm text-[#b9cacb]">© 2026 Full-Stack Engineer</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors text-sm">LinkedIn</a>
            <a href="#" className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors text-sm">GitHub</a>
            <a href="#" className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors text-sm">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
