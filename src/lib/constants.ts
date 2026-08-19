export const BRAND_CONSTANTS = {
  name: 'A.R.C. LABS',
  fullName: 'Advanced Research & Catalyst Laboratories',
  tagline: 'Engineering Ideas. Building the Future.',
  nature: 'Student-led engineering research & prototyping organization',
  routingEmail: 'labsarc76@gmail.com',
  adminPasswords: ['ARCLABS', 'ADMIN@ARC_LABS', 'ARC'],
  currency: '₹',
  defaultCurrencyCode: 'INR',
  flagshipProject: {
    name: 'CATALYST Mk-1',
    tagline: 'Catalyzing the Future of Engineering',
    classification: 'Experimental hybrid energy system / student proof-of-concept',
  },
  honestyPledge: 'A.R.C. LABS strictly tags all data points as MEASURED, CALCULATED, ESTIMATED, or THEORETICAL. We do not claim free energy, 100% efficiency, or non-existent external credentials.',
  scientificPrinciple: 'Energy is never created from nothing. The system converts energy through cascading thermodynamic and electrochemical stages with inherent conversion losses at each step, such that input energy strictly exceeds net usable electrical output.',
};

export const GROWTH_STAGES = [
  { stage: 1, title: 'Student Org', desc: 'Core student-led research & hands-on initiative', status: 'Completed' },
  { stage: 2, title: 'Prototyping', desc: 'Hardware fabrication, proof-of-concept testing', status: 'Active' },
  { stage: 3, title: 'Research & Data', desc: 'Peer verification, formal data modeling & iteration', status: 'Current Focus' },
  { stage: 4, title: 'Products & Kits', desc: 'Standardized modules & custom hardware kits', status: 'In Rollout' },
  { stage: 5, title: 'Commerce & Support', desc: 'Direct lab-to-engineer distribution & spare parts', status: 'Emerging' },
  { stage: 6, title: 'Tech Org', desc: 'Full-spectrum engineering development institution', status: 'Long-term Goal' },
];

export const NAV_LINKS = [
  { label: 'Overview', href: '/' },
  { label: 'CATALYST Mk-1', href: '/catalyst' },
  { label: 'Hardware Store', href: '/store' },
  { label: 'Research', href: '/research' },
  { label: 'About', href: '/about' },
  { label: 'Lab Notes', href: '/lab-notes' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

export const DATA_LABEL_STYLES: Record<string, { bg: string; text: string; border: string; desc: string }> = {
  MEASURED: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
    text: 'text-emerald-700 dark:text-emerald-400',
    border: 'border-emerald-500/20',
    desc: 'Empirically measured from the physical benchtop prototype under test conditions.',
  },
  CALCULATED: {
    bg: 'bg-blue-500/10 dark:bg-blue-400/10',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-500/20',
    desc: 'Mathematically derived from measured parameters using thermodynamic and electrical formulas.',
  },
  ESTIMATED: {
    bg: 'bg-amber-500/10 dark:bg-amber-400/10',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-500/20',
    desc: 'Approximate engineering estimate based on stage analysis and component benchmark curves.',
  },
  THEORETICAL: {
    bg: 'bg-purple-500/10 dark:bg-purple-400/10',
    text: 'text-purple-700 dark:text-purple-400',
    border: 'border-purple-500/20',
    desc: 'Idealized physical upper bound assuming zero parasitic resistance or convective thermal leakage.',
  },
};
