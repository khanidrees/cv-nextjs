# Portfolio Website — Issue Tracker

---

## Issue #1 — Project Bootstrap & Design System

**Type**: AFK  
**Blocked by**: None — can start immediately

## What to build

Initialize the Next.js 15 project with TypeScript and App Router. Install all required dependencies: `framer-motion`, `@emailjs/browser`, `react-type-animation`, `react-intersection-observer`. Configure the global CSS design system with dark-mode color tokens (deep dark background, electric blue, vivid purple, hot coral, lime green), Google Fonts (Outfit + Inter), utility classes, scrollbar styling, and CSS custom properties.

## Acceptance criteria

- [ ] Next.js 15 app bootstraps and runs with `npm run dev`
- [ ] All required npm dependencies are installed
- [ ] `globals.css` defines the full color palette via CSS custom properties
- [ ] Outfit and Inter fonts are loaded via Google Fonts
- [ ] `npm run lint` passes with zero errors

---

## Issue #2 — Navigation Shell & Layout Wrapper

**Type**: AFK  
**Blocked by**: #1

## What to build

Build the fixed top Navbar with smooth-scroll anchor links (Hero, About, Skills, Experience, Projects, GitHub, Contact), active section highlight on scroll, frosted glass effect (`backdrop-filter: blur`), and a responsive hamburger menu for mobile. Create the root layout file with SEO-ready HTML structure. Add a scroll progress bar at the top of the page. Add a minimal Footer.

## Acceptance criteria

- [ ] Navbar renders on all pages and is fixed to top
- [ ] Clicking nav links smooth-scrolls to the correct section
- [ ] Active nav link updates as user scrolls through sections
- [ ] Hamburger menu opens/closes correctly on mobile
- [ ] Scroll progress bar fills from 0% to 100% as user scrolls

---

## Issue #3 — Personal Data Layer

**Type**: AFK  
**Blocked by**: #1

## What to build

Create a single `src/data/personal.ts` file as the source of truth for all portfolio content — personal info, social links, skills (grouped by category), full work experience with bullet points, and project details. All page sections will import from this file, so content can be updated in one place without touching component code.

## Acceptance criteria

- [ ] `personal.ts` exports: `personalInfo`, `skills`, `experience`, `projects`, `testimonials`
- [ ] All CV data (Slincom, Hashtag Systems, TruScholar, all projects) is accurately represented
- [ ] TypeScript types are defined for each data shape
- [ ] File compiles cleanly with no type errors

---

## Issue #4 — Hero Section

**Type**: AFK  
**Blocked by**: #2, #3

## What to build

Full-viewport hero section with: large name display (`Idrees Khan Pathan`), an animated typing effect cycling through *Full-Stack Developer → React Native Engineer → Node.js Architect → Open Source Builder*, a freelance-focused tagline ("I ship production-ready products that scale."), two CTAs — **Hire Me** (scrolls to Contact) and **Download CV** (links to `/resume.pdf`), a profile photo slot (`public/profile.jpg`) with a colorful geometric border ring, and floating decorative tech-stack chip animations using Framer Motion.

## Acceptance criteria

- [ ] Hero fills 100vh on all screen sizes
- [ ] Typing animation cycles through all 4 roles and loops
- [ ] "Download CV" button links to `/resume.pdf` and triggers download
- [ ] "Hire Me" button smooth-scrolls to the Contact section
- [ ] Profile photo renders (or shows a styled placeholder if no file)
- [ ] Floating tech chips animate correctly

---

## Issue #5 — About Section

**Type**: AFK  
**Blocked by**: #2, #3

## What to build

Two-column About section with the profile photo on the left and a text bio on the right (columns stack on mobile). The bio should be written in a freelance-focused tone emphasizing delivery speed and business impact. Below the bio, a stats row shows: *4+ Years Experience · 3 Companies · 10+ Projects Shipped*. Section fades in on scroll via Framer Motion.

## Acceptance criteria

- [ ] Two-column layout renders on desktop, stacks on mobile
- [ ] Stats row displays with correct values
- [ ] Section animates in on scroll
- [ ] Copy is freelance-focused and compelling

---

## Issue #6 — Skills Section

**Type**: AFK  
**Blocked by**: #2, #3

## What to build

Responsive badge grid of skills grouped into categories: **Frontend**, **Backend**, **Mobile**, **Databases & Infra**, **Tools**. Each badge shows the technology name with its Simple Icons SVG icon. On hover, the badge lifts and glows with a category-specific accent color. Skills cover: JavaScript, TypeScript, React, Next.js, React Native, Node.js, Express.js, PostgreSQL, MongoDB, Redis, Prisma, Socket.io, BullMQ, Google Maps API, HTML/CSS, Git.

## Acceptance criteria

- [ ] All skills from CV are represented in the correct category
- [ ] Hover glow effect triggers per badge
- [ ] Responsive grid works at 375px and 1440px
- [ ] Section title and category labels are clearly readable

---

## Issue #7 — Experience Timeline Section

**Type**: AFK  
**Blocked by**: #2, #3

