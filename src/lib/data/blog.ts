import { BlogPost } from '../../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'note-01-teg-characterization',
    slug: 'teg-characterization-sp1848-benchtop',
    title: 'Lab Note #01: Benchtop Characterization of SP1848-27145 Thermoelectric Modules',
    excerpt: 'Detailed measurement log evaluating open-circuit voltage vs. temperature differential (ΔT) and the impact of cold-side forced convection.',
    content: `### Objective
To quantify the experimental Seebeck coefficient and power output of four SP1848-27145 thermoelectric modules under steady-state thermal gradients.

### Experimental Setup
- **Hot Side:** 2mm C11000 copper spreader plate seated atop the controlled thermal chamber (65 °C measured).
- **Cold Side:** 18-fin extruded aluminum heat sink with 12V 60mm active cooling fan.
- **Interface:** High-conductivity silicone thermal paste (4.8 W/m·K) applied with uniform spring clamping.
- **Instrumentation:** K-type thermocouples connected to Arduino analog telemetry bus + calibrated digital multimeter.

### Measured Data
- Baseline Ambient: 24.5 °C
- Hot Side Stabilized: 65.2 °C
- Cold Side (Active Cooling): 25.8 °C
- Differential (ΔT): 39.4 °C
- Open Circuit Voltage (Voc): 1.78 V DC (Quad series-parallel configuration)
- Power Output into matched load: 45.1 mW (MEASURED)

### Key Finding
Without active cooling on the cold-side heat sink, thermal saturation occurred within 180 seconds, reducing ΔT from 39.4 °C down to 14.1 °C and collapsing power output by 68%. Sustained Seebeck generation is strictly dependent on cold-side heat extraction rate.`,
    author: 'A.R.C. LABS Team',
    date: '2026-06-14',
    readingTime: '4 min read',
    tags: ['Thermoelectrics', 'Hardware Testing', 'Seebeck Effect', 'MEASURED Data'],
    relatedProject: 'catalyst-mk-1'
  },
  {
    id: 'note-02-electrolysis-monitoring',
    slug: 'closed-loop-electrolysis-mq2-safety',
    title: 'Lab Note #02: Closed-Loop Electrolysis Telemetry & MQ-2 Hydrogen Safety Interlocks',
    excerpt: 'Implementation of non-blocking sensor polling and hardware relay interrupt routines to ensure safe benchtop hydrogen experimentation.',
    content: `### Safety Architecture
Generating hydrogen gas through electrochemical water splitting in a student laboratory environment demands absolute fail-safe operation.

### Safety Layers Implemented
1. **Mechanical Flashback Isolation:** Two inline one-way Viton check valves combined with a 100 mL water bubbler condensation separator.
2. **Atmospheric Gas Monitoring:** MQ-2 electrochemical sensor positioned directly above the reaction vessel.
3. **Interrupt Cutoff Routine:** If hydrogen concentration exceeds 400 ppm, the Arduino triggers an immediate pin interrupt, de-energizing the 5V relay driving the electrolysis cell within 12 ms.
4. **Physical E-Stop:** Industrial 22mm mushroom button wired in series with the 12V main bus.

### Conclusion
During continuous 8+ hour uptime testing, zero false-trigger shutdowns occurred while simulated gas trace tests confirmed immediate cutoff within the sub-15ms threshold.`,
    author: 'A.R.C. LABS Team',
    date: '2026-07-02',
    readingTime: '5 min read',
    tags: ['Embedded Systems', 'Safety Engineering', 'Electrolysis', 'Arduino'],
    relatedProject: 'catalyst-mk-1'
  }
];

export function getBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug || p.id === slug);
}
