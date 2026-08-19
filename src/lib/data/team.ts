import { TeamMember } from '../../types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-sukhdeep',
    name: 'Sukhdeep',
    role: 'A.R.C. LABS Team / CATALYST Mk-1 Team',
    team: 'Core Engineering & Hardware Prototyping',
    bio: 'Student researcher focused on mechanical subsystem integration, thermal management structures, and physical prototype fabrication.',
    areasOfInterest: [
      'Thermal Systems & Heat Exchangers',
      'Solid-State Energy Harvesting',
      'Rapid Hardware Fabrication'
    ],
    photoUrl: ''
  },
  {
    id: 'team-nikunj',
    name: 'Nikunj',
    role: 'A.R.C. LABS Team / CATALYST Mk-1 Team',
    team: 'Embedded Systems & Telemetry',
    bio: 'Student researcher focused on microcontroller architecture, multi-sensor calibration, I2C telemetry communication, and safety interrupt design.',
    areasOfInterest: [
      'Microcontroller Firmware (ATmega / ARM)',
      'Sensor Acquisition & Calibration',
      'Fail-safe Safety Automation'
    ],
    photoUrl: ''
  },
  {
    id: 'team-aarav',
    name: 'Aarav',
    role: 'A.R.C. LABS Team / CATALYST Mk-1 Team',
    team: 'Electrochemical & Power Electronics',
    bio: 'Student researcher focused on electrolysis reaction cell dynamics, Seebeck power conditioning, and thermodynamic efficiency modeling.',
    areasOfInterest: [
      'Water Electrolysis Dynamics',
      'DC-DC Step-Up Topologies',
      'Thermodynamic Energy Modeling'
    ],
    photoUrl: ''
  }
];

export function getTeamMembers(): TeamMember[] {
  return TEAM_MEMBERS;
}