## What to build

Vertical timeline of work history sourced from `personal.ts`. Each entry shows: company name (with a colored accent dot), role title, date range, and full bullet-point list from the CV. Company accent colors: Slincom (blue), Freelancing (purple), Hashtag Systems (coral), TruScholar (lime). Timeline items slide in from the left on scroll using Framer Motion.

## Acceptance criteria

- [ ] All 5 experience entries from the CV render correctly
- [ ] Company-specific accent colors are applied per entry
- [ ] Bullet points match CV content accurately
- [ ] Timeline scroll animation triggers for each item
- [ ] Renders cleanly on mobile

---

## Issue #8 — Projects Section (Hover-Expand Cards)

**Type**: AFK  
**Blocked by**: #2, #3

## What to build

Grid of project cards. Card front shows: project name, one-liner description, and tech stack pills. On hover (desktop) or tap (mobile), an overlay expands revealing the full project description, a **Live Link** button and optionally a **GitHub** button. Projects to include: **AgriThread** (featured, larger card), **CV Builder** (freelance), **VerifyCertify** (certify-nu-two.vercel.app).

## Acceptance criteria

- [ ] All 3 projects render as cards
- [ ] Hover/tap expands the details overlay smoothly
- [ ] Tech stack pills render correctly per project
- [ ] Live links open in a new tab
- [ ] AgriThread card is visually larger/featured
- [ ] Cards are responsive on mobile

---

## Issue #9 — GitHub Stats & Heatmap Section

**Type**: AFK  
**Blocked by**: #2

## What to build

A section embedding two GitHub Readme Stats image cards for username `khanidrees`: a general stats card and a streak/contribution card. Cards are rendered side-by-side on desktop, stacked on mobile. Theme matches the site's dark palette. A link to the GitHub profile is also included.

## Acceptance criteria

- [ ] Both stat cards load correctly in the browser
- [ ] Cards are themed to match the site's dark palette
- [ ] GitHub profile link opens `https://github.com/khanidrees` in a new tab
- [ ] Section is responsive

---

## Issue #10 — Testimonials Section

**Type**: AFK  
**Blocked by**: #2

## What to build

A visually rich section with 3 placeholder client testimonial quote cards. Each card shows: a quote, star rating (5 stars), client name, and role/company. Cards are displayed in a staggered grid with subtle hover lift effects. Content is sourced from `personal.ts` so it can be replaced with real testimonials later.

## Acceptance criteria

- [ ] 3 testimonial cards render correctly
- [ ] Star ratings display visually
- [ ] Hover lift animation works
- [ ] Section is clearly labelled as a testimonials area
- [ ] Data is driven from `personal.ts` (not hardcoded in JSX)

---

## Issue #11 — Contact Section (EmailJS Form + Social Links)

**Type**: AFK  
**Blocked by**: #2

## What to build

Two-column contact section. Left column: contact info (email, phone, LinkedIn, GitHub, location). Right column: a contact form with Name, Email, and Message fields submitted via `@emailjs/browser`. On successful send, show a toast success notification. On failure, show an error toast. Social icon links are displayed at the bottom of the section. EmailJS credentials are read from environment variables defined in `.env.local`.

## Acceptance criteria

- [ ] Form renders with Name, Email, Message fields
- [ ] Form submits via EmailJS (credentials via env vars)
- [ ] Success toast appears on submission
- [ ] Error toast appears on failure
- [ ] All social links (LinkedIn, GitHub, email) are correct and open correctly
- [ ] Section is responsive on mobile

---

## Issue #12 — SEO Metadata, Build Verification & Env Template

**Type**: AFK  
**Blocked by**: #1–#11

## What to build

Export `generateMetadata` from the root page with full SEO tags: title, description, Open Graph image/title/description, Twitter card. Create a `.env.local.example` template file with all required environment variable keys and comments explaining where to get each value (EmailJS setup guide). Run `npm run build` and `npm run lint` and confirm zero errors.

## Acceptance criteria

- [ ] `generateMetadata` exports correct title and description
- [ ] Open Graph and Twitter Card meta tags are present in page HTML
- [ ] `.env.local.example` documents all 3 EmailJS vars with comments
- [ ] `npm run build` completes with zero TypeScript/build errors
- [ ] `npm run lint` passes with zero warnings

---

## Issue #13 — Profile Photo & CV PDF Assets (HITL)

**Type**: HITL  
**Blocked by**: None — can be done at any time

## What to build

This issue requires manual action from the developer (not an agent):

1. Place `profile.jpg` (or `.png`) in the `public/` directory.
2. Place `resume.pdf` in the `public/` directory.

These assets are referenced by the Hero and About sections. Without them, a styled placeholder will be shown for the photo and the CV download button will show a 404.

## Acceptance criteria

- [ ] `public/profile.jpg` exists and is a clear, professional photo
- [ ] `public/resume.pdf` exists and is the latest version of the CV
- [ ] Profile photo renders correctly in Hero and About sections
- [ ] CV download button downloads the PDF successfully
