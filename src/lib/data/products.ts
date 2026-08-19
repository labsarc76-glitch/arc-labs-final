import { Product, ProductCategory } from '../../types';

export const PRODUCTS: Product[] = [
  // ─── 3 FLAGSHIP SKUs (Featured First) ──────────────────────────────
  {
    id: 'arc-em-steam',
    slug: 'energy-module-steam-variant',
    name: 'A.R.C. LABS Energy Module — Steam Variant',
    shortDescription: 'Precision engineered thermal expansion energy conversion module built for direct steam-engine coupling and boiler loop interfaces.',
    fullDescription: 'The A.R.C. LABS Steam Variant is an experimental energy conversion module designed to interface closed or open steam generator loops with thermal-to-mechanical conversion manifolds. Built with machined 6061-T6 aluminum mounting plates, high-temperature ceramic thermal insulation, and integrated thermocouple channels for real-time thermal gradient monitoring.',
    price: 29999,
    currency: 'INR',
    category: 'Flagship Modules',
    compatibility: 'Steam engine & thermal vapor loop compatible',
    images: [
      '/src/assets/images/catalyst_mk1_cad_render_1787117812674.jpg',
      '/src/assets/images/cooling_heatsink_fin_1787117869410.jpg',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80'
    ],
    imageSource: 'photo',
    availability: 'available',
    stock: 5,
    isFlagship: true,
    catalystApplication: 'Thermal chamber auxiliary mechanical output stage (tested in secondary heat-recovery harness).',
    quantityInCatalyst: '1 unit (experimental benchtop configuration)',
    specifications: {
      'Interface Type': 'Machined ISO Flange / Steam Expansion Port',
      'Operating Temperature': 'Up to 240 °C (Rated Peak)',
      'Working Medium': 'Water / Demineralized Vapor',
      'Thermal Core Material': 'Alloy 6061-T6 Aluminum with Thermal Barrier',
      'Sensor Ports': '2x K-Type Thermocouple M8 Bushings',
      'Mounting Array': '4-Point M4 High-Tensile Stainless Plate',
      'Weight': '1.45 kg'
    },
    features: [
      'Dual-pass thermal collection cavity with optimized convective heat flux',
      'Reinforced high-temperature gasket sealing rated to 8 bar',
      'Integrated Arduino sensor interface breakout header',
      'Safety pressure relief tap port pre-drilled'
    ],
    includedItems: [
      'A.R.C. LABS Steam Energy Module Core Assembly',
      'High-Temperature Ceramic Gasket Kit (Set of 3)',
      'M4 Stainless Steel Fastener & Isolation Spacer Pack',
      'Lab Calibration & Subsystem Datasheet'
    ],
    safetyWarning: 'Requires properly rated steam boiler or heat generator with independent pressure relief valves. Wear thermal PPE during operation.'
  },
  {
    id: 'arc-em-teg',
    slug: 'energy-module-teg-variant',
    name: 'A.R.C. LABS Energy Module — TEG Variant',
    shortDescription: 'High-density solid-state Seebeck thermoelectric generator module with dual-side aluminum heat dissipation and thermal paste interface.',
    fullDescription: 'The core flagship solid-state energy harvester derived directly from the CATALYST Mk-1 research testbed. Features a 4-module SP1848-27145 Seebeck thermoelectric array clamped between a mirror-polished copper heat absorption base and an extruded micro-fin aluminum cooling manifold. Converts steady-state temperature differences (ΔT) directly into DC electricity with zero moving parts.',
    price: 49999,
    currency: 'INR',
    category: 'Flagship Modules',
    compatibility: 'Thermoelectric generator (TEG / Seebeck) compatible',
    images: [
      '/src/assets/images/teg_module_photo_1787117825473.jpg',
      '/src/assets/images/cooling_heatsink_fin_1787117869410.jpg',
      '/src/assets/images/catalyst_mk1_cad_render_1787117812674.jpg'
    ],
    imageSource: 'photo',
    availability: 'available',
    stock: 8,
    isFlagship: true,
    catalystApplication: 'Primary solid-state thermal-to-electric conversion stage in CATALYST Mk-1 (Subsystem 05).',
    quantityInCatalyst: '4 SP1848 modules in quad-series array',
    specifications: {
      'Thermoelectric Core': '4x SP1848-27145 Seebeck Peltier Elements (40x40mm)',
      'Seebeck Coefficient (S)': '≈ 0.04 V/°C per module composite',
      'Measured Open-Circuit Voltage': 'Up to 2.8 V DC at ΔT = 45 °C',
      'Max Hot-Side Temperature': '150 °C (Continuous) / 180 °C (Intermittent)',
      'Cold-Side Cooling': 'Extruded Dual-Tower Aluminum Fin Block + 12V Fan Mount',
      'Thermal Interface': '0.8mm Polished Copper Plate with High-Conductivity Paste',
      'Weight': '820 g'
    },
    features: [
      'Solid-state Seebeck generation without mechanical vibration or acoustic noise',
      'Spring-loaded uniform clamping mechanism prevents ceramic element cracking',
      'Low internal resistance gold-plated terminal bus for minimal I²R drop',
      'Direct compatibility with 150W Boost Converter conditioning stage'
    ],
    includedItems: [
      'A.R.C. LABS TEG Quad-Module Core Assembly',
      'Extruded Dual-Tower Aluminum Heat Sink Block',
      'High-Conductivity Thermal Compound Syringe (5g)',
      'Precision Multi-lead Output Loom & Shunt Resistor'
    ],
    safetyWarning: 'Hot side reaches temperatures exceeding 70 °C within minutes. Avoid skin contact with exposed copper plate during active thermal cycles.'
  },
  {
    id: 'arc-em-stirling',
    slug: 'energy-module-stirling-variant',
    name: 'A.R.C. LABS Energy Module — Stirling Variant',
    shortDescription: 'Ultra-low friction closed-cycle Stirling thermodynamic conversion module with dual regenerative displacement cylinders.',
    fullDescription: 'Engineered for continuous closed-loop thermodynamic cycling, the Stirling Variant harnesses external thermal differentials to drive a precision counter-weighted flywheel coupled to a low-cogging brushless DC generator. Designed for educational thermodynamics and experimental micro-cogeneration research.',
    price: 69999,
    currency: 'INR',
    category: 'Flagship Modules',
    compatibility: 'Stirling engine & external combustion thermal cycle compatible',
    images: [
      '/src/assets/images/cooling_heatsink_fin_1787117869410.jpg',
      '/src/assets/images/catalyst_mk1_cad_render_1787117812674.jpg',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
    ],
    imageSource: 'photo',
    availability: 'available',
    stock: 3,
    isFlagship: true,
    catalystApplication: 'High-gradient mechanical thermodynamic alternative test harness.',
    quantityInCatalyst: '1 unit (evaluation rig)',
    specifications: {
      'Cycle Type': 'Alpha/Beta Closed Stirling Cycle',
      'Displacer Piston': 'High-purity graphite in Pyrex precision glass cylinder',
      'Flywheel Bearing': 'Dual Ceramic ABEC-7 Low-Friction Race',
      'Generator Core': 'Micro 3-Phase Core with Synchronous Rectifier Board',
      'Start-up Delta T (ΔT)': '≈ 35 °C minimum threshold',
      'Dimensions': '180 x 95 x 120 mm',
      'Weight': '1.85 kg'
    },
    features: [
      'Zero-lubrication graphite piston design eliminating oil contamination',
      'Integrated optical tachometer sensor bracket for RPM tracking',
      'Transparent cylinder wall allows visual inspection of thermodynamic stroke',
      'Heavy CNC brass flywheel ensures stable angular momentum'
    ],
    includedItems: [
      'A.R.C. LABS Stirling Module Assembly with Flywheel',
      'External Ceramic Heat Shield & Concentrator Cone',
      '3-Phase Rectifier & Filter Interface Board',
      'Protective Acrylic Transport & Display Case'
    ],
    safetyWarning: 'Moving flywheel hazard. Keep fingers, wires, and loose items clear of rotating assembly during active thermal runs.'
  },

  // ─── 🔋 1. ENERGY SYSTEM CATALOG ────────────────────────────────────
  {
    id: 'part-solar-panel-4w',
    slug: 'solar-panel-4w',
    name: 'Solar Panel (4W Polycrystalline)',
    shortDescription: 'Benchtop photovoltaic power source providing primary electrical energy input for charging and electrolysis.',
    price: 2500,
    currency: 'INR',
    category: 'Energy System',
    images: ['https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 15,
    catalystApplication: 'Primary renewable electrical input in CATALYST Mk-1 (Subsystem 01).',
    quantityInCatalyst: '1 Panel (≈ 4 W measured peak output)',
    specifications: {
      'Peak Power (Pmax)': '4.0 W (MEASURED)',
      'Operating Voltage (Vmp)': '18.0 V DC',
      'Operating Current (Imp)': '0.22 A',
      'Open Circuit Voltage (Voc)': '21.6 V DC',
      'Cell Material': 'Polycrystalline Silicon with Aluminum Frame',
      'Dimensions': '240 x 180 x 18 mm'
    },
    features: ['Anodized aluminum weather-resistant frame', 'Pre-soldered terminal leads with bypass diode', 'High-transmittance tempered front glass'],
    includedItems: ['1x 4W Solar Panel', '2m UV-rated connection leads with alligator clips']
  },
  {
    id: 'part-battery-12v',
    slug: '12v-rechargeable-battery',
    name: '12V Rechargeable Lead-Acid / Lithium Pack',
    shortDescription: '12V DC storage buffer decoupling intermittent solar input from continuous benchtop electrolysis demands.',
    price: 1000,
    currency: 'INR',
    category: 'Energy System',
    images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 20,
    catalystApplication: 'Intermediate electrical energy storage buffer in CATALYST Mk-1 (Subsystem 02).',
    quantityInCatalyst: '1 Battery Pack (≈ 12 V measured bus)',
    specifications: {
      'Nominal Voltage': '12.0 V DC (MEASURED)',
      'Capacity': '7.0 Ah',
      'Max Discharge Current': '10 A',
      'Terminal Type': 'F1 Faston Spade Tabs',
      'Weight': '1.9 kg'
    },
    features: ['Deep cycle resilience', 'Low self-discharge rate (<3% monthly)', 'Flame retardant ABS casing'],
    includedItems: ['1x 12V Storage Battery', 'Terminal safety insulation caps']
  },
  {
    id: 'part-solar-controller',
    slug: 'solar-charge-controller',
    name: 'Solar Charge Controller (12V/24V Auto)',
    shortDescription: 'Regulates solar power delivery, prevents battery overcharging and reverse leakage at night.',
    price: 350,
    currency: 'INR',
    category: 'Energy System',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 25,
    catalystApplication: 'Power regulation between 4W Solar Panel and 12V storage battery.',
    quantityInCatalyst: '1 Controller',
    specifications: {
      'Rated Charging Current': '10 A',
      'System Voltage': '12V / 24V Automatic Sensing',
      'Float Voltage': '13.7 V DC',
      'Overcharge Protection': '14.4 V DC'
    },
    features: ['3-stage PWM charging algorithm', 'Dual USB 5V/2A auxiliary ports', 'Built-in short circuit protection'],
    includedItems: ['1x Solar Charge Controller', 'User manual & terminal screwdriver']
  },
  {
    id: 'part-boost-converter-150w',
    slug: '150w-dc-dc-boost-converter',
    name: '150W DC-DC Step-Up Boost Converter',
    shortDescription: 'High-efficiency step-up voltage converter transforming low TEG output into usable regulated DC rail.',
    price: 150,
    currency: 'INR',
    category: 'Energy System',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 35,
    catalystApplication: 'Power conditioning stage (Subsystem 06) stepping up Seebeck output to stable 5V/12V rails.',
    quantityInCatalyst: '1 Module',
    specifications: {
      'Input Voltage Range': '2.5V – 32V DC',
      'Output Voltage Range': '5V – 35V DC (Adjustable via multi-turn pot)',
      'Max Output Power': '150 W (with heatsink)',
      'Conversion Efficiency': 'Up to 94% (ESTIMATED)'
    },
    features: ['High-frequency switching regulator', 'On-board multi-turn precision potentiometer', 'Aluminium backing heatsink'],
    includedItems: ['1x 150W Boost Converter Board']
  },

  // ─── ⚡ 2. TEG SYSTEM CATALOG ────────────────────────────────────────
  {
    id: 'part-teg-sp1848',
    slug: 'sp1848-27145-teg-module',
    name: 'SP1848-27145 TEG Module (40×40mm)',
    shortDescription: 'Dedicated Seebeck effect thermoelectric generator ceramic module producing electricity across thermal gradients.',
    price: 250,
    currency: 'INR',
    category: 'TEG System',
    images: ['/src/assets/images/teg_module_photo_1787117825473.jpg'],
    imageSource: 'photo',
    availability: 'available',
    stock: 50,
    catalystApplication: 'Core thermoelectric generator element in CATALYST Mk-1 (Subsystem 05).',
    quantityInCatalyst: '4 Modules used in series-parallel array (≈ 45 mW output)',
    specifications: {
      'Dimensions': '40 x 40 x 3.4 mm',
      'Operating Temperature': '-40 °C to +150 °C (intermittent 180 °C)',
      'Open Circuit Voltage (20°C ΔT)': '0.97 V (MEASURED)',
      'Open Circuit Voltage (40°C ΔT)': '1.8 V (MEASURED)',
      'Open Circuit Voltage (60°C ΔT)': '2.4 V (MEASURED)',
      'Lead Length': '300 mm Teflon insulated'
    },
    features: ['Specialized Bi2Te3 thermoelectric formulation for generation (not just Peltier cooling)', 'High thermal stability', 'Pre-tinned lead wires'],
    includedItems: ['1x SP1848-27145 TEG Module']
  },
  {
    id: 'part-heatsink-teg',
    slug: 'aluminium-heat-sink-teg',
    name: 'Aluminium Heat Sink (TEG Cold-Side)',
    shortDescription: 'Extruded high-aspect fin aluminum heat sink maintaining low cold-side temperature for Seebeck ΔT.',
    price: 120,
    currency: 'INR',
    category: 'TEG System',
    images: ['/src/assets/images/cooling_heatsink_fin_1787117869410.jpg'],
    imageSource: 'photo',
    availability: 'available',
    stock: 40,
    catalystApplication: 'Cold side of TEG array in CATALYST Mk-1 to maximize temperature gradient.',
    quantityInCatalyst: '2 Heatsinks',
    specifications: {
      'Dimensions': '100 x 60 x 25 mm',
      'Fin Count': '18 Parallel Fins',
      'Material': '6063-T5 Extruded Aluminum',
      'Base Flatness': '< 0.05 mm'
    },
    features: ['High thermal dissipation area', 'Flat CNC milled base for optimal thermal contact'],
    includedItems: ['1x Cold-Side Aluminum Heat Sink']
  },
  {
    id: 'part-thermal-paste',
    slug: 'high-conductivity-thermal-paste',
    name: 'Thermal Paste (High Conductivity 5g)',
    shortDescription: 'High thermal conductivity paste filling microscopic air voids between TEG, copper plate, and heatsink.',
    price: 80,
    currency: 'INR',
    category: 'TEG System',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 60,
    catalystApplication: 'Applied across all TEG hot and cold interfaces in CATALYST Mk-1.',
    quantityInCatalyst: '1 Syringe (5g applied across 4 modules)',
    specifications: {
      'Thermal Conductivity': '4.8 W/m·K',
      'Net Weight': '5 grams',
      'Operating Range': '-50 °C to +240 °C',
      'Dielectric Breakdown': 'Non-conductive'
    },
    features: ['Non-electrically conductive compound', 'Resists dry-out under repeated thermal cycling', 'Easy application syringe'],
    includedItems: ['1x 5g Thermal Paste Syringe', '1x Spreader tool']
  },
  {
    id: 'part-copper-plate',
    slug: 'copper-thermal-plate',
    name: 'Copper Thermal Conduction Plate (100×60×2mm)',
    shortDescription: 'High thermal diffusivity copper spreader transferring heat uniformly from thermal chamber to TEG modules.',
    price: 250,
    currency: 'INR',
    category: 'TEG System',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 30,
    catalystApplication: 'Hot-side thermal spreader plate interfacing combustion/thermal section with TEGs.',
    quantityInCatalyst: '1 Plate',
    specifications: {
      'Dimensions': '100 x 60 x 2 mm',
      'Material': 'C11000 Electrolytic Tough Pitch (ETP) Copper (99.9% Cu)',
      'Thermal Conductivity': '385 W/m·K',
      'Weight': '110 g'
    },
    features: ['Precision sheared edges', 'Surface lapped for minimum thermal interface resistance'],
    includedItems: ['1x Copper Thermal Plate']
  },
  {
    id: 'part-cooling-fan-12v',
    slug: '12v-dc-cooling-fan',
    name: '12V DC Active Cooling Fan (60×60mm)',
    shortDescription: 'Active airflow fan attached to heatsink to sustain continuous thermal gradient across TEG array.',
    price: 150,
    currency: 'INR',
    category: 'TEG System',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 45,
    catalystApplication: 'Cold-side forced convection in CATALYST Mk-1.',
    quantityInCatalyst: '1 Fan',
    specifications: {
      'Voltage': '12V DC',
      'Current': '0.12 A',
      'Airflow': '24.5 CFM',
      'Bearing': 'Dual Ball Bearing',
      'Noise Level': '26 dBA'
    },
    features: ['Continuous duty cycle rated', 'Includes 2-pin DuPont connector'],
    includedItems: ['1x 12V 60mm Cooling Fan', '4x Mounting Screws']
  },

  // ─── 🧪 3. ELECTROLYSIS SYSTEM CATALOG ──────────────────────────────
  {
    id: 'part-electrolysis-cell',
    slug: 'electrolysis-reaction-cell',
    name: 'Electrolysis Reaction Cell',
    shortDescription: 'Corrosion-resistant acrylic reaction vessel for splitting demineralized water into H₂ and O₂ under DC current.',
    price: 500,
    currency: 'INR',
    category: 'Electrolysis System',
    images: ['/src/assets/images/electrolysis_reactor_1787117856993.jpg'],
    imageSource: 'photo',
    availability: 'available',
    stock: 12,
    catalystApplication: 'Chemical energy conversion stage in CATALYST Mk-1 (Subsystem 03).',
    quantityInCatalyst: '1 Cell Assembly (≈ 0.5 A measured current)',
    specifications: {
      'Chamber Volume': '250 mL',
      'Material': 'Solvent-Welded Acrylic & Acid-Resistant Polypropylene',
      'Electrode Ports': 'Dual sealed pass-throughs',
      'Gas Output Port': '6mm Hose Barb with O-ring seal'
    },
    features: ['Clear visual monitoring of bubble generation', 'Airtight threaded top cap with silicone gasket', 'Modular electrode replacement slots'],
    includedItems: ['1x Electrolysis Cell Chamber', 'Silicone Sealing Ring', 'Gas Exit Barb Fitting'],
    safetyWarning: 'SAFETY NOTICE: This component is for controlled experimental research. Involves flammable gas generation. Operate ONLY in well-ventilated spaces with verified safety protocols.'
  },
  {
    id: 'part-electrodes-pair',
    slug: 'electrolysis-electrodes-pair',
    name: 'Electrolysis Electrodes (Pair - Anode & Cathode)',
    shortDescription: 'High-purity corrosion-resistant stainless steel / nickel-coated mesh electrode pair for water electrolysis.',
    price: 250,
    currency: 'INR',
    category: 'Electrolysis System',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 25,
    catalystApplication: 'Submerged anode/cathode pair inside the CATALYST Mk-1 electrolysis chamber.',
    quantityInCatalyst: '1 Pair',
    specifications: {
      'Material': '316L Marine-Grade Stainless Steel Mesh',
      'Surface Area': '25 cm² per electrode',
      'Current Density': 'Up to 1.5 A continuous',
      'Stem Length': '120 mm with insulated sleeve'
    },
    features: ['Resistant to KOH and alkaline electrolyte degradation', 'High surface area mesh geometry promotes gas bubble detachment'],
    includedItems: ['1x Anode Electrode', '1x Cathode Electrode', '2x Sealing Grommets'],
    safetyWarning: 'Ensure correct polarity during electrical connection to avoid accelerated electrode oxidation.'
  },
  {
    id: 'part-power-connector-set',
    slug: 'electrolysis-power-connector-set',
    name: 'Electrolysis Power Connector Set',
    shortDescription: 'Corrosion-shielded heavy-gauge electrical connection kit for electrolysis cell terminal posts.',
    price: 150,
    currency: 'INR',
    category: 'Electrolysis System',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 30,
    catalystApplication: 'Power harness delivering 12V/0.5A DC to the reaction cell.',
    quantityInCatalyst: '1 Harness Set',
    specifications: {
      'Wire Gauge': '18 AWG Silicone Insulated',
      'Terminals': 'Gold-Plated M4 Ring Lugs with Heat Shrink',
      'Current Rating': '5 A Max'
    },
    features: ['High-flexibility silicone jacket', 'Moisture and electrolyte-vapor resistant'],
    includedItems: ['1x Positive Lead (Red)', '1x Negative Lead (Black)']
  },
  {
    id: 'part-gas-tubing',
    slug: 'gas-tubing-set',
    name: 'Gas Tubing Set (High-Purity Silicone 2m)',
    shortDescription: 'Flexible chemical-resistant silicone tubing for routing generated gas from cell to collection separator.',
    price: 100,
    currency: 'INR',
    category: 'Electrolysis System',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 40,
    catalystApplication: 'Gas transport lines connecting Subsystem 03 to Subsystem 04 in CATALYST Mk-1.',
    quantityInCatalyst: '2 Meters Tubing',
    specifications: {
      'Inner Diameter': '4 mm',
      'Outer Diameter': '6 mm',
      'Temperature Range': '-60 °C to +200 °C',
      'Material': 'Food-Grade Platinum-Cured Silicone'
    },
    features: ['Non-kinking pliable wall', 'Transparent for liquid condensation inspection'],
    includedItems: ['2m Silicone Gas Tubing', '4x Stainless Mini Spring Clamps']
  },
  {
    id: 'part-gas-check-valve',
    slug: 'gas-check-valve',
    name: 'One-Way Gas Check Valve (Non-Return)',
    shortDescription: 'Safety non-return valve preventing reverse gas flow and flashback into electrolysis reservoir.',
    price: 80,
    currency: 'INR',
    category: 'Electrolysis System',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 50,
    catalystApplication: 'Critical line safety valve between gas collection assembly and thermal burner.',
    quantityInCatalyst: '2 Valves in series',
    specifications: {
      'Cracking Pressure': '0.005 MPa',
      'Body Material': 'PVDF / Viton Diaphragm',
      'Port Size': '6 mm Barb'
    },
    features: ['Ultra-low cracking pressure', 'Zero back-leakage design', 'Chemical resistant diaphragm'],
    includedItems: ['1x One-Way Check Valve'],
    safetyWarning: 'Essential safety component. Never operate gas delivery systems without verified non-return valves.'
  },
  {
    id: 'part-gas-separator',
    slug: 'gas-collection-separator-assembly',
    name: 'Gas Collection & Moisture Separator Assembly',
    shortDescription: 'Bubbler and moisture trap isolating water droplets from gas stream prior to thermal delivery.',
    price: 350,
    currency: 'INR',
    category: 'Electrolysis System',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 18,
    catalystApplication: 'Moisture separation and flash arrestor buffer in CATALYST Mk-1.',
    quantityInCatalyst: '1 Assembly',
    specifications: {
      'Volume': '100 mL Trap',
      'Drain Port': 'Bottom purge valve',
      'Mounting': 'Snap-in acrylic bracket'
    },
    features: ['Acts as secondary flame arrestor water bubbler', 'Integrated water condensation collection level'],
    includedItems: ['1x Moisture Separator Vessel', 'Mounting Bracket', 'Barbed Fittings'],
    safetyWarning: 'Maintain water level above bubble dip-tube at all times during testing.'
  },
  {
    id: 'part-water-reservoir',
    slug: 'water-reservoir-150ml',
    name: 'Demineralized Water Reservoir (150mL)',
    shortDescription: 'Gravity-fed electrolyte top-up reservoir for maintaining liquid volume in reaction cell.',
    price: 150,
    currency: 'INR',
    category: 'Electrolysis System',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 25,
    catalystApplication: 'Electrolyte liquid supply for CATALYST Mk-1 reaction chamber.',
    quantityInCatalyst: '1 Reservoir',
    specifications: {
      'Capacity': '150 mL',
      'Material': 'High-Density Polyethylene (HDPE)',
      'Fitting': 'Luer-lock shutoff valve'
    },
    features: ['Graduated volume markings', 'Leak-proof screw cap'],
    includedItems: ['1x 150mL Reservoir Bottle', 'Luer Valve & Tube Connector']
  },
  {
    id: 'part-electrolysis-mount',
    slug: 'electrolysis-mounting-kit',
    name: 'Electrolysis Subsystem Mounting Kit',
    shortDescription: 'Shock-absorbing laser-cut acrylic and aluminum mounting bracket for securing cell and bubbler.',
    price: 200,
    currency: 'INR',
    category: 'Electrolysis System',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 20,
    catalystApplication: 'Physical chassis mounting for Subsystem 03 in CATALYST Mk-1.',
    quantityInCatalyst: '1 Kit',
    specifications: {
      'Material': '3mm Clear Acrylic with Rubber Dampers',
      'Fasteners': 'M3 Stainless Steel Standoffs'
    },
    features: ['Isolates vibration', 'Modular rail mounting slots'],
    includedItems: ['1x Laser-cut Base Plate', '4x Rubber Dampeners', 'Standoff Hardware Pack']
  },

  // ─── 🤖 4. SMART MONITORING / ELECTRONICS ───────────────────────────
  {
    id: 'part-arduino-uno',
    slug: 'arduino-uno-r3-board',
    name: 'Arduino UNO R3 Microcontroller Board',
    shortDescription: 'Primary central embedded controller executing system telemetry, sensor reading, and emergency cutoff logic.',
    price: 500,
    currency: 'INR',
    category: 'Smart Monitoring / Electronics',
    images: ['/src/assets/images/arduino_uno_photo_1787117842796.jpg'],
    imageSource: 'photo',
    availability: 'available',
    stock: 30,
    catalystApplication: 'Master control and telemetry brain in CATALYST Mk-1 (Subsystem 07).',
    quantityInCatalyst: '1 Arduino UNO (8+ hours continuous uptime measured)',
    specifications: {
      'Microcontroller': 'ATmega328P (16 MHz Clock)',
      'Operating Voltage': '5V DC (Input 7-12V)',
      'Digital I/O Pins': '14 (6 PWM outputs)',
      'Analog Input Pins': '6 ADC Channels (10-bit resolution)',
      'Flash Memory': '32 KB'
    },
    features: ['DIP socketed ATmega328P', 'CH340/ATmega16U2 USB interface', 'Direct SPI/I2C/UART headers'],
    includedItems: ['1x Arduino UNO R3 Board', '1x 50cm USB Type-B Cable']
  },
  {
    id: 'part-lcd-display',
    slug: '16x2-i2c-lcd-display',
    name: '16×2 I²C Character LCD Display Module',
    shortDescription: 'High-contrast alphanumeric display showing live temperature gradient, battery voltage, and TEG milliwatt power.',
    price: 165,
    currency: 'INR',
    category: 'Smart Monitoring / Electronics',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 40,
    catalystApplication: 'Live benchtop telemetry display on the CATALYST Mk-1 instrument panel.',
    quantityInCatalyst: '1 LCD Module',
    specifications: {
      'Display Format': '16 Characters x 2 Lines',
      'Interface': 'I²C (PCF8574 Backpack, Address 0x27 or 0x3F)',
      'Operating Voltage': '5V DC',
      'Backlight': 'Blue with white text (Contrast adjustable)'
    },
    features: ['2-wire I²C connection frees Arduino GPIO pins', 'On-board contrast potentiometer'],
    includedItems: ['1x 1602 LCD with Pre-soldered I²C Backpack', '4-pin Female DuPont cable']
  },
  {
    id: 'part-dht11-sensor',
    slug: 'dht11-temperature-humidity-sensor',
    name: 'DHT11 Temperature & Humidity Sensor',
    shortDescription: 'Digital sensor measuring ambient thermal and relative humidity parameters surrounding the test chassis.',
    price: 60,
    currency: 'INR',
    category: 'Smart Monitoring / Electronics',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 50,
    catalystApplication: 'Ambient baseline monitoring for Seebeck ΔT calculation.',
    quantityInCatalyst: '1 Sensor',
    specifications: {
      'Temperature Range': '0 to 50 °C (±2 °C accuracy)',
      'Humidity Range': '20 to 90% RH (±5% accuracy)',
      'Sampling Rate': '1 Hz'
    },
    features: ['Single-wire digital protocol', 'Pre-soldered on breakout PCB with pull-up resistor'],
    includedItems: ['1x DHT11 Breakout Module', '3-pin DuPont Cable']
  },
  {
    id: 'part-mq2-sensor',
    slug: 'mq-2-gas-sensor',
    name: 'MQ-2 Gas & Smoke Detector Sensor',
    shortDescription: 'Electrochemical safety sensor detecting trace hydrogen and combustible gas leakages.',
    price: 100,
    currency: 'INR',
    category: 'Smart Monitoring / Electronics',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 35,
    catalystApplication: 'Automatic hydrogen leak shutdown safety monitor in CATALYST Mk-1.',
    quantityInCatalyst: '1 Sensor (interfaced with Arduino interrupt pin)',
    specifications: {
      'Target Gases': 'Hydrogen (H₂), LPG, Smoke, Methane',
      'Concentration Range': '300 – 10000 ppm',
      'Output': 'Analog voltage + Digital threshold DO pin'
    },
    features: ['Fast response time (<10s)', 'Adjustable trigger potentiometer', 'High sensitivity to H₂'],
    includedItems: ['1x MQ-2 Sensor Breakout Board', '4-pin DuPont Cable']
  },
  {
    id: 'part-water-level-sensor',
    slug: 'water-level-sensor-module',
    name: 'Water Level Sensor Module',
    shortDescription: 'Parallel trace resistance sensor monitoring liquid volume inside the electrolysis chamber.',
    price: 25,
    currency: 'INR',
    category: 'Smart Monitoring / Electronics',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 60,
    catalystApplication: 'Low-water cutoff protection for electrolysis cell.',
    quantityInCatalyst: '1 Sensor',
    specifications: {
      'Detection Area': '40 x 16 mm',
      'Operating Current': '< 20 mA',
      'Operating Voltage': '3.3V – 5V DC'
    },
    features: ['Gold plated exposed traces prevent rapid corrosion', 'Direct analog output'],
    includedItems: ['1x Water Level Sensor Module']
  },
  {
    id: 'part-joystick-module',
    slug: 'analog-joystick-module',
    name: 'Dual-Axis Analog Joystick Module',
    shortDescription: 'Manual user control input for navigating telemetry screens and calibration menu options.',
    price: 50,
    currency: 'INR',
    category: 'Smart Monitoring / Electronics',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 40,
    catalystApplication: 'Interactive benchtop dashboard menu control.',
    quantityInCatalyst: '1 Joystick',
    specifications: {
      'Axis': 'X and Y Analog Potentiometers (10kΩ)',
      'Button': 'Integrated tactile push switch (Z-axis)'
    },
    features: ['Smooth spring return to center', 'Comfortable rubberized thumb cap'],
    includedItems: ['1x Analog Joystick Module with Thumbstick']
  },
  {
    id: 'part-rc522-rfid',
    slug: 'rc522-rfid-reader-module',
    name: 'RC522 13.56MHz RFID Reader Module',
    shortDescription: 'High-frequency RFID reader establishing authorized operator access and state machine unlocking.',
    price: 70,
    currency: 'INR',
    category: 'Smart Monitoring / Electronics',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 45,
    catalystApplication: 'Parallel access and safety arming layer in CATALYST Mk-1 (Subsystem 08).',
    quantityInCatalyst: '1 RC522 Reader (SPI bus to Arduino)',
    specifications: {
      'Frequency': '13.56 MHz (ISO 14443A)',
      'Interface': 'SPI (Serial Peripheral Interface)',
      'Operating Voltage': '3.3V DC',
      'Read Range': 'Up to 50 mm'
    },
    features: ['Low power sleep mode', 'Hardware cryptographic engine for MIFARE tags'],
    includedItems: ['1x RC522 RFID Module', '1x 8-pin Straight Header', '1x 8-pin Right-Angle Header']
  },
  {
    id: 'part-rfid-card',
    slug: 'rfid-smart-card-13-56mhz',
    name: '13.56MHz RFID Smart Card (White PVC)',
    shortDescription: 'Standard ISO proximity card holding encrypted authorization keys for system startup.',
    price: 30,
    currency: 'INR',
    category: 'Smart Monitoring / Electronics',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 100,
    catalystApplication: 'Master authorization key for CATALYST Mk-1 system boot.',
    quantityInCatalyst: '1 Card (Assigned to Operator)',
    specifications: {
      'Chip Type': 'MIFARE Classic 1K Compatible',
      'Memory': '1 KB EEPROM (16 sectors)',
      'Material': 'Glossy PVC'
    },
    features: ['Rewritable UID/data blocks', 'Durable waterproof design'],
    includedItems: ['1x Blank White RFID Card']
  },
  {
    id: 'part-rfid-keytag',
    slug: 'rfid-keychain-tag-blue',
    name: '13.56MHz RFID Keychain Tag (Blue ABS)',
    shortDescription: 'Compact durable ABS key fob tag for quick operator arming and testing.',
    price: 20,
    currency: 'INR',
    category: 'Smart Monitoring / Electronics',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 120,
    catalystApplication: 'Secondary safety key for laboratory technician access.',
    quantityInCatalyst: '2 Key Tags',
    specifications: {
      'Frequency': '13.56 MHz',
      'Material': 'Ultrasonically Sealed ABS with Split Ring'
    },
    features: ['Shockproof and waterproof', 'Compact pocket size'],
    includedItems: ['1x Blue RFID Key Tag with Keyring']
  },

  // ─── 🔌 5. ELECTRICAL & CONTROL PARTS ───────────────────────────────
  {
    id: 'part-relay-5v',
    slug: '5v-single-channel-relay-module',
    name: '5V Single-Channel Relay Module (Optocoupled)',
    shortDescription: 'Optocoupled switching module isolating sensitive Arduino logic from high-current electrolysis load.',
    price: 50,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 50,
    catalystApplication: 'Electrolysis power relay switch controlled by Arduino.',
    quantityInCatalyst: '1 Relay Module',
    specifications: {
      'Control Voltage': '5V DC (Active Low/High selectable)',
      'Contact Rating': '10A 250V AC / 10A 30V DC',
      'Isolation': 'PC817 Optocoupler'
    },
    features: ['LED status indicator', 'Screw terminal outputs (NO / NC / COM)'],
    includedItems: ['1x 5V Relay Module']
  },
  {
    id: 'part-fuse-holder',
    slug: 'inline-fuse-holder-16awg',
    name: 'Inline Waterproof Blade Fuse Holder (16 AWG)',
    shortDescription: 'Inline protective fuse holder safeguarding 12V battery bus against catastrophic short circuits.',
    price: 40,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 60,
    catalystApplication: 'Main battery protection fuse line in CATALYST Mk-1.',
    quantityInCatalyst: '2 Fuse Holders',
    specifications: {
      'Wire Gauge': '16 AWG Pure Copper',
      'Fuse Type': 'Standard ATC/ATO Automotive Blade',
      'Rating': 'Up to 20 A'
    },
    features: ['Weatherproof rubber snap-cap', 'Thick pure copper leads'],
    includedItems: ['1x Inline Fuse Holder']
  },
  {
    id: 'part-blade-fuse-set',
    slug: 'automotive-blade-fuse-set',
    name: 'Automotive Blade Fuse Set (5A, 10A, 15A - 10 Pack)',
    shortDescription: 'Multi-amperage fast-acting blade fuse assortment for benchtop electrical safety.',
    price: 100,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 40,
    catalystApplication: 'Circuit protection across multiple voltage tiers in CATALYST Mk-1.',
    quantityInCatalyst: '3 Fuses in active circuit',
    specifications: {
      'Current Ratings': '4x 5A (Orange), 4x 10A (Red), 2x 15A (Blue)',
      'Voltage Rating': '32V DC Max'
    },
    features: ['Transparent housing for rapid blown element inspection', 'Zinc alloy terminal blades'],
    includedItems: ['10x Assorted Blade Fuses in Organiser Box']
  },
  {
    id: 'part-dc-switch',
    slug: 'heavy-duty-dc-toggle-switch',
    name: 'Heavy-Duty DC Toggle Switch (12V 20A)',
    shortDescription: 'Panel-mount toggle switch with safety missile cover for master battery isolation.',
    price: 50,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 50,
    catalystApplication: 'Main DC power isolation switch on CATALYST Mk-1 chassis.',
    quantityInCatalyst: '1 Switch',
    specifications: {
      'Rating': '20A 12V DC / 10A 125V AC',
      'Mounting Hole': '12 mm Diameter',
      'Action': 'SPST ON/OFF'
    },
    features: ['Solid brass screw terminals', 'Heavy spring toggle snap action'],
    includedItems: ['1x SPST Heavy-Duty Toggle Switch']
  },
  {
    id: 'part-emergency-stop',
    slug: 'emergency-stop-push-button-switch',
    name: 'Emergency Stop Push-Button Switch (Mushroom Head 22mm)',
    shortDescription: 'Industrial latching push-to-stop twist-to-release safety switch triggering instant hardware power cutoff.',
    price: 180,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 25,
    catalystApplication: 'Master safety kill-switch for immediate shutdown of heating and electrolysis.',
    quantityInCatalyst: '1 Emergency Stop Switch',
    specifications: {
      'Button Diameter': '40 mm Mushroom Cap',
      'Mounting Cutout': '22 mm',
      'Contacts': '1x NC (Normally Closed) + 1x NO (Normally Open)',
      'Action': 'Push-lock, twist-to-reset'
    },
    features: ['Prominent red emergency cap with directional reset arrows', 'Double-pole heavy industrial contact block'],
    includedItems: ['1x 22mm Emergency Stop Switch Assembly'],
    safetyWarning: 'Critical safety mechanism. Wired in series with primary DC supply bus.'
  },
  {
    id: 'part-terminal-blocks',
    slug: 'screw-terminal-block-set',
    name: 'Screw Terminal Block Set (12-Position Barrier Strip)',
    shortDescription: 'High-current barrier terminal block distributing positive, ground, and sensor buses cleanly.',
    price: 100,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 35,
    catalystApplication: 'Central wiring harness distribution block inside CATALYST Mk-1 enclosure.',
    quantityInCatalyst: '1 Terminal Block Strip',
    specifications: {
      'Positions': '12 Dual-Row Screw Terminals (24 connections)',
      'Current Rating': '15 A per circuit',
      'Voltage Rating': '600 V Max',
      'Cover': 'Clear PVC Snap-on insulating shield'
    },
    features: ['Nickel plated brass screws', 'UL94V-0 flame retardant thermoplastic base'],
    includedItems: ['1x 12-Position Barrier Terminal Block', '2x 6-Position Shorting Jumpers']
  },
  {
    id: 'part-jumper-wires',
    slug: 'jumper-wire-set-65pcs',
    name: 'Jumper Wire Set (Male-Male Assorted 65 Pcs)',
    shortDescription: 'Flexible solderless breadboard jumper wire assortment with molded tips.',
    price: 120,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 50,
    catalystApplication: 'Signal routing between Arduino and sensor peripherals.',
    quantityInCatalyst: 'Assorted wiring bundle',
    specifications: {
      'Count': '65 Pieces in 4 distinct lengths (10cm, 15cm, 20cm, 25cm)',
      'Conductor': 'High-conductivity copper wire with molded male pins'
    },
    features: ['Color-coded jackets', 'Snug fit in breadboard sockets'],
    includedItems: ['65x Assorted Male-Male Jumper Wires']
  },
  {
    id: 'part-dupont-connectors',
    slug: 'dupont-ribbon-cable-set',
    name: 'DuPont Ribbon Cable Set (40-Pin Female-Female & Male-Female)',
    shortDescription: 'Multi-color ribbon jumper cable set with separable 2.54mm pitch connectors.',
    price: 100,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 45,
    catalystApplication: 'Module-to-module signal harness (RFID, LCD, Relay).',
    quantityInCatalyst: '20+ conductors used',
    specifications: {
      'Length': '20 cm',
      'Pitch': '2.54 mm (0.1 inch standard)',
      'Count': '40-pin ribbon cable'
    },
    features: ['Easily separated into custom width bundles', 'Standard 0.1" header pin fit'],
    includedItems: ['1x 40-Pin 20cm DuPont Ribbon Cable (F-F or M-F)']
  },
  {
    id: 'part-breadboard',
    slug: '830-point-solderless-breadboard',
    name: '830-Point Solderless Breadboard',
    shortDescription: 'High-quality prototyping breadboard with dual power distribution rails.',
    price: 100,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 50,
    catalystApplication: 'Circuit integration bench for sensor voltage dividers and relay drivers.',
    quantityInCatalyst: '1 Breadboard',
    specifications: {
      'Tie Points': '630 Terminal Points + 200 Power Rail Distribution Points',
      'Backing': 'Self-adhesive foam tape',
      'Dimensions': '165 x 55 x 9 mm'
    },
    features: ['Phosphor bronze nickel-plated spring clips', 'Interlocking tabs to connect multiple boards'],
    includedItems: ['1x 830-Point Solderless Breadboard']
  },
  {
    id: 'part-usb-cable',
    slug: 'usb-type-a-to-type-b-cable',
    name: 'USB 2.0 Cable for Arduino (Type A to Type B 1m)',
    shortDescription: 'Shielded USB data cable for flashing Arduino firmware and reading serial telemetry output.',
    price: 100,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 40,
    catalystApplication: 'Telemetry data uplink from Arduino to PC monitoring station.',
    quantityInCatalyst: '1 Cable',
    specifications: {
      'Length': '1.0 Meter',
      'Connectors': 'USB Type-A Male to USB Type-B Male',
      'Shielding': 'Aluminum foil + Braided shield'
    },
    features: ['Ferrite core EMI suppression', 'High-speed 480 Mbps data transfer'],
    includedItems: ['1x 1m USB-A to USB-B Cable']
  },
  {
    id: 'part-voltmeter-ammeter',
    slug: 'dual-led-dc-voltmeter-ammeter',
    name: 'Dual LED DC Digital Voltmeter / Ammeter (0–100V 10A)',
    shortDescription: 'Panel meter displaying real-time DC voltage and current with built-in shunt.',
    price: 100,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 35,
    catalystApplication: 'Visual stage monitoring for solar panel and boost converter output.',
    quantityInCatalyst: '2 Meters in panel',
    specifications: {
      'Voltage Range': '0.0V – 100V DC (Red 0.28" LED)',
      'Current Range': '0.00A – 9.99A DC (Blue 0.28" LED)',
      'Supply Voltage': '4.5V – 30V DC'
    },
    features: ['Built-in current shunt resistor', 'Calibration potentiometers on rear'],
    includedItems: ['1x Dual Voltmeter/Ammeter Panel Meter', 'Wiring Harness Set']
  },
  {
    id: 'part-relay-12v',
    slug: '12v-dc-automotive-relay-30a',
    name: '12V DC High-Current Relay (30A SPDT)',
    shortDescription: 'Automotive grade sealed relay capable of switching heavy inductive and heating loads.',
    price: 100,
    currency: 'INR',
    category: 'Electrical & Control Parts',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 30,
    catalystApplication: 'Main DC load contactor for thermal chamber power.',
    quantityInCatalyst: '1 Relay',
    specifications: {
      'Coil Voltage': '12V DC',
      'Contact Rating': '30A 14V DC / 20A 125V AC',
      'Pin Configuration': '5-Pin SPDT'
    },
    features: ['Sealed IP67 plastic casing', 'High impact resistance'],
    includedItems: ['1x 12V 30A SPDT Relay']
  },

  // ─── 🔧 6. MECHANICAL & THERMAL PARTS ───────────────────────────────
  {
    id: 'part-aluminium-heatsink-master',
    slug: 'master-aluminium-heat-sink',
    name: 'Master Aluminium Heat Sink (150×80×30mm)',
    shortDescription: 'High surface area convection heatsink for thermal containment and cooling dissipation.',
    price: 120,
    currency: 'INR',
    category: 'Mechanical & Thermal Parts',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 25,
    catalystApplication: 'Main heat management structure in CATALYST Mk-1 (Subsystem 04 & 05).',
    quantityInCatalyst: '2 Units',
    specifications: {
      'Dimensions': '150 x 80 x 30 mm',
      'Fin Density': '22 Extruded Cooling Fins',
      'Thermal Resistance': '0.95 °C/W'
    },
    features: ['Anodized anti-corrosion coating', 'CNC machined mounting holes'],
    includedItems: ['1x Master Aluminum Heat Sink']
  },
  {
    id: 'part-insulation-set',
    slug: 'high-temperature-thermal-insulation-set',
    name: 'High-Temperature Thermal Ceramic Insulation Set',
    shortDescription: 'Ceramic fiber thermal barrier pads preventing unwanted radiant heat leakage from thermal chamber.',
    price: 300,
    currency: 'INR',
    category: 'Mechanical & Thermal Parts',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 20,
    catalystApplication: 'Thermal chamber barrier in CATALYST Mk-1 (Subsystem 04, operating at ≈ 65 °C).',
    quantityInCatalyst: '1 Set (4 cut pads)',
    specifications: {
      'Max Continuous Temperature': '1000 °C',
      'Thickness': '10 mm',
      'Thermal Conductivity': '0.06 W/m·K at 200 °C'
    },
    features: ['Non-flammable inorganic ceramic fibers', 'Easily trimmed with utility knife'],
    includedItems: ['4x Ceramic Insulation Pads (100x100x10mm)', 'High-temp Kapton fixing tape (1 roll)']
  },
  {
    id: 'part-mounting-bracket',
    slug: 'metal-mounting-bracket-set',
    name: 'Metal Mounting Bracket Set (Right-Angle & Flat - 8 Pack)',
    shortDescription: 'Zinc-plated heavy gauge steel brackets for rigid structural assembly of the project frame.',
    price: 250,
    currency: 'INR',
    category: 'Mechanical & Thermal Parts',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 30,
    catalystApplication: 'Internal chassis framing for CATALYST Mk-1 subsystems.',
    quantityInCatalyst: '8 Brackets used across chassis',
    specifications: {
      'Material': '2.0mm Heavy Cold-Rolled Carbon Steel (Zinc Plated)',
      'Hole Size': '4.5 mm (fits M4 bolts)'
    },
    features: ['Countersunk mounting holes', 'Anti-corrosion electro-galvanized finish'],
    includedItems: ['4x L-Corner Brackets (40x40mm)', '4x Flat Joining Plates (60x20mm)']
  },
  {
    id: 'part-screw-nut-set',
    slug: 'm3-m4-screw-nut-standoff-set',
    name: 'M3 / M4 Stainless Steel Screw, Nut & Standoff Set (120 Pcs)',
    shortDescription: 'Comprehensive hardware fastener assortment for securely assembling electronics, sensors, and structural plates.',
    price: 100,
    currency: 'INR',
    category: 'Mechanical & Thermal Parts',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 50,
    catalystApplication: 'Fastening for all 8 subsystems in CATALYST Mk-1.',
    quantityInCatalyst: '50+ fasteners in assembly',
    specifications: {
      'Grade': '304 Stainless Steel (A2-70)',
      'Threads': 'Metric M3 & M4 Coarse Pitch'
    },
    features: ['Phillips pan head screws in 8mm, 12mm, 16mm, 20mm', 'Hex nuts and split lock washers included'],
    includedItems: ['120x Assorted Screws, Nuts, Washers and Brass PCB Standoffs in Plastic Case']
  },
  {
    id: 'part-aluminium-plate',
    slug: 'aluminium-mounting-chassis-plate',
    name: 'Aluminium Mounting Plate (250×200×3mm)',
    shortDescription: 'Rigid brushed 6061 aluminum baseplate serving as the primary chassis platform for the prototype.',
    price: 400,
    currency: 'INR',
    category: 'Mechanical & Thermal Parts',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 15,
    catalystApplication: 'Main benchtop chassis platform for CATALYST Mk-1.',
    quantityInCatalyst: '1 Baseplate',
    specifications: {
      'Dimensions': '250 x 200 x 3.0 mm',
      'Alloy': '6061-T6 Aluminum',
      'Finish': 'Brushed Satin with Protective Peel-off Film'
    },
    features: ['High structural stiffness', 'Pre-drilled perimeter mounting slots for modular repositioning'],
    includedItems: ['1x 250x200mm Aluminum Chassis Plate', '4x Adhesive Rubber Bumper Feet']
  },
  {
    id: 'part-fan-guard',
    slug: 'metal-wire-fan-guard-60mm',
    name: 'Metal Wire Fan Guard Finger Shield (60mm)',
    shortDescription: 'Electroplated nickel-steel wire grill protecting cooling fan blades and fingers from accidental contact.',
    price: 50,
    currency: 'INR',
    category: 'Mechanical & Thermal Parts',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 50,
    catalystApplication: 'Safety finger guard mounted on TEG cooling fan.',
    quantityInCatalyst: '1 Guard',
    specifications: {
      'Size': '60 x 60 mm',
      'Hole Spacing': '50 mm Center-to-Center',
      'Material': 'Bright Nickel Plated Steel Wire'
    },
    features: ['Low aerodynamic drag concentric ring design', 'Zero vibration rattle'],
    includedItems: ['1x 60mm Fan Grill Shield', '4x Mounting Screws']
  },
  {
    id: 'part-cable-management',
    slug: 'cable-management-spiral-sleeve-kit',
    name: 'Cable Management & Spiral Wrap Kit (2m + Zip Ties)',
    shortDescription: 'Braided heat-resistant loom and spiral wrap organizing electrical wiring into clean, secure channels.',
    price: 100,
    currency: 'INR',
    category: 'Mechanical & Thermal Parts',
    images: ['https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 45,
    catalystApplication: 'Harness routing throughout CATALYST Mk-1.',
    quantityInCatalyst: '1 Kit used across wiring looms',
    specifications: {
      'Sleeve Length': '2.0 Meters Spiral Wrap (8mm diameter)',
      'Zip Ties': '30x Nylon Ties (150mm UV Black)'
    },
    features: ['Flame retardant PE spiral', 'Keeps benchtop prototype clean and serviceable'],
    includedItems: ['2m Spiral Cable Wrap', '30x Cable Ties', '10x Adhesive Cable Mounting Clips']
  },
  {
    id: 'part-project-enclosure',
    slug: 'vented-project-enclosure-box',
    name: 'Vented Prototyping Project Enclosure (ABS)',
    shortDescription: 'Vented ABS instrument enclosure housing Arduino, relays, and power conditioning components safely.',
    price: 400,
    currency: 'INR',
    category: 'Mechanical & Thermal Parts',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    imageSource: 'photo',
    availability: 'available',
    stock: 20,
    catalystApplication: 'Electronics isolation enclosure on CATALYST Mk-1 test bench.',
    quantityInCatalyst: '1 Enclosure',
    specifications: {
      'Outer Dimensions': '200 x 120 x 75 mm',
      'Material': 'High-Impact Fire-Resistant ABS Plastic',
      'Ventilation': 'Dual-side cooling louvers'
    },
    features: ['Internal PCB mounting boss columns with brass threaded inserts', 'Front and rear removable aluminum panels for drilling custom display/switch cutouts'],
    includedItems: ['1x ABS Enclosure Case', '2x Aluminum End Plates', '4x Case Assembly Screws', '4x Rubber Base Feet']
  }
];

export function getProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug || p.id === slug);
}

export function getFlagshipProducts(): Product[] {
  return PRODUCTS.filter(p => p.isFlagship || p.category === 'Flagship Modules');
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

export function getCategories(): ProductCategory[] {
  return [
    'Flagship Modules',
    'Energy System',
    'TEG System',
    'Electrolysis System',
    'Smart Monitoring / Electronics',
    'Electrical & Control Parts',
    'Mechanical & Thermal Parts'
  ];
}
