import { Project } from '../../types';

export const CATALYST_PROJECT: Project = {
  id: 'catalyst-mk-1',
  slug: 'catalyst-mk-1',
  name: 'CATALYST Mk-1',
  subtitle: 'Catalyzing the Future of Engineering',
  tagline: 'Experimental Hybrid Energy System & Student Proof-of-Concept',
  classification: 'Experimental hybrid energy system / student proof-of-concept',
  status: 'Prototype Stage',
  description: 'CATALYST Mk-1 is a multi-stage benchtop experimental energy conversion platform designed and fabricated by student researchers at A.R.C. LABS. It cascades solar photovoltaic energy into intermediate chemical storage via water electrolysis, converts generated gas into controlled thermal energy, and harvests power across a steep thermal gradient using solid-state Seebeck thermoelectric generator modules — all overseen by an automated Arduino telemetry and RFID authorization layer.',
  scientificPrinciple: 'The First and Second Laws of Thermodynamics strictly govern this system: energy is NEVER created from nothing. The system converts energy across multiple thermodynamic and electrochemical domains, incurring irreversible entropy and conversion losses at every stage. Consequently, the total solar/electrical input energy strictly exceeds the final harvested electrical output.',
  energyFlow: [
    {
      step: 1,
      title: 'Solar Photovoltaic Input',
      from: 'Solar Radiation',
      to: 'Electrical Energy (DC)',
      efficiencyEstimate: '≈ 18%',
      metricLabel: 'ESTIMATED',
      description: 'A 4W polycrystalline solar panel captures ambient photons, generating DC electricity to power the system and charge the battery buffer.'
    },
    {
      step: 2,
      title: 'Energy Storage & Regulation',
      from: 'Solar Electrical DC',
      to: 'Buffered Chemical/Electrical (12V)',
      efficiencyEstimate: '≈ 85%',
      metricLabel: 'ESTIMATED',
      description: 'A PWM solar charge controller regulates voltage into a 12V rechargeable storage battery, decoupling intermittent sunlight from continuous bench testing.'
    },
    {
      step: 3,
      title: 'Electrochemical Water Splitting',
      from: 'Electrical Energy (12V DC, 0.5A)',
      to: 'Chemical Potential Energy (H₂ + ½O₂)',
      efficiencyEstimate: '≈ 80%',
      metricLabel: 'ESTIMATED',
      description: 'Current is driven through 316L stainless steel mesh electrodes submerged in demineralized electrolyte, dissociating H₂O molecules into separate gaseous streams.'
    },
    {
      step: 4,
      title: 'Thermal Combustion / Enclosure',
      from: 'Chemical Potential Energy',
      to: 'Thermal Enthalpy (Heat at ~65 °C)',
      efficiencyEstimate: '≈ 90%',
      metricLabel: 'ESTIMATED',
      description: 'Gas is delivered through flashback arrestors and check valves into a sealed, insulated thermal chamber where it produces heat upon catalytic reaction.'
    },
    {
      step: 5,
      title: 'Thermal Gradient Establishment',
      from: 'Thermal Chamber Core',
      to: 'Temperature Gradient (ΔT ≈ 40–45 °C)',
      efficiencyEstimate: 'Heat Flux Transfer',
      metricLabel: 'CALCULATED',
      description: 'Heat conducts through a 2mm copper spreader to the hot side of the TEG array, while extruded aluminum fins and a 12V fan maintain cold side temperature.'
    },
    {
      step: 6,
      title: 'Thermoelectric Seebeck Harvesting',
      from: 'Thermal Gradient (ΔT)',
      to: 'Electrical Energy (Low Voltage DC)',
      efficiencyEstimate: '≈ 8%',
      metricLabel: 'ESTIMATED',
      description: 'Four SP1848-27145 thermoelectric modules convert the spatial temperature gradient directly into electricity via the Seebeck effect (V ≈ S · ΔT).'
    },
    {
      step: 7,
      title: 'Power Conditioning & Output',
      from: 'Raw TEG Output (~45 mW)',
      to: 'Regulated Useful Output (DC Rail)',
      efficiencyEstimate: '≈ 88%',
      metricLabel: 'ESTIMATED',
      description: 'A 150W DC-DC boost converter steps up the low TEG voltage to a stable rail for driving low-power auxiliary electronics and telemetry monitors.'
    }
  ],
  subsystems: [
    {
      id: 'sub-01',
      name: '01. Solar Photovoltaic Input',
      category: 'Input Stage',
      role: 'Captures solar irradiance and provides baseline electrical energy.',
      specs: '4W Polycrystalline Panel, Voc = 21.6V, Imp = 0.22A',
      metric: { label: 'Solar Output', value: '4', unit: 'W', type: 'MEASURED', description: 'Peak open-sky benchtop measurement.' },
      lossFactor: 'Reflectance, cell bandgap limits, solar thermal heating'
    },
    {
      id: 'sub-02',
      name: '02. Battery & Power Storage',
      category: 'Buffer Stage',
      role: 'Stores electrical energy to provide constant current to downstream loads regardless of cloud cover.',
      specs: '12V Rechargeable Battery Pack with 10A PWM Solar Controller',
      metric: { label: 'Battery Bus Voltage', value: '12.0', unit: 'V', type: 'MEASURED', description: 'Regulated nominal operating voltage.' },
      lossFactor: 'Internal cell resistance, charge controller dissipation'
    },
    {
      id: 'sub-03',
      name: '03. Electrolysis Reactor',
      category: 'Conversion Stage',
      role: 'Splits water into hydrogen and oxygen gases at room temperature using DC current.',
      specs: 'Acrylic Reaction Vessel, 316L Stainless Steel Electrodes, 250 mL volume',
      metric: { label: 'Electrolysis Current', value: '0.5', unit: 'A', type: 'MEASURED', description: 'Steady-state operating current during gas generation.' },
      lossFactor: 'Ohmic overpotential, bubble resistance, thermodynamic water splitting potential'
    },
    {
      id: 'sub-04',
      name: '04. Thermal Management & Chamber',
      category: 'Thermal Stage',
      role: 'Houses the controlled thermal conversion with ceramic fiber insulation and copper thermal distributor.',
      specs: '6061-T6 Aluminum / Ceramic Fiber Barrier, 100x60mm C11000 Copper Base',
      metric: { label: 'Thermal Chamber Temperature', value: '65', unit: '°C', type: 'MEASURED', description: 'Peak hot-side steady-state thermal temperature.' },
      lossFactor: 'Convective radiant thermal dissipation to ambient air'
    },
    {
      id: 'sub-05',
      name: '05. Thermoelectric Generator (TEG) Array',
      category: 'Generation Stage',
      role: 'Converts thermal gradient across hot/cold faces directly into DC power via the Seebeck effect.',
      specs: '4x SP1848-27145 Seebeck Modules (40x40mm) in series-parallel array',
      metric: { label: 'Thermoelectric Output', value: '45', unit: 'mW', type: 'MEASURED', description: 'Realized benchtop power output across load resistor at ΔT = 40 °C.' },
      lossFactor: 'Thermal bypass through module ceramic, internal electrical resistance'
    },
    {
      id: 'sub-06',
      name: '06. Power Conditioning Unit',
      category: 'Conditioning Stage',
      role: 'Boosts low millivolt/milliamp TEG output to a stable usable voltage rail.',
      specs: '150W DC-DC Step-Up Boost Converter with ultra-low startup threshold',
      metric: { label: 'Step-Up Output Voltage', value: '5.0', unit: 'V', type: 'CALCULATED', description: 'Regulated rail target voltage.' },
      lossFactor: 'Inductor core loss, MOSFET switching resistance'
    },
    {
      id: 'sub-07',
      name: '07. Arduino Central Controller & Telemetry',
      category: 'Control Stage',
      role: 'Executes sensor polling, data logging to 16x2 LCD, and emergency thermal/gas threshold shutdowns.',
      specs: 'ATmega328P Microcontroller, DHT11 Temp/Humidity, MQ-2 Gas, Water Level Sensor',
      metric: { label: 'Arduino Test Uptime', value: '8+', unit: 'hours', type: 'MEASURED', description: 'Continuous verified laboratory testing duration without crash.' },
      lossFactor: 'Parasitic microcontroller power consumption (~35 mA at 5V)'
    },
    {
      id: 'sub-08',
      name: '08. RFID Authorization Layer',
      category: 'Security & Access',
      role: 'Parallel control layer verifying technician authorization prior to arming the reaction relays.',
      specs: 'RC522 13.56MHz SPI Reader, MIFARE Classic 1K Encrypted Access Cards',
      metric: { label: 'Auth Verification Latency', value: '< 120', unit: 'ms', type: 'MEASURED', description: 'Time from tag scan to system arming relay trigger.' },
      lossFactor: 'Standby polling current'
    }
  ],
  prototypeMetrics: [
    { label: 'Solar Panel Output', value: '4', unit: 'W', type: 'MEASURED', description: 'Peak open-sky benchtop measurement on 4W polycrystalline array.' },
    { label: 'Battery Bus Voltage', value: '12.0', unit: 'V', type: 'MEASURED', description: 'Nominal regulated intermediate buffer voltage.' },
    { label: 'Electrolysis Current', value: '0.5', unit: 'A', type: 'MEASURED', description: 'Steady-state current drawn during water dissociation.' },
    { label: 'Thermal Chamber Temperature', value: '65', unit: '°C', type: 'MEASURED', description: 'Steady-state core hot-side thermocouple reading.' },
    { label: 'Thermoelectric Power Output', value: '45', unit: 'mW', type: 'MEASURED', description: 'Net electrical power harvested from the 4-module Seebeck array.' },
    { label: 'Arduino Test Uptime', value: '8+', unit: 'hours', type: 'MEASURED', description: 'Continuous uninterrupted benchtop testing and logging runtime.' },
    { label: 'Solar-to-Electrical Stage Efficiency', value: '18', unit: '%', type: 'ESTIMATED', description: 'Estimated photovoltaic cell conversion efficiency.' },
    { label: 'Electrical-to-Chemical Stage Efficiency', value: '80', unit: '%', type: 'ESTIMATED', description: 'Estimated electrolysis reaction efficiency.' },
    { label: 'Chemical-to-Thermal Stage Efficiency', value: '90', unit: '%', type: 'ESTIMATED', description: 'Estimated thermal release efficiency within insulated chamber.' },
    { label: 'Thermal-to-Electrical Stage Efficiency', value: '8', unit: '%', type: 'ESTIMATED', description: 'Estimated Seebeck solid-state recovery efficiency at ΔT=40°C.' },
    { label: 'Overall End-to-End System Efficiency', value: '0.65', unit: '%', type: 'ESTIMATED', description: 'Composite efficiency (18% × 80% × 90% × 8% ≈ 0.65%). Honest proof-of-concept baseline.' },
    { label: 'Seebeck Open-Circuit Voltage Target', value: '2.4', unit: 'V', type: 'CALCULATED', description: 'Derived from V ≈ S · ΔT (where S ≈ 0.04 V/°C per module across ΔT = 60 °C).' }
  ],
  challenges: [
    {
      title: '1. Thermal Management & Gradient Maintenance',
      description: 'Heat conducted through the TEG modules rapidly heated the cold-side aluminum heatsink, causing the temperature differential (ΔT) to decay over time.',
      mitigation: 'Added an active 12V 60mm cooling fan and applied high-conductivity thermal paste between the polished copper base and heatsink to sustain continuous ΔT.'
    },
    {
      title: '2. Parasitic Power Consumption & Conditioning',
      description: 'The raw output of the TEG array (45 mW at ~1.5V under load) was too low to directly power standard 5V/12V electronics without an efficient step-up stage.',
      mitigation: 'Integrated a low-voltage start-up DC-DC boost converter with custom input impedance matching to optimize power transfer.'
    },
    {
      title: '3. Multi-Domain Subsystem Integration',
      description: 'Harmonizing fluidic gas transport, high-temperature thermal dissipation, sensitive analog sensor lines, and digital microcontroller buses on one chassis created electrical noise and physical packaging challenges.',
      mitigation: 'Isolated the electrical control bus using optocouplers and shielded DuPont harnesses, separating the wet electrolysis zone from the thermal chamber and control electronics.'
    },
    {
      title: '4. Overall Conversion Losses & Honest Efficiency',
      description: 'Cascading through multiple energy conversions (photovoltaic → chemical → thermal → Seebeck) compounds thermodynamic losses at every boundary.',
      mitigation: 'Documented each stage with rigorous labeling (MEASURED vs ESTIMATED) rather than hiding losses, highlighting that energy conservation and transparency are fundamental to authentic engineering.'
    },
    {
      title: '5. Hydrogen & Electrical Safety',
      description: 'Electrochemical hydrogen generation in a benchtop environment presents inherent flammability and ignition risks.',
      mitigation: 'Engineered a four-tier safety architecture: one-way non-return check valves, water bubbler flashback trap, continuous MQ-2 gas leak sensing with automatic Arduino cutoff relay, and an emergency stop switch.'
    }
  ],
  lessonsLearned: [
    {
      number: 1,
      lesson: 'System Integration Trumps Component Perfection',
      insight: 'A collection of high-grade components will underperform if the interfaces (thermal resistance, impedance mismatch, fluidic flow) are not harmonized.'
    },
    {
      number: 2,
      lesson: 'Thermodynamic Realities Must Be Embraced',
      insight: 'Conversion stages always shed energy as heat and entropy. Engineering maturity means measuring and minimizing losses rather than promising impossible efficiencies.'
    },
    {
      number: 3,
      lesson: 'Benchtop Testing Differs from Theoretical Modeling',
      insight: 'Real-world wire resistance, ambient airflow fluctuations, and contact resistance cause real outputs to diverge from simplified textbook calculations.'
    },
    {
      number: 4,
      lesson: 'Hardware Iteration Speed Dictates Progress',
      insight: 'Rapid modular 3D/acrylic bracket fabrication allowed the team to test four mounting geometries within days, accelerating thermal optimization.'
    },
    {
      number: 5,
      lesson: 'Thermal Dissipation Is Active, Not Passive',
      insight: 'In Seebeck thermoelectric systems, cold-side heat extraction is just as critical as hot-side heat delivery for sustaining voltage output.'
    },
    {
      number: 6,
      lesson: 'Power Conditioning Requires Custom Impedance Matching',
      insight: 'Standard switching converters require careful tuning of start-up voltage thresholds when driven by high-impedance TEG sources.'
    },
    {
      number: 7,
      lesson: 'Exhaustive Documentation Protects Integrity',
      insight: 'Tagging data as MEASURED, CALCULATED, or ESTIMATED establishes scientific credibility and prevents misleading overclaims.'
    }
  ]
};

export function getProject(): Project {
  return CATALYST_PROJECT;
}
