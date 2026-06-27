export interface CaseStudyMetric {
  label: string;
  value: string;
  desc: string;
}

export interface CaseStudyFeature {
  title: string;
  desc: string;
  icon: string;
}

export interface CaseStudyTimelineStep {
  step: string;
  title: string;
  desc: string;
  icon: string;
}

export interface CaseStudyImpactCard {
  title: string;
  desc: string;
  value: string;
  subvalue: string;
  type: 'large' | 'medium' | 'small';
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  metrics: CaseStudyMetric[];
  challenge: string;
  technicalApproach: string;
  features: CaseStudyFeature[];
  timeline: CaseStudyTimelineStep[];
  impact: CaseStudyImpactCard[];
  showcaseImage: string;
  liveUrl?: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  agrithread: {
    id: 'agrithread',
    title: 'AgriThread: Real-time Multi-role Ecosystem',
    subtitle: 'Fintech x Agriculture',
    description: 'Multi-role agricultural platform with real-time chat, job matching, and B2B marketplace. Scaled horizontally to handle thousands of concurrent users.',
    heroImage: '/agrithread_showcase.png',
    liveUrl: 'https://agrithread.com',
    metrics: [
      {
        label: 'The Metric',
        value: '0ms Latency',
        desc: 'Engineered real-time chat supporting 4 distinct user roles simultaneously.'
      },
      {
        label: 'Platform Scale',
        value: 'Thousands',
        desc: 'Concurrent users handled via Redis horizontal scaling architecture.'
      },
      {
        label: 'Stack Focus',
        value: 'Microservices',
        desc: 'Decoupled system ensuring zero-downtime marketplace updates.'
      }
    ],
    challenge: 'The agricultural marketplace is notoriously fragmented. We needed to build a unified hub that could seamlessly connect farmers, agronomists, B2B suppliers, and marketplace managers. The core challenge wasn\'t just data display—it was the synchronization of sensitive logistics across these four roles with zero margin for error or delay.',
    technicalApproach: 'To achieve true real-time synchronization, we bypassed traditional polling for a robust Socket.io integration. The backend was modularized into microservices to isolate the heavy transactional logic from the instant messaging and live-tracking streams.',
    features: [
      {
        title: 'Socket.io Sync',
        desc: 'WebSocket implementation for bidirectional event-based communication across the fleet.',
        icon: 'hub'
      },
      {
        title: 'Redis Scaling',
        desc: 'Pub/Sub mechanism utilizing Redis to manage message broadcasting across multiple server instances.',
        icon: 'database'
      }
    ],
    timeline: [
      {
        step: '01',
        title: 'User Action',
        desc: 'Marketplace bid or instant message initiated.',
        icon: 'input'
      },
      {
        step: '02',
        title: 'Load Balancer',
        desc: 'Nginx routes traffic to nearest microservice pod.',
        icon: 'router'
      },
      {
        step: '03',
        title: 'Redis Broadcast',
        desc: 'States synced across all concurrent user sessions.',
        icon: 'sync_alt'
      },
      {
        step: '04',
        title: 'UI Refresh',
        desc: 'Optimistic updates and final confirmation.',
        icon: 'done_all'
      }
    ],
    impact: [
      {
        title: 'Latency Reduction',
        desc: 'Before optimization, peak hours saw a 1.2s delay in marketplace updates. With the new microservices architecture, we achieved sub-50ms round-trip times globally.',
        value: '94',
        subvalue: 'Improvement in message delivery',
        type: 'large'
      },
      {
        title: 'Throughput',
        desc: 'Redis cluster handling concurrent transactional broadcasts.',
        value: '50k+ Ops/Sec',
        subvalue: '8X',
        type: 'medium'
      },
      {
        title: 'Uptime',
        desc: 'Zero-latency failover enabled.',
        value: '99.99%',
        subvalue: 'Uptime',
        type: 'small'
      },
      {
        title: 'Active Roles',
        desc: 'Synced ecosystem.',
        value: '04',
        subvalue: 'Active Roles',
        type: 'small'
      }
    ],
    showcaseImage: '/agrithread_showcase.png'
  },
  verifycertify: {
    id: 'verifycertify',
    title: 'VerifyCertify: Blockchain Credential Verification',
    subtitle: 'Security x Blockchain',
    description: 'Decentralized certificate issuance and verification portal with Solana wallet integration. Reduced validation latency to sub-second speeds compared to manual processes.',
    heroImage: '/verifycertify.png',
    liveUrl: 'https://certify-nu-two.vercel.app',
    metrics: [
      {
        label: 'Secured Credentials',
        value: '100k+',
        desc: 'Tamper-proof credentials issued and anchored securely on-chain.'
      },
      {
        label: 'Verification Speed',
        value: '0.4s Latency',
        desc: 'Instant cryptographic credential validation anywhere globally.'
      },
      {
        label: 'Storage Durability',
        value: 'Lifetime Storage',
        desc: 'Permanent on-chain metadata with zero ongoing maintenance costs.'
      }
    ],
    challenge: 'Academic and professional institutions face growing credential fraud. Standard verification is manual, tedious, and depends on slow central registries. We needed a secure, decentralized solution where verified achievements are tamper-proof and instant to validate.',
    technicalApproach: 'We developed the platform using Next.js, MongoDB, and Solana to anchor certificate hashes. By employing Solana compressed NFTs (cNFTs) and wallet connections (Phantom/Solflare), institutions can mint digital credentials securely at minimal cost, and verifiers can trace credential validity instantly via public ledgers.',
    features: [
      {
        title: 'Solana cNFTs',
        desc: 'Compressed NFT implementation on Solana for extremely low-cost, permanent on-chain certification.',
        icon: 'hub'
      },
      {
        title: 'Multi-Role Portals',
        desc: 'Distinct role-based access control dividing workspace activities for Issuers, Earners, and Verifiers.',
        icon: 'database'
      }
    ],
    timeline: [
      {
        step: '01',
        title: 'Connect Wallet',
        desc: 'Users and institutions establish secure identity using Phantom or Solflare wallet connections.',
        icon: 'input'
      },
      {
        step: '02',
        title: 'cNFT Issuance',
        desc: 'Verified academic organizations mint digital certificates as compressed NFTs on the Solana ledger.',
        icon: 'router'
      },
      {
        step: '03',
        title: 'Public Query',
        desc: 'Verifiers and third parties query verification signatures directly on the public blockchain ledger.',
        icon: 'sync_alt'
      },
      {
        step: '04',
        title: 'Solscan Validation',
        desc: 'Instant verification matching on-chain cryptographic hashes with zero layout shifts.',
        icon: 'done_all'
      }
    ],
    impact: [
      {
        title: 'Validation Speed',
        desc: 'Traditional checks take days; our decentralized verification process finishes cryptographically in under half a second.',
        value: '99',
        subvalue: 'Faster processing speed',
        type: 'large'
      },
      {
        title: 'Secured Credentials',
        desc: 'Over 100,000 digital credentials issued, permanently protected by Solana ledger security.',
        value: '100k+',
        subvalue: 'Tamper-proof certificates',
        type: 'medium'
      },
      {
        title: 'Gas Cost Efficiency',
        desc: 'Using Solana compressed NFTs results in dramatic fee savings compared to standard NFTs.',
        value: '99%',
        subvalue: 'Cost savings',
        type: 'small'
      },
      {
        title: 'Workspace Roles',
        desc: 'Issuers, Earners, and Verifiers fully integrated and synced.',
        value: '03',
        subvalue: 'Synchronized portals',
        type: 'small'
      }
    ],
    showcaseImage: '/verifycertify.png'
  },
  resumebuilder: {
    id: 'resumebuilder',
    title: 'Resume Builder: Performance-Optimized Document Engine',
    subtitle: 'Productivity x SaaS',
    description: 'Dynamic resume-building application featuring 8+ high-fidelity templates, real-time client-side preview, and instant PDF download engine.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCIT0PCLqEE6QtSrKpJQkPhLEPEjwtRqoe1BPBwtSdp3LhMCPowdWtcDmQ3QbPkVWqG4t0MifbjABsCZpgANi4eJAH4Ufino2SgqqQIugmKunPWdUUh2gA0VtG98XObbwEjjFPbH9FhBCdNH0L0XH0R7gUpffE8dQR7Z-pnVETSUa_iBFC7nIHTs94xCfVrPVU3VqLxLqr9z63ZUKo8LRwSPGXf9ZbKOO2Lf8kASowu2j5DftNfH8kH3Kk3HniIGhqYTonSnvgzw',
    metrics: [
      {
        label: 'Lighthouse Score',
        value: '98 Average',
        desc: 'Optimized via aggressive code splitting and component lazy loading.'
      },
      {
        label: 'Layout Templates',
        value: '8+ Styles',
        desc: 'Dynamic template engine allowing users to swap designs with zero data loss.'
      },
      {
        label: 'Document Model',
        value: 'Vector PDF',
        desc: 'Instant, crisp PDF compilations executed completely on client-side.'
      }
    ],
    challenge: 'Standard online builders require heavy server calls for layout previews and PDF compile queues, creating sluggish UX. The challenge was building an editing canvas that updates the document preview instantly and exports vector-sharp PDFs completely on the client side.',
    technicalApproach: 'Using client-side React PDF rendering paired with backend parsing engines, we built a modular architecture. We stored layout tokens in a single data context, letting users switch templates with zero state loss. Initial bundle sizes were slashed via code splitting and lazy loading.',
    features: [
      {
        title: 'Client PDF Compile',
        desc: 'Direct vector document generation using client-side rendering libraries.',
        icon: 'hub'
      },
      {
        title: 'Template Engine',
        desc: 'CSS token-based template manager enabling instant structural switches.',
        icon: 'database'
      }
    ],
    timeline: [
      {
        step: '01',
        title: 'Data Load',
        desc: 'User populates details into local state-context fields.',
        icon: 'input'
      },
      {
        step: '02',
        title: 'Template Mapping',
        desc: 'Theme tokens map automatically to active component templates.',
        icon: 'router'
      },
      {
        step: '03',
        title: 'Live Canvas',
        desc: 'Real-time client-side preview re-renders document changes.',
        icon: 'sync_alt'
      },
      {
        step: '04',
        title: 'Export Call',
        desc: 'Crisp vector PDF compiled and downloaded instantly.',
        icon: 'done_all'
      }
    ],
    impact: [
      {
        title: 'Performance Score',
        desc: 'Bundle optimization and lazy loading reduced initial load times, resulting in a premium productivity tool.',
        value: '98',
        subvalue: 'Lighthouse Performance Score',
        type: 'large'
      },
      {
        title: 'Layout Options',
        desc: '8+ layout templates switch dynamically without state loss.',
        value: '8+',
        subvalue: 'Active Template variations',
        type: 'medium'
      },
      {
        title: 'CLS Metric',
        desc: '0% cumulative layout shift on preview renders.',
        value: '0%',
        subvalue: 'Layout Shift',
        type: 'small'
      },
      {
        title: 'File Actions',
        desc: 'Create, duplicate, delete, and edit resumes.',
        value: 'Dashboard',
        subvalue: 'File Manager Dashboard',
        type: 'small'
      }
    ],
    showcaseImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCIT0PCLqEE6QtSrKpJQkPhLEPEjwtRqoe1BPBwtSdp3LhMCPowdWtcDmQ3QbPkVWqG4t0MifbjABsCZpgANi4eJAH4Ufino2SgqqQIugmKunPWdUUh2gA0VtG98XObbwEjjFPbH9FhBCdNH0L0XH0R7gUpffE8dQR7Z-pnVETSUa_iBFC7nIHTs94xCfVrPVU3VqLxLqr9z63ZUKo8LRwSPGXf9ZbKOO2Lf8kASowu2j5DftNfH8kH3Kk3HniIGhqYTonSnvgzw'
  }
};
