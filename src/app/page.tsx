'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import emailjs from '@emailjs/browser';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus('submitting');
    
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration variables are missing.');
      setFormStatus('error');
      return;
    }

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          title: 'Portfolio Inquiry',
          name: formData.name,
          from_name: formData.name,
          message: formData.message,
          reply_to: formData.email,
          time: new Date().toLocaleString(),
        },
        publicKey
      );

      if (result.status === 200) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormStatus('error');
    }
  };

  // Track scroll position for navbar styling and active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section
      const sections = ['about', 'skills', 'work', 'testimonials', 'process', 'timeline', 'contact'];
      let currentActive = 'about';
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            currentActive = id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0d1515] text-[#dce4e5] min-h-screen font-sans selection:bg-[#00f0ff]/30 relative overflow-x-hidden">
      {/* Background Dots Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* ==================== NAVIGATION ==================== */}
      {/* Mobile Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0d1515]/80 backdrop-blur-md border-b border-white/10 md:hidden">
        <div className="flex justify-between items-center px-6 h-16">
          <span className="font-display text-2xl font-bold text-[#00dbe9]">Idrees Khan Pathan</span>
          <button
            className="p-2 text-[#b9cacb] active:scale-95 transition-all focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-16 left-0 w-full bg-[#151d1e] border-b border-white/10 px-6 py-8 flex flex-col gap-6"
            >
              <a
                className={`text-2xl font-bold transition-colors ${
                  activeSection === 'about' ? 'text-[#00dbe9]' : 'text-[#b9cacb]'
                }`}
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                className={`text-2xl font-bold transition-colors ${
                  activeSection === 'work' ? 'text-[#00dbe9]' : 'text-[#b9cacb]'
                }`}
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </a>
              <a
                className={`text-2xl font-bold transition-colors ${
                  activeSection === 'timeline' ? 'text-[#00dbe9]' : 'text-[#b9cacb]'
                }`}
                href="#timeline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Timeline
              </a>
              <a
                className={`text-2xl font-bold transition-colors ${
                  activeSection === 'process' ? 'text-[#00dbe9]' : 'text-[#b9cacb]'
                }`}
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </a>
              <a
                className={`text-2xl font-bold transition-colors ${
                  activeSection === 'contact' ? 'text-[#00dbe9]' : 'text-[#b9cacb]'
                }`}
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a href="/resume.pdf" download className="w-full">
                <button className="w-full bg-[#00f0ff] text-[#0d1515] py-4 font-bold rounded-lg mt-4">
                  Resume
                </button>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Desktop Navbar */}
      <header
        className={`hidden md:flex fixed top-0 w-full z-50 bg-[#0d1515]/80 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
          scrolled ? 'py-4 h-16' : 'py-6 h-20'
        }`}
      >
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-20 w-full">
          <span className="font-display text-2xl font-bold text-[#00dbe9]">Idrees Khan Pathan</span>
          <div className="flex gap-12 items-center">
            <a
              className={`font-mono text-sm hover:translate-y-[-2px] transition-all pb-1 ${
                activeSection === 'about'
                  ? 'text-[#00dbe9] font-bold border-b-2 border-[#00dbe9]'
                  : 'text-[#b9cacb] font-medium hover:text-[#00dbe9]'
              }`}
              href="#about"
            >
              About
            </a>
            <a
              className={`font-mono text-sm hover:translate-y-[-2px] transition-all pb-1 ${
                activeSection === 'work'
                  ? 'text-[#00dbe9] font-bold border-b-2 border-[#00dbe9]'
                  : 'text-[#b9cacb] font-medium hover:text-[#00dbe9]'
              }`}
              href="#work"
            >
              Work
            </a>
            <a
              className={`font-mono text-sm hover:translate-y-[-2px] transition-all pb-1 ${
                activeSection === 'timeline'
                  ? 'text-[#00dbe9] font-bold border-b-2 border-[#00dbe9]'
                  : 'text-[#b9cacb] font-medium hover:text-[#00dbe9]'
              }`}
              href="#timeline"
            >
              Timeline
            </a>
            <a
              className={`font-mono text-sm hover:translate-y-[-2px] transition-all pb-1 ${
                activeSection === 'process'
                  ? 'text-[#00dbe9] font-bold border-b-2 border-[#00dbe9]'
                  : 'text-[#b9cacb] font-medium hover:text-[#00dbe9]'
              }`}
              href="#process"
            >
              Process
            </a>
            <a
              className={`font-mono text-sm hover:translate-y-[-2px] transition-all pb-1 ${
                activeSection === 'contact'
                  ? 'text-[#00dbe9] font-bold border-b-2 border-[#00dbe9]'
                  : 'text-[#b9cacb] font-medium hover:text-[#00dbe9]'
              }`}
              href="#contact"
            >
              Contact
            </a>
            <a href="/resume.pdf" download>
              <button className="bg-[#00f0ff] text-[#0d1515] px-6 py-2 rounded-lg font-bold hover:translate-y-[-2px] active:scale-95 transition-all">
                Resume
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="pt-24 pb-20 md:pt-32">
        {/* ==================== HERO & ABOUT (MERGED) ==================== */}
        <div id="about" className="scroll-mt-24 md:scroll-mt-32">
          {/* Mobile Hero & About View */}
          <section className="md:hidden px-6 py-12 flex flex-col items-center text-center relative">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#00dbe9]/5 blur-[100px] rounded-full"></div>
            <div className="absolute top-20 -right-10 w-72 h-72 bg-[#00f0ff]/10 blur-[120px] rounded-full"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#00dbe9]/20 bg-[#00dbe9]/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-[#00dbe9] font-mono">
                Available for hire
              </span>
            </div>

            {/* Profile Photo */}
            <div className="relative w-48 h-48 mb-8">
              <div className="absolute inset-0 rounded-full border-2 border-primary-fixed-dim/30 animate-spin-slow"></div>
              <div className="absolute -inset-2 rounded-full border border-dashed border-primary-fixed-dim/20 animate-spin-slow-reverse"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#0d1515] shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <Image
                  alt="Idrees Khan Pathan"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  src="/profile.png"
                  fill
                  sizes="192px"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-surface-container-high rounded-xl glass-card flex items-center justify-center border border-primary-fixed-dim/30">
                <svg className="w-6 h-6 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-[#00dbe9] to-[#dbfcff] bg-clip-text text-transparent">
              I build high-performance web apps that scale.
            </h1>
            <p className="text-sm text-[#b9cacb] max-w-md mb-8 leading-relaxed">
              Hi, I'm <span className="text-[#dce4e5] font-bold">Idrees Khan Pathan</span>. A full-stack engineer specialized in real-time platforms, blockchain solutions, and multi-role systems. I turn ambitious ideas into fast, reliable products.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs mb-12">
              <a
                href="#work"
                className="w-full bg-[#00f0ff] text-[#0d1515] py-4 font-bold rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:translate-y-[-2px] transition-all text-center"
              >
                View My Projects
              </a>
              <a
                href="#contact"
                className="w-full border border-[#00dbe9] text-[#00dbe9] py-4 font-bold rounded-lg hover:bg-[#00dbe9]/10 transition-all text-center"
              >
                Let's Connect
              </a>
            </div>

            {/* Mobile Stats Grid */}
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="p-4 rounded-xl glass-card text-center">
                <div className="font-mono text-xl font-bold text-primary-fixed-dim">4+</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant mt-1">Experience</div>
              </div>
              <div className="p-4 rounded-xl glass-card text-center">
                <div className="font-mono text-xl font-bold text-primary-fixed-dim">3+</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant mt-1">Companies</div>
              </div>
              <div className="p-4 rounded-xl glass-card text-center">
                <div className="font-mono text-xl font-bold text-primary-fixed-dim">10+</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant mt-1">Shipped</div>
              </div>
            </div>
          </section>

          {/* Desktop Hero & About View */}
          <section className="hidden md:flex relative overflow-hidden min-h-[80vh] items-center px-20 max-w-[1280px] mx-auto">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00dbe9] opacity-15 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#004f54] opacity-15 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="grid grid-cols-12 gap-16 items-center w-full z-10">
              {/* Left Column: Rotating Profile Image */}
              <div className="col-span-5 flex justify-center">
                <div className="relative w-72 h-72 md:w-80 md:h-80 group">
                  <div className="absolute inset-0 rounded-full border-2 border-primary-fixed-dim/30 animate-spin-slow"></div>
                  <div className="absolute -inset-4 rounded-full border border-dashed border-primary-fixed-dim/20 animate-spin-slow-reverse"></div>
                  <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#0d1515] shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                    <Image
                      alt="Idrees Khan Pathan"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      src="/profile.png"
                      fill
                      sizes="320px"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-surface-container-high rounded-xl glass-card flex items-center justify-center border border-primary-fixed-dim/30">
                    <svg className="w-10 h-10 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="12" y1="19" x2="20" y2="19" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Headline, Description, Buttons, Stats */}
              <div className="col-span-7 space-y-8">
                <div className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-extrabold text-[#00dbe9] leading-tight"
                  >
                    I build high-performance web apps that scale.
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg text-[#b9cacb] leading-relaxed"
                  >
                    Hi, I'm <span className="text-[#dce4e5] font-bold">Idrees Khan Pathan</span>. With a deep-rooted passion for architecting scalable ecosystems, I specialize in full-stack engineering that bridges the gap between complex business logic and intuitive user experiences.
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex gap-4"
                >
                  <a
                    className="bg-[#00f0ff] text-[#0d1515] px-8 py-4 rounded font-bold transition-all hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                    href="#work"
                  >
                    View My Work
                  </a>
                  <a
                    className="border border-[#00dbe9] text-[#00dbe9] px-8 py-4 rounded font-bold transition-all hover:bg-[#00dbe9]/10 hover:translate-y-[-2px]"
                    href="#contact"
                  >
                    Start a Project
                  </a>
                </motion.div>

                {/* Stats Counters */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5"
                >
                  <div className="p-6 rounded-xl glass-card transition-all hover:border-primary-fixed-dim/40 group">
                    <div className="font-mono text-3xl font-bold text-primary-fixed-dim mb-1">4+</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Years Experience</div>
                  </div>
                  <div className="p-6 rounded-xl glass-card transition-all hover:border-primary-fixed-dim/40 group">
                    <div className="font-mono text-3xl font-bold text-primary-fixed-dim mb-1">3+</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Companies</div>
                  </div>
                  <div className="p-6 rounded-xl glass-card transition-all hover:border-primary-fixed-dim/40 group">
                    <div className="font-mono text-3xl font-bold text-primary-fixed-dim mb-1">10+</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Shipped Projects</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* ==================== GROUPED SKILLS SECTION ==================== */}
        <section className="py-24 bg-surface-container-lowest scroll-mt-20" id="skills">
          <div className="max-w-[1280px] mx-auto px-6 md:px-20">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary-fixed-dim mb-4">Core Technology Stack</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Expertise across the entire development lifecycle, from polished frontends to resilient cloud infrastructure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Frontend */}
              <div className="glass-card p-8 rounded-xl space-y-6">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  <h3 className="font-display text-xl font-bold text-on-surface">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Next.js', 'Tailwind'].map((tech) => (
                    <div key={tech} className="px-4 py-2 bg-surface-container rounded-lg border border-white/5 flex items-center gap-2 hover:border-primary-fixed-dim hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:-translate-y-1 transition-all cursor-default">
                      <svg className="w-3.5 h-3.5 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-mono text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="glass-card p-8 rounded-xl space-y-6">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                  <h3 className="font-display text-xl font-bold text-on-surface">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Node.js', 'PostgreSQL', 'MongoDB', 'Redis'].map((tech) => (
                    <div key={tech} className="px-4 py-2 bg-surface-container rounded-lg border border-white/5 flex items-center gap-2 hover:border-primary-fixed-dim hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:-translate-y-1 transition-all cursor-default">
                      <svg className="w-3.5 h-3.5 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-mono text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile */}
              <div className="glass-card p-8 rounded-xl space-y-6">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                  <h3 className="font-display text-xl font-bold text-on-surface">Mobile</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['React Native'].map((tech) => (
                    <div key={tech} className="px-4 py-2 bg-surface-container rounded-lg border border-white/5 flex items-center gap-2 hover:border-primary-fixed-dim hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:-translate-y-1 transition-all cursor-default">
                      <svg className="w-3.5 h-3.5 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-mono text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="glass-card p-8 rounded-xl space-y-6">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                  </svg>
                  <h3 className="font-display text-xl font-bold text-on-surface">Infrastructure</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['AWS', 'Docker', 'CI/CD'].map((tech) => (
                    <div key={tech} className="px-4 py-2 bg-surface-container rounded-lg border border-white/5 flex items-center gap-2 hover:border-primary-fixed-dim hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:-translate-y-1 transition-all cursor-default">
                      <svg className="w-3.5 h-3.5 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-mono text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Workflow */}
              <div className="glass-card p-8 rounded-xl space-y-6 lg:col-span-2">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                  <h3 className="font-display text-xl font-bold text-on-surface">Tools &amp; Workflow</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Git', 'Figma', 'Postman', 'Agile (Scrum)'].map((tech) => (
                    <div key={tech} className="px-4 py-2 bg-surface-container rounded-lg border border-white/5 flex items-center gap-2 hover:border-primary-fixed-dim hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:-translate-y-1 transition-all cursor-default">
                      <svg className="w-3.5 h-3.5 text-primary-fixed-dim" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-mono text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Activity Grid */}
        <section className="py-12 bg-[#0d1515] scroll-mt-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-20">
            <a
              href="https://github.com/khanidrees"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#151d1e] rounded-xl p-10 border border-white/5 hover:border-[#00f0ff] transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.05)] cursor-pointer"
            >
              <h2 className="font-display text-xl font-bold text-[#00f0ff] mb-8">GitHub Activity</h2>
              <div className="flex justify-center items-center overflow-x-auto">
                <GitHubCalendar
                  username="khanidrees"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={14}
                  colorScheme="dark"
                  theme={{
                    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                />
              </div>
            </a>
          </div>
        </section>


        {/* ==================== SELECTED WORKS ==================== */}
        <div id="work">
          {/* Mobile Work View */}
          <section className="md:hidden px-6 py-12">
          <h2 className="text-2xl font-bold text-[#dce4e5] mb-8 font-display">Selected Works</h2>
          <div className="flex flex-col gap-8">
            {/* Project 1 */}
            <article className="bg-[#1a1d2e]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/agrithread_showcase.png"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain bg-[#0d1515] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#b9cacb] font-mono">
                    React
                  </span>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#b9cacb] font-mono">
                    Node.js
                  </span>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#b9cacb] font-mono">
                    Socket.io
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#dbfcff] group-hover:text-[#00f0ff] transition-colors">
                  AgriThread Dashboard
                </h3>
                <p className="text-xs text-[#b9cacb] mb-6 leading-relaxed">
                  A real-time B2B marketplace for agricultural technology, featuring live chat and blockchain verification.
                </p>
                <div className="flex gap-4 items-center">
                  <a
                    className="bg-[#00f0ff] hover:bg-[#00dbe9] text-[#0d1515] px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:translate-y-[-1px] inline-flex items-center gap-1.5"
                    href="https://agrithread.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Live
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <Link
                    className="inline-flex items-center gap-2 text-[#00f0ff] font-bold text-sm hover:underline"
                    href="/case-study/agrithread"
                  >
                    View Case Study
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>

            {/* Project 2 */}
            <article className="bg-[#1a1d2e]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  alt="Cloud Systems"
                  src="/verifycertify.png"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#b9cacb] font-mono">
                    Next.js
                  </span>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#b9cacb] font-mono">
                    AWS
                  </span>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#b9cacb] font-mono">
                    Docker
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#dbfcff] group-hover:text-[#00f0ff] transition-colors">
                  VerifyCertify Platform
                </h3>
                <p className="text-xs text-[#b9cacb] mb-6 leading-relaxed">
                  Decentralized credential verification system with Solana wallet integration.
                </p>
                <div className="flex gap-4 items-center">
                  <a
                    className="bg-[#00f0ff] hover:bg-[#00dbe9] text-[#0d1515] px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:translate-y-[-1px] inline-flex items-center gap-1.5"
                    href="https://certify-nu-two.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Live
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <Link
                    className="inline-flex items-center gap-2 text-[#00f0ff] font-bold text-sm hover:underline"
                    href="/case-study/verifycertify"
                  >
                    View Case Study
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>

            {/* Project 3 */}
            <article className="bg-[#1a1d2e]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  alt="ATS Resume Builder Interface"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCIT0PCLqEE6QtSrKpJQkPhLEPEjwtRqoe1BPBwtSdp3LhMCPowdWtcDmQ3QbPkVWqG4t0MifbjABsCZpgANi4eJAH4Ufino2SgqqQIugmKunPWdUUh2gA0VtG98XObbwEjjFPbH9FhBCdNH0L0XH0R7gUpffE8dQR7Z-pnVETSUa_iBFC7nIHTs94xCfVrPVU3VqLxLqr9z63ZUKo8LRwSPGXf9ZbKOO2Lf8kASowu2j5DftNfH8kH3Kk3HniIGhqYTonSnvgzw"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#b9cacb] font-mono">
                    React
                  </span>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#b9cacb] font-mono">
                    TypeScript
                  </span>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#b9cacb] font-mono">
                    Tailwind
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#dbfcff] group-hover:text-[#00f0ff] transition-colors">
                  ATS Resume Builder
                </h3>
                <p className="text-xs text-[#b9cacb] mb-6 leading-relaxed">
                  Dynamic resume builder with 8+ templates, live preview, and instant PDF export. Achieved 98 average Lighthouse performance score.
                </p>
                <Link
                  className="inline-flex items-center gap-2 text-[#00f0ff] font-bold text-sm"
                  href="/case-study/resumebuilder"
                >
                  View Case Study
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        </section>

          {/* Desktop Work View */}
          <section className="hidden md:block py-24 px-20 max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-extrabold text-[#00f0ff] font-display">Selected Work</h2>
              <p className="text-[#b9cacb] mt-4">Engineering-first solutions for complex digital challenges.</p>
            </div>
            <div className="h-[1px] flex-grow mx-12 bg-white/10 mb-4"></div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* AgriThread Desktop */}
            <article className="bg-[#1a1d2e]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-[#00f0ff]/50 transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="/agrithread_showcase.png"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain bg-[#0d1515] opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#dbfcff]">AgriThread</h3>
                  <span className="bg-[#151d1e] px-3 py-1 text-[10px] font-bold tracking-widest text-[#00f0ff] rounded uppercase border border-white/5">
                    Scalable SaaS
                  </span>
                </div>
                <p className="text-sm text-[#b9cacb] mb-6 leading-relaxed">
                  Multi-role agricultural platform with real-time chat, job matching, and B2B marketplace. Scaled horizontally to handle thousands of concurrent users.
                </p>
                <div className="flex gap-6 items-center">
                  <a
                    className="bg-[#00f0ff] hover:bg-[#00dbe9] text-[#0d1515] px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:translate-y-[-1px] inline-flex items-center gap-1.5"
                    href="https://agrithread.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Live
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <Link
                    className="inline-flex items-center gap-2 text-[#00f0ff] font-bold hover:underline"
                    href="/case-study/agrithread"
                  >
                    View Case Study
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>

            {/* VerifyCertify Desktop */}
            <article className="bg-[#1a1d2e]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-[#00f0ff]/50 transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  alt="VerifyCertify Blockchain Verification"
                  src="/verifycertify.png"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain bg-[#0d1515] opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#dbfcff]">VerifyCertify</h3>
                  <span className="bg-[#151d1e] px-3 py-1 text-[10px] font-bold tracking-widest text-[#00f0ff] rounded uppercase border border-white/5">
                    Blockchain
                  </span>
                </div>
                <p className="text-sm text-[#b9cacb] mb-6 leading-relaxed">
                  Blockchain certificate verification system. Reduced validation time from days to seconds with secure cryptographics.
                </p>
                <div className="flex gap-6 items-center">
                  <a
                    className="bg-[#00f0ff] hover:bg-[#00dbe9] text-[#0d1515] px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:translate-y-[-1px] inline-flex items-center gap-1.5"
                    href="https://certify-nu-two.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Live
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <Link
                    className="inline-flex items-center gap-2 text-[#00f0ff] font-bold hover:underline"
                    href="/case-study/verifycertify"
                  >
                    View Case Study
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>

            {/* Featured ATS Resume Builder Desktop */}
            <article className="bg-[#1a1d2e]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-[#00f0ff]/50 transition-all duration-300 col-span-2 mt-4">
              <div className="grid grid-cols-2">
                <div className="aspect-video relative overflow-hidden border-r border-white/10">
                  <Image
                    alt="ATS Resume Builder Interface"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCIT0PCLqEE6QtSrKpJQkPhLEPEjwtRqoe1BPBwtSdp3LhMCPowdWtcDmQ3QbPkVWqG4t0MifbjABsCZpgANi4eJAH4Ufino2SgqqQIugmKunPWdUUh2gA0VtG98XObbwEjjFPbH9FhBCdNH0L0XH0R7gUpffE8dQR7Z-pnVETSUa_iBFC7nIHTs94xCfVrPVU3VqLxLqr9z63ZUKo8LRwSPGXf9ZbKOO2Lf8kASowu2j5DftNfH8kH3Kk3HniIGhqYTonSnvgzw"
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-[#dbfcff]">ATS Resume Builder</h3>
                    <span className="bg-[#151d1e] px-3 py-1 text-[10px] font-bold tracking-widest text-[#00f0ff] rounded uppercase border border-white/5">
                      Productivity
                    </span>
                  </div>
                  <p className="text-sm text-[#b9cacb] mb-6 leading-relaxed">
                    Dynamic resume builder with 8+ high-fidelity templates, real-time client-side preview, and instant PDF export. Built with client-side React PDF rendering, achieving a 98 average Lighthouse performance score.
                  </p>
                  <Link
                    className="inline-flex items-center gap-2 text-[#00f0ff] font-bold"
                    href="/case-study/resumebuilder"
                  >
                    View Case Study
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="py-24 bg-surface scroll-mt-20" id="testimonials">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary-fixed-dim mb-16 text-center">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="glass-card p-8 rounded-xl transition-all hover:-translate-y-2 hover:border-primary-fixed-dim/40 flex flex-col h-full">
              <div className="flex gap-1 text-primary-fixed-dim mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#00f0ff] fill-[#00f0ff]" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-on-surface-variant mb-8 flex-grow">"Idrees delivered a high-performance solution that exceeded our expectations. His attention to system architecture and performance is unmatched."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed-dim/10 flex items-center justify-center text-primary-fixed-dim font-bold">JD</div>
                <div>
                  <div className="font-display text-on-surface text-sm font-bold">John Doe</div>
                  <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">CTO, AgriTech Solutions</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 (Staggered) */}
            <div className="glass-card p-8 rounded-xl transition-all hover:-translate-y-2 hover:border-primary-fixed-dim/40 flex flex-col h-full md:mt-8">
              <div className="flex gap-1 text-primary-fixed-dim mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#00f0ff] fill-[#00f0ff]" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-on-surface-variant mb-8 flex-grow">"The blockchain implementation was seamless. We saw an immediate 90% reduction in verification times. A true engineering partner."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed-dim/10 flex items-center justify-center text-primary-fixed-dim font-bold">AS</div>
                <div>
                  <div className="font-display text-on-surface text-sm font-bold">Alice Smith</div>
                  <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Product Manager, BlockVerify</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-card p-8 rounded-xl transition-all hover:-translate-y-2 hover:border-primary-fixed-dim/40 flex flex-col h-full">
              <div className="flex gap-1 text-primary-fixed-dim mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#00f0ff] fill-[#00f0ff]" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-on-surface-variant mb-8 flex-grow">"His ability to work across the full stack while maintaining clean, maintainable code is rare. Highly recommended for complex projects."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed-dim/10 flex items-center justify-center text-primary-fixed-dim font-bold">MB</div>
                <div>
                  <div className="font-display text-on-surface text-sm font-bold">Michael Brown</div>
                  <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Founder, DevFlow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PROCESS SECTION ==================== */}
      <section className="py-24 bg-surface-container-lowest scroll-mt-20" id="process">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary-fixed-dim mb-16 text-center">Engineering Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-dashed border-t border-dashed border-white/10"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center md:items-start group">
              <div className="w-24 h-24 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center mb-6 transition-all group-hover:border-primary-fixed-dim group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <span className="font-mono text-xl font-bold text-primary-fixed-dim">01</span>
              </div>
              <h4 className="font-display text-lg font-bold mb-2">Discovery</h4>
              <p className="text-on-surface-variant text-center md:text-left text-sm">Mapping requirements and defining technical specifications.</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center md:items-start group">
              <div className="w-24 h-24 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center mb-6 transition-all group-hover:border-primary-fixed-dim group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <span className="font-mono text-xl font-bold text-primary-fixed-dim">02</span>
              </div>
              <h4 className="font-display text-lg font-bold mb-2">Architecture</h4>
              <p className="text-on-surface-variant text-center md:text-left text-sm">Designing data models and selecting the optimal stack.</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center md:items-start group">
              <div className="w-24 h-24 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center mb-6 transition-all group-hover:border-primary-fixed-dim group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <span className="font-mono text-xl font-bold text-primary-fixed-dim">03</span>
              </div>
              <h4 className="font-display text-lg font-bold mb-2">Iteration</h4>
              <p className="text-on-surface-variant text-center md:text-left text-sm">Agile development cycles with continuous integration.</p>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center md:items-start group">
              <div className="w-24 h-24 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center mb-6 transition-all group-hover:border-primary-fixed-dim group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <span className="font-mono text-xl font-bold text-primary-fixed-dim">04</span>
              </div>
              <h4 className="font-display text-lg font-bold mb-2">Launch</h4>
              <p className="text-on-surface-variant text-center md:text-left text-sm">Deployment, optimization, and seamless handover.</p>
            </div>
          </div>
        </div>
      </section>

        {/* ==================== CAREER TIMELINE ==================== */}
        <div id="timeline" className="py-24 bg-[#080f10] border-y border-white/5">
          <section className="max-w-[1280px] mx-auto px-6 md:px-20">
            {/* Header */}
            <div className="mb-20 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-[#00f0ff] mb-6 font-display">
                Career Timeline
              </h2>
              <p className="text-lg text-[#b9cacb] max-w-2xl">
                Professional journey shipping scalable web, mobile, and cryptographic systems.
              </p>
            </div>

            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Connector Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-[#3b494b] -translate-x-1/2 hidden md:block"></div>
              <div className="absolute left-4 top-0 bottom-0 w-[1px] border-l border-dashed border-[#3b494b] md:hidden"></div>

              {/* Entry 1: Slincom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 w-full"
              >
                <div className="hidden md:block w-[45%] text-right pr-12">
                  <span className="font-mono text-xs text-[#00dbe9] tracking-widest uppercase">Dec 2025 – Present</span>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#00f0ff] rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_#00f0ff] animate-pulse"></div>
                <div className="w-full md:w-[45%] ml-12 md:ml-0 bg-[#192122]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:translate-y-[-4px] transition-all duration-300">
                  <div className="md:hidden mb-4 font-mono text-xs text-[#00dbe9] uppercase">Dec 2025 – Present</div>
                  <h3 className="text-xl font-bold text-[#dbfcff] mb-1 font-display">Full-Stack Developer</h3>
                  <p className="text-[#00dbe9] font-medium mb-4">Slincom</p>
                  <p className="text-sm text-[#b9cacb] mb-6 leading-relaxed">
                    Developed AgriThread Platform, integrated Socket.io sync for real-time B2B messaging, geospatial coordinates mapping, and Razorpay gateway for seamless transactions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Next.js
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Socket.io
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                      Redis
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Entry 2: Freelancing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col md:flex-row-reverse items-center justify-between mb-16 md:mb-24 w-full"
              >
                <div className="hidden md:block w-[45%] text-left pl-12">
                  <span className="font-mono text-xs text-[#00dbe9] tracking-widest uppercase">Jan 2025 – Present</span>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#00f0ff] rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_#00f0ff] animate-pulse"></div>
                <div className="w-full md:w-[45%] ml-12 md:ml-0 bg-[#192122]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:translate-y-[-4px] transition-all duration-300">
                  <div className="md:hidden mb-4 font-mono text-xs text-[#00dbe9] uppercase">Jan 2025 – Present</div>
                  <h3 className="text-xl font-bold text-[#dbfcff] mb-1 font-display">Full-Stack Developer</h3>
                  <p className="text-[#00dbe9] font-medium mb-4">Freelancing</p>
                  <p className="text-sm text-[#b9cacb] mb-6 leading-relaxed">
                    Built a dynamic React Resume Builder featuring 8+ high-fidelity templates and client-side PDF rendering engine for optimized performance and instant feedback.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      React
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      PDF.js
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Tailwind
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Entry 3: Hashtag Systems */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 w-full"
              >
                <div className="hidden md:block w-[45%] text-right pr-12">
                  <span className="font-mono text-xs text-[#00dbe9] tracking-widest uppercase">Jun 2022 – Mar 2024</span>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#00f0ff] rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_#00f0ff] animate-pulse"></div>
                <div className="w-full md:w-[45%] ml-12 md:ml-0 bg-[#192122]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:translate-y-[-4px] transition-all duration-300">
                  <div className="md:hidden mb-4 font-mono text-xs text-[#00dbe9] uppercase">Jun 2022 – Mar 2024</div>
                  <h3 className="text-xl font-bold text-[#dbfcff] mb-1 font-display">Full-Stack Developer</h3>
                  <p className="text-[#00dbe9] font-medium mb-4">Hashtag Systems</p>
                  <p className="text-sm text-[#b9cacb] mb-6 leading-relaxed">
                    Optimized 'Ring Of Hires' platform with custom Google Maps integration resulting in 40% latency reduction. Developed 'LogX' iOS App increasing QR scanning efficiency by 50%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      React Native
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Google Maps
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                      PostgreSQL
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Entry 4: TruScholar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col md:flex-row-reverse items-center justify-between w-full"
              >
                <div className="hidden md:block w-[45%] text-left pl-12">
                  <span className="font-mono text-xs text-[#00dbe9] tracking-widest uppercase">Jun 2021 – May 2022</span>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#00f0ff] rounded-full -translate-x-1/2 z-10 shadow-[0_0_15px_#00f0ff] animate-pulse"></div>
                <div className="w-full md:w-[45%] ml-12 md:ml-0 bg-[#192122]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:translate-y-[-4px] transition-all duration-300">
                  <div className="md:hidden mb-4 font-mono text-xs text-[#00dbe9] uppercase">Jun 2021 – May 2022</div>
                  <h3 className="text-xl font-bold text-[#dbfcff] mb-1 font-display">Full-Stack Developer &amp; Intern</h3>
                  <p className="text-[#00dbe9] font-medium mb-4">TruScholar</p>
                  <p className="text-sm text-[#b9cacb] mb-6 leading-relaxed">
                    Engineered a robust bulk certificate download system using Redis and Bull.js for asynchronous processing, achieving a 30% increase in system throughput.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                      Redis
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7a3 3 0 100-6 3 3 0 000 6zM8 17a3 3 0 100-6 3 3 0 000 6zM16 12a3 3 0 100-6 3 3 0 000 6zM8 7v6m0 0a3 3 0 003 3h3" />
                      </svg>
                      Bull.js
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                      Express
                    </span>
                    <span className="px-3 py-1 bg-[#2e3637]/50 text-[#dbfcff] text-[12px] font-mono rounded flex items-center gap-1.5 border border-white/5">
                      <svg className="w-3.5 h-3.5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h4m10-12H9M9 7v10M9 7a2 2 0 012-2h8" />
                      </svg>
                      MongoDB
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* ==================== TECHNICAL PROFICIENCY (Desktop Only) ==================== */}
        <section className="hidden md:block py-24 px-20 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-[#00f0ff] mb-8 font-display">Technical Proficiency</h2>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Socket.io', 'Solana', 'Docker', 'AWS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-[#151d1e] border border-white/5 rounded text-[#b9cacb] text-xs font-mono flex items-center gap-2 hover:border-[#00f0ff] transition-colors cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]"></span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-[#192122]/40 backdrop-blur-md p-10 rounded-2xl border border-[#00f0ff]/20 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-white/5" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-[#00f0ff]" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="12.5" strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-[#00f0ff] font-display">95</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#b9cacb] font-bold font-mono">Score</span>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#dbfcff] font-display">Performance Standards</h3>
              <p className="text-[#b9cacb] text-sm leading-relaxed">
                Lighthouse 95+ average across all production deployments. Prioritizing Core Web Vitals and accessibility from line one.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== CONTACT SECTION ==================== */}
        <section className="py-24 bg-[#0d1515] relative" id="contact">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-gradient-to-b from-[#00f0ff]/5 to-transparent blur-3xl -z-10 pointer-events-none"></div>
          <div className="max-w-[1280px] mx-auto px-6 md:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Left Column: Contact Info */}
              <div className="flex flex-col space-y-8">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#dce4e5] mb-4">
                    Get in <span className="text-[#00f0ff]">Touch</span>
                  </h2>
                  <p className="text-lg text-[#b9cacb] max-w-md">
                    Let's collaborate on your next project or discuss engineering opportunities.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="glass-card p-6 rounded-xl flex items-center gap-6 transition-all hover:border-[#00f0ff]/30">
                    <div className="w-12 h-12 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#00f0ff]">mail</span>
                    </div>
                    <span className="text-base text-[#dce4e5]">khanidrees1234@gmail.com</span>
                  </div>
                  <div className="glass-card p-6 rounded-xl flex items-center gap-6 transition-all hover:border-[#00f0ff]/30">
                    <div className="w-12 h-12 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#00f0ff]">call</span>
                    </div>
                    <span className="text-base text-[#dce4e5]">+918668233045</span>
                  </div>
                  <div className="glass-card p-6 rounded-xl flex items-center gap-6 transition-all hover:border-[#00f0ff]/30">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 bg-green-500 rounded-full pulse-dot"></div>
                    </div>
                    <span className="text-base text-[#dce4e5]">Available for new projects & roles</span>
                  </div>
                </div>
              </div>
              {/* Right Column: Contact Form */}
              <div className="glass-card p-8 md:p-10 rounded-xl">
                {formStatus === 'success' ? (
                  <div className="bg-[#00f0ff]/10 border border-[#00f0ff]/30 p-6 rounded-lg text-center space-y-3">
                    <svg className="w-12 h-12 text-[#00f0ff] mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-display text-lg font-bold text-[#dbfcff]">Message Sent!</h3>
                    <p className="text-sm text-[#b9cacb]">Thank you for reaching out, Idrees will get back to you shortly.</p>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-[#b9cacb] block uppercase tracking-wider" htmlFor="name">Name</label>
                      <input className="w-full bg-[#0d1515] border border-white/10 rounded-lg p-4 text-base text-[#dce4e5] focus:outline-none focus:ring-2 focus:ring-[#00f0ff] focus:border-transparent transition-all placeholder:text-white/20" id="name" placeholder="John Doe" type="text" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-[#b9cacb] block uppercase tracking-wider" htmlFor="email">Email</label>
                      <input className="w-full bg-[#0d1515] border border-white/10 rounded-lg p-4 text-base text-[#dce4e5] focus:outline-none focus:ring-2 focus:ring-[#00f0ff] focus:border-transparent transition-all placeholder:text-white/20" id="email" placeholder="john@example.com" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-[#b9cacb] block uppercase tracking-wider" htmlFor="message">Message</label>
                      <textarea className="w-full bg-[#0d1515] border border-white/10 rounded-lg p-4 text-base text-[#dce4e5] focus:outline-none focus:ring-2 focus:ring-[#00f0ff] focus:border-transparent transition-all placeholder:text-white/20 min-h-[150px]" id="message" placeholder="How can I help you?" value={formData.message} onChange={handleInputChange} required></textarea>
                    </div>
                    {formStatus === 'error' && (
                      <p className="text-sm text-red-400">Oops! Something went wrong. Please try again.</p>
                    )}
                    <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-[#00f0ff] text-[#0d1515] font-bold py-4 rounded-lg transition-all hover:translate-y-[-4px] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] active:scale-95 disabled:opacity-50">
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER / SOCIALS & ACTIVITY ==================== */}
      <section className="py-24 px-6 md:px-20 max-w-[1280px] mx-auto">
        {/* Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <a
            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl transition-all hover:border-[#00f0ff] group hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
            href="https://linkedin.com/in/idrees-khan-fullstack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#00f0ff] text-4xl mb-4">link</span>
              <h3 className="font-display text-xl font-semibold text-[#dce4e5] mb-2">LinkedIn</h3>
              <p className="font-mono text-sm text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                idrees-khan-fullstack
              </p>
            </div>
          </a>

          <a
            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl transition-all hover:border-[#00f0ff] group hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
            href="https://github.com/khanidrees"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#00f0ff] text-4xl mb-4">code</span>
              <h3 className="font-display text-xl font-semibold text-[#dce4e5] mb-2">GitHub</h3>
              <p className="font-mono text-sm text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                khanidrees
              </p>
            </div>
          </a>

          <a
            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl transition-all hover:border-[#00f0ff] group hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
            href="https://www.scaler.com/academy/profile/5e965ca35d2c/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#00f0ff] text-4xl mb-4">verified</span>
              <h3 className="font-display text-xl font-semibold text-[#dce4e5] mb-2">Scaler</h3>
              <p className="font-mono text-sm text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                5e965ca35d2c
              </p>
            </div>
          </a>
        </div>

      </section>

      {/* Actual Copyright Footer */}
      <footer className="bg-[#080f10] border-t border-white/5 w-full py-16">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto px-6 md:px-20 gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="font-display text-2xl font-bold text-[#dce4e5]">Idrees Khan Pathan</div>
            <p className="text-sm text-[#b9cacb]">© 2026 Full-Stack Engineer</p>
          </div>
          <div className="flex gap-8">
            <a className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors text-sm" href="https://linkedin.com/in/idrees-khan-fullstack" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors text-sm" href="https://github.com/khanidrees" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-[#b9cacb] hover:text-[#00f0ff] transition-colors text-sm" href="https://www.scaler.com/academy/profile/5e965ca35d2c/" target="_blank" rel="noopener noreferrer">Scaler</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
