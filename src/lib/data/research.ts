import { ResearchArea } from '../../types';

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 'res-energy-systems',
    slug: 'energy-systems',
    title: 'Energy Systems',
    tagline: 'Multi-stage conversion dynamics and thermodynamic cascade cycles.',
    description: 'Investigating hybrid energy architectures that link intermittent renewable inputs to multi-modal storage buffers and thermodynamic conversion cycles.',
    currentScope: 'Benchtop characterization of thermal-to-electric conversion interfaces in CATALYST Mk-1.',
    futureScope: 'High-density micro-cogeneration loops and closed-loop phase-change thermal engines.',
    relatedProjects: ['catalyst-mk-1'],
    iconName: 'Zap'
  },
  {
    id: 'res-renewable-energy',
    slug: 'renewable-energy',
    title: 'Renewable Energy',
    tagline: 'Photovoltaic MPPT tracking and decentralized generation.',
    description: 'Exploring low-cost solar energy capture, maximum power point tracking (MPPT) micro-controllers, and diurnal energy distribution.',
    currentScope: 'Benchtop 4W polycrystalline array testing with PWM charge regulation.',
    futureScope: 'Custom micro-inverter topology with active Seebeck waste heat harvesting from panel backsides.',
    relatedProjects: ['catalyst-mk-1'],
    iconName: 'Sun'
  },
  {
    id: 'res-hydrogen-electrochemistry',
    slug: 'hydrogen-electrochemistry',
    title: 'Hydrogen & Electrochemistry',
    tagline: 'Water dissociation kinetics and safe gas handling.',
    description: 'Studying zero-emission hydrogen gas generation through alkaline and PEM water electrolysis, focusing on electrode geometry and bubble detachment efficiency.',
    currentScope: '316L stainless steel mesh electrode performance in room-temperature electrolyte cells.',
    futureScope: 'Catalytic nano-coatings and solid-state metal hydride storage cartridges.',
    relatedProjects: ['catalyst-mk-1'],
    iconName: 'FlaskConical'
  },
  {
    id: 'res-embedded-systems',
    slug: 'embedded-systems',
    title: 'Embedded Systems',
    tagline: 'Real-time telemetry, sensor buses, and fail-safe safety logic.',
    description: 'Developing low-latency microcontroller architectures for multi-sensor acquisition, automated threshold shutdowns, and state-machine control.',
    currentScope: 'ATmega328P based multi-sensor telemetry with I2C display and SPI RFID authorization in CATALYST Mk-1.',
    futureScope: 'Dual-core ARM Cortex-M4 telemetry node with CAN bus industrial networking.',
    relatedProjects: ['catalyst-mk-1'],
    iconName: 'Cpu'
  },
  {
    id: 'res-thermoelectrics',
    slug: 'thermoelectrics-seebeck',
    title: 'Thermoelectrics & Seebeck Generation',
    tagline: 'Solid-state direct heat-to-electricity harvesting.',
    description: 'Analyzing semiconductor thermoelectric material behavior under spatial thermal gradients (Seebeck effect: V ≈ S · ΔT) for waste heat reclamation.',
    currentScope: 'Quad SP1848-27145 module array characterization with active heat dissipation.',
    futureScope: 'Multi-stage cascaded Skutterudite and Half-Heusler high-temperature TEG modules.',
    relatedProjects: ['catalyst-mk-1'],
    iconName: 'Flame'
  },
  {
    id: 'res-robotics',
    slug: 'robotics-automation',
    title: 'Robotics & Automation',
    tagline: 'Precision actuators, kinematic linkages, and automated test rigs.',
    description: 'Designing robotic actuators and automated test benches to perform repeatable hardware cycling and thermal stress testing.',
    currentScope: 'Automated valve cycling and benchtop test fixture positioning.',
    futureScope: 'Autonomous multi-axis laboratory inspection robots.',
    relatedProjects: [],
    iconName: 'Bot'
  },
  {
    id: 'res-ai',
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence & Predictive Modeling',
    tagline: 'Empirical data analysis and thermal dissipation modeling.',
    description: 'Applying data modeling to predict thermodynamic loss curves, optimize Seebeck clamping pressure, and forecast component degradation.',
    currentScope: 'Telemetry curve fitting and loss factor regression from benchtop logs.',
    futureScope: 'Edge-AI anomaly detection for hardware degradation and gas leak forecasting.',
    relatedProjects: [],
    iconName: 'Brain'
  },
  {
    id: 'res-sustainable-engineering',
    slug: 'sustainable-engineering',
    title: 'Sustainable Engineering',
    tagline: 'Circular lifecycle design and modular hardware repairability.',
    description: 'Establishing design-for-disassembly standards where every module is serviceable, repairable, and built from recyclable alloys and standard fasteners.',
    currentScope: 'Modular 6061 aluminum plate architecture with standard M3/M4 fasteners in all A.R.C. LABS modules.',
    futureScope: 'Closed-loop recycled material chassis components and bio-compatible electrolyte matrices.',
    relatedProjects: ['catalyst-mk-1'],
    iconName: 'Leaf'
  }
];

export function getResearchAreas(): ResearchArea[] {
  return RESEARCH_AREAS;
}

export function getResearchBySlug(slug: string): ResearchArea | undefined {
  return RESEARCH_AREAS.find(r => r.slug === slug || r.id === slug);
}
