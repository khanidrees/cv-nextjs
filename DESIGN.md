---
name: Technical Distinction
colors:
  surface: '#0d1515'
  surface-dim: '#0d1515'
  surface-bright: '#333b3b'
  surface-container-lowest: '#080f10'
  surface-container-low: '#151d1e'
  surface-container: '#192122'
  surface-container-high: '#232b2c'
  surface-container-highest: '#2e3637'
  on-surface: '#dce4e5'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dce4e5'
  inverse-on-surface: '#2a3233'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#c6c6cf'
  on-secondary: '#2f3037'
  secondary-container: '#45464e'
  on-secondary-container: '#b4b4bd'
  tertiary: '#f6f5ff'
  on-tertiary: '#2c2f41'
  tertiary-container: '#d6d8ef'
  on-tertiary-container: '#5b5e71'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e2e1eb'
  secondary-fixed-dim: '#c6c6cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#45464e'
  tertiary-fixed: '#dfe1f9'
  tertiary-fixed-dim: '#c3c5dc'
  on-tertiary-fixed: '#181b2b'
  on-tertiary-fixed-variant: '#434659'
  background: '#0d1515'
  on-background: '#dce4e5'
  surface-variant: '#2e3637'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  code:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  max-width: 1280px
---

## Brand & Style

The design system is engineered for high-end professional developer portfolios, prioritizing a "Technical Elegance" aesthetic. It targets recruiters and engineering leads who value precision, clarity, and modern technical proficiency. 

The style merges **Minimalism** with **Glassmorphism**, utilizing deep atmospheric depths punctuated by high-energy accent glows. The interface should feel like a high-performance terminal—fast, focused, and data-driven. Visual hierarchy is established through extreme contrast between the dark foundation and neon-precise accents, ensuring that technical metrics and project outcomes are the primary focus.

## Colors

The color palette is built on a "Void and Neon" logic to emphasize technical sophistication.

- **Primary (#00F0FF):** A vivid teal-cyan used exclusively for interactive elements, progress indicators, and critical metrics.
- **Surface (#1A1D2E):** The secondary background for cards and containers, providing enough contrast against the base to create perceived depth.
- **Neutral/Secondary (#A1A1AA):** Zinc-gray used for metadata, labels, and helper text to prevent visual fatigue.
- **Background (#0B0D17):** A deep, near-black charcoal that serves as the canvas for glassmorphic effects.

## Typography

This design system utilizes a trio of typefaces to delineate function. **Plus Jakarta Sans** provides a geometric, bold personality for headings. **Inter** is the workhorse for body copy, chosen for its exceptional legibility at small sizes. **Geist** (or a similar mono-variant) is used for labels and technical data to reinforce the developer-centric narrative.

Maintain tight tracking on display headings to emphasize the "bold/technical" look. Increase line height for body text to ensure readability against high-contrast backgrounds.

## Layout & Spacing

The system employs a **Fixed Grid** model for desktop to ensure structured, editorial-style layouts, transitioning to a fluid model for mobile devices.

- **Desktop:** 12-column grid, 1280px max-width, 24px gutters.
- **Mobile:** 4-column grid, 20px side margins.
- **Spacing Rhythm:** Based on a 4px baseline. Use generous vertical padding (80px+) between sections to create an "open" feel that mirrors high-end SaaS marketing pages. 

Components should use internal padding of 24px (sm) or 32px (lg) to maintain the airy, premium aesthetic.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional shadows.

1.  **Level 0 (Base):** The #0B0D17 background.
2.  **Level 1 (Cards):** #1A1D2E with a 1px border of white at 10% opacity.
3.  **Level 2 (Hover/Active):** Addition of a subtle 10px blur backdrop and a primary-color (#00F0FF) "inner glow" or "border glow" at 20% opacity.

Avoid heavy black drop shadows. Instead, use "Ambient Glows"—large, low-opacity (#00F0FF at 5%) blurs behind key project cards to simulate a light source from the content itself.

## Shapes

The design system uses a **Soft (0.25rem)** rounding strategy. This provides a modern touch without sacrificing the professional "sharpness" required for a technical portfolio. 

- **Small elements (Tags, Chips):** 4px (rounded-sm).
- **Standard containers (Cards, Inputs):** 8px (rounded-lg).
- **Featured sections:** 12px (rounded-xl).
- **Buttons:** 4px to maintain a precise, "utility-tool" appearance.

## Components

### Buttons & CTAs
- **Primary:** Solid #00F0FF background with #0B0D17 text. Sharp 4px corners. No gradients.
- **Secondary:** Transparent background with 1px border of #00F0FF and cyan text.
- **Hover State:** Translate -2px Y-axis with a subtle outer glow of the primary color.

### Project Cards
- **Structure:** Surface-tier background (#1A1D2E), 1px subtle border, padding 32px.
- **Interaction:** On hover, the border color shifts from muted zinc to vivid teal-cyan.
- **Imagery:** Use 16:9 aspect ratio placeholders with a subtle dark overlay to keep text legible.

### Metric Badges & Tech Tags
- **Metrics:** Displayed in Geist Mono. Large teal-cyan values with secondary-gray labels.
- **Tech Stack Tags:** Small, semi-transparent zinc-gray background with white text. Use Lucide-style line icons (14px) next to tag names.

### Process Flow
- Horizontal or vertical steps connected by 1px dashed lines in zinc-gray. Current step highlighted with a teal-cyan dot and glow.

### Input Fields
- Dark background (#0B0D17), 1px border (#A1A1AA at 30%). Focus state uses a 1px #00F0FF border with a 0 0 8px cyan outer glow.