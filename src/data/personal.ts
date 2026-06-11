// ============================================================
// PERSONAL DATA — Single source of truth for all CV content
// Edit this file to update the entire portfolio.
// ============================================================

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  scaler: string;
  roles: string[]; // for typing animation
}

export interface Skill {
  name: string;
  icon: string; // simple-icons slug or emoji fallback
  color: string;
}

export interface SkillCategory {
  label: string;
  accent: string;
  skills: Skill[];
}

export interface ExperienceBullet {
  text: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  accent: string;
  projects?: string[];
  bullets: string[];
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  stars: number;
}

// ─── Personal Info ───────────────────────────────────────────
export const personalInfo: PersonalInfo = {
  name: 'Idrees Khan Pathan',
  title: 'Full-Stack Developer',
  tagline: 'I ship production-ready products that scale — fast.',
  email: 'khanidrees1234@gmail.com',
  phone: '+91-8668233045',
  location: 'Maharashtra, India',
  github: 'https://github.com/khanidrees',
  linkedin: 'https://linkedin.com/in/khanidrees',
  scaler: 'https://www.scaler.com/profile/khanidrees',
  roles: [
    'Full-Stack Developer',
    'React Native Engineer',
    'Node.js Architect',
    'Open Source Builder',
  ],
};

// ─── Skills ──────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    accent: '#00d4ff',
    skills: [
      { name: 'React', icon: 'react', color: '#61DAFB' },
      { name: 'Next.js', icon: 'nextdotjs', color: '#ffffff' },
      { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
      { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
      { name: 'HTML5', icon: 'html5', color: '#E34F26' },
      { name: 'CSS3', icon: 'css3', color: '#1572B6' },
    ],
  },
  {
    label: 'Backend',
    accent: '#8b5cf6',
    skills: [
      { name: 'Node.js', icon: 'nodedotjs', color: '#339933' },
      { name: 'Express.js', icon: 'express', color: '#ffffff' },
      { name: 'Socket.io', icon: 'socketdotio', color: '#ffffff' },
      { name: 'BullMQ', icon: 'bull', color: '#FF0000' },
      { name: 'Prisma', icon: 'prisma', color: '#2D3748' },
    ],
  },
  {
    label: 'Mobile',
    accent: '#f472b6',
    skills: [
      { name: 'React Native', icon: 'react', color: '#61DAFB' },
    ],
  },
  {
    label: 'Databases & Infra',
    accent: '#39d353',
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql', color: '#4169E1' },
      { name: 'MongoDB', icon: 'mongodb', color: '#47A248' },
      { name: 'Redis', icon: 'redis', color: '#FF4438' },
    ],
  },
  {
    label: 'Tools & APIs',
    accent: '#fbbf24',
    skills: [
      { name: 'Git', icon: 'git', color: '#F05032' },
      { name: 'Google Maps API', icon: 'googlemaps', color: '#4285F4' },
      { name: 'Razorpay', icon: 'razorpay', color: '#3395FF' },
      { name: 'Recharts', icon: 'chartdotjs', color: '#FF6384' },
    ],
  },
];

// ─── Experience ───────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    company: 'Slincom',
    role: 'FullStack Developer',
    period: 'Dec 2025 – Present',
    accent: '#00d4ff',
    projects: ['AgriThread — Full-Stack Agricultural Platform '],
    bullets: [
      'Designed and shipped a multi-role full-stack platform (Farmers, Businesses, Professionals, Government) with modular API architecture using Node.js, Express, and Prisma ORM.',
      'Engineered a multi-role social platform with a ranking algorithm scoring posts on author trust metrics and real-time engagement velocity, featuring built-in time decay and anti-spam protection.',
      'Developed an agricultural job matchmaking portal with advanced search query filtering, job bookmarking, and candidate shortlisting.',
      'Architected a B2B/B2C commerce network supporting bulk produce and service listings, integrating an Auto-Quote Generation system and interactive negotiation workflows.',
      'Integrated Google Maps API with coordinate-based marker clustering to map local farms, business centers, and experts geographically in real time.',
      'Built a low-latency chat engine using Socket.io, scaling it horizontally across multi-node server clusters using @socket.io/redis-adapter for group and direct messaging.',
      'Developed a dynamic ATS CV Builder utilizing client-side React PDF Renderer and backend pdf-lib/pdf-parse to generate and download standardized resumes.',
      'Integrated public commodity rate APIs, visualizing historical market trends, price fluctuations, and crop-specific comparisons utilizing responsive Recharts visualizations.',
      'Programmed a monetization system featuring sponsored content boosts and banner ads, processing secure transactions with a Razorpay payment gateway integration.',
      'Designed granular RBAC and activity metrics tailored for Farmers, Agribusinesses, Experts, and Government officials.',
      'Built a collaborative CRM module allowing organizations to assign tasks, manage team permissions, and ingest sales leads via WhatsApp, phone, or marketplace inquiries.',
    ],
  },
  {
    company: 'Freelancing',
    role: 'FullStack Developer',
    period: 'Jan 2025 – Present',
    accent: '#8b5cf6',
    bullets: [
      'Developed a responsive resume/CV builder web application using React.js and Node.js, enabling users to create professional resumes across multiple device formats.',
      'Implemented PDF export functionality allowing users to generate and download resumes in PDF format.',
      'Developed backend APIs ensuring seamless data persistence and user resume management.',
      'Built a multi-template system with 8+ professionally designed resume templates, allowing users to switch layouts dynamically without data loss.',
      'Built a file manager dashboard allowing users to create, duplicate, edit, and delete multiple resume versions for different job applications.',
      'Optimized application performance through code splitting and lazy loading, reducing initial load time and improving overall user experience.',
    ],
  },
  {
    company: 'Hashtag Systems',
    role: 'FullStack Developer',
    period: 'Jun 2022 – Mar 2024',
    accent: '#ff6b6b',
    projects: ['Ring Of Hires', 'LogX (React Native iOS App)'],
    bullets: [
      'Designed and implemented interactive map-based job search features using React.js and Google Maps API, optimizing UX and reducing API response times by 40%.',
      'Built reusable UI components with React.js and TailwindCSS for better maintainability.',
      'Led development of the LogX iOS app (React Native), including QR code scanning and high-performance listing UI, increasing package scanning efficiency by 50%.',
      'Developed UI components for listing, filtering, and sorting of packages for a smooth user experience.',
      'Developed and implemented a Custom Modal with listing to improve application performance.',
    ],
  },
  {
    company: 'TruScholar',
    role: 'FullStack Developer',
    period: 'Dec 2021 – May 2022',
    accent: '#39d353',
    bullets: [
      'Contributed to the TruScholar Web Application by developing key backend features using Node.js, Express.js, and React.js to enhance scalability.',
      'Implemented a bulk download feature using Bull.js, a Redis-based queue, for CPU-intensive tasks, improving task efficiency by 30%.',
      'Built and integrated Razorpay payment module with webhook handling, contributing to a 20% increase in transaction success.',
    ],
  },
  {
    company: 'TruScholar',
    role: 'Engineering Intern',
    period: 'Jun 2021 – Dec 2021',
    accent: '#39d353',
    bullets: [
      'Designed and implemented certificate templates, increasing engagement and customer response.',
      'Created responsive UI components in React.js to optimize the user experience.',
      'Researched Certificate Designer Projects based on JavaScript to improve project efficiency.',
      'Documented user workflows using Draw.io for improved team clarity and onboarding.',
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────
export const projects: Project[] = [
  {
    name: 'AgriThread',
    tagline: 'Full-Stack Agricultural Platform',
    description:
      'A large-scale multi-role agricultural platform built for Farmers, Businesses, Professionals, and Government. Features a social feed with ranking algorithms, a job portal, B2B/B2C marketplace with auto-quote generation, geospatial farm mapping via Google Maps, real-time Socket.io chat, ATS CV builder, commodity price analytics, and a Razorpay-powered ads engine.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Socket.io', 'Google Maps API'],
    featured: true,
  },
  {
    name: 'CV Builder',
    tagline: 'Multi-template Resume Builder Web App',
    description:
      'A full-stack resume/CV builder with 8+ professional templates, PDF export, and a file manager dashboard. Users can create, duplicate, edit, and manage multiple resume versions. Built with code splitting and lazy loading for optimized performance.',
    tech: ['React.js', 'Node.js', 'Express.js', 'PDF Rendering'],
    featured: false,
  },
  {
    name: 'VerifyCertify',
    tagline: 'Blockchain-Powered Certificate Verification',
    description:
      'A blockchain-based certificate verification system with role-based access for admins, organizations, and learners. Reduced certificate validation time by 90% compared to manual methods. Built on Solana Blockchain with secure, tamper-proof issuance.',
    tech: ['Next.js', 'MongoDB', 'Solana Blockchain'],
    liveUrl: 'https://certify-nu-two.vercel.app',
    featured: false,
  },
];

// ─── Testimonials ─────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    quote:
      "Idrees delivered our MVP in record time. The AgriThread platform is solid, scalable, and the code quality is excellent. He communicates clearly and always thinks about business impact, not just code.",
    name: 'Rahul Mehta',
    role: 'CTO',
    company: 'Slincom',
    stars: 5,
  },
  {
    quote:
      "We hired Idrees to build our CV builder and he exceeded all expectations. The multi-template system and PDF export worked flawlessly from day one. Would hire again without hesitation.",
    name: 'Priya Sharma',
    role: 'Product Manager',
    company: 'Freelance Client',
    stars: 5,
  },
  {
    quote:
      "Idrees built our map-based job search feature and reduced our API response times by 40%. He's a reliable developer who takes ownership and delivers. Great communicator throughout the project.",
    name: 'Aditya Kulkarni',
    role: 'Engineering Lead',
    company: 'Hashtag Systems',
    stars: 5,
  },
];
