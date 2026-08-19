import React, { useRef, useState, useEffect } from 'react';
import { Layers, RotateCw, Eye, Zap, Flame, ShieldAlert, Cpu, Sparkles, Sliders, Box, Camera, CheckCircle2, ArrowRight } from 'lucide-react';
import { DataLabelBadge } from '../ui/Badge';

interface SubsystemHotspot {
  id: string;
  name: string;
  category: string;
  x: number; // percentage
  y: number; // percentage
  metric: string;
  metricType: 'MEASURED' | 'CALCULATED' | 'ESTIMATED';
  detail: string;
  image: string;
  specs: string;
}

const HOTSPOTS: SubsystemHotspot[] = [
  {
    id: 'sub-solar',
    name: '01. Solar Input Panel (4W)',
    category: 'Input Stage',
    x: 22,
    y: 30,
    metric: '4.0 W Peak',
    metricType: 'MEASURED',
    detail: 'Polycrystalline silicon solar panel with bypass diode and tempered low-iron glass, generating DC input.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    specs: 'Voc = 21.6V, Imp = 0.22A, 180x240mm'
  },
  {
    id: 'sub-battery',
    name: '02. 12V Battery & PWM Regulator',
    category: 'Buffer Stage',
    x: 34,
    y: 62,
    metric: '12.0 V Bus',
    metricType: 'MEASURED',
    detail: 'Decoupled intermediate energy storage buffer sustaining steady-state 0.5A electrolysis current.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    specs: '12V 7Ah Deep-Cycle with 10A PWM controller'
  },
  {
    id: 'sub-electrolysis',
    name: '03. Reaction Electrolysis Cell',
    category: 'Conversion Stage',
    x: 48,
    y: 38,
    metric: '0.5 A Current',
    metricType: 'MEASURED',
    detail: 'Clear cylindrical reactor with 316L stainless steel mesh electrodes dissociating demineralized H₂O into gas.',
    image: '/src/assets/images/electrolysis_reactor_1787117856993.jpg',
    specs: '316L Marine Mesh, 250mL vessel, 6mm gas barb'
  },
  {
    id: 'sub-thermal',
    name: '04. Insulated Thermal Chamber',
    category: 'Thermal Stage',
    x: 64,
    y: 32,
    metric: '65.0 °C Peak',
    metricType: 'MEASURED',
    detail: 'Ceramic fiber insulated core transferring catalytic enthalpy to pure copper base plate.',
    image: '/src/assets/images/cooling_heatsink_fin_1787117869410.jpg',
    specs: '6061-T6 casing + C11000 copper spreader'
  },
  {
    id: 'sub-teg',
    name: '05. Quad SP1848 TEG Array',
    category: 'Generation Stage',
    x: 76,
    y: 56,
    metric: '4.8 V / 45 mW',
    metricType: 'MEASURED',
    detail: 'Solid-state Seebeck thermoelectric generator harvesting steep temperature gradient (ΔT ≈ 40°C).',
    image: '/src/assets/images/teg_module_photo_1787117825473.jpg',
    specs: '4x SP1848-27145 40x40mm ceramic modules'
  },
  {
    id: 'sub-arduino',
    name: '06. Arduino Telemetry Controller',
    category: 'Control & Safety',
    x: 82,
    y: 24,
    metric: '<15 ms Cutoff',
    metricType: 'MEASURED',
    detail: 'ATmega328P controller polling MQ-2 gas detector, thermal probes, and relay safety interlocks.',
    image: '/src/assets/images/arduino_uno_photo_1787117842796.jpg',
    specs: '16 MHz ATmega328P, 16x2 I2C LCD, MQ-2 Sensor'
  }
];

export const InteractiveModelViewer: React.FC<{ onSelectSubsystem?: (id: string) => void }> = ({ onSelectSubsystem }) => {
  const [viewMode, setViewMode] = useState<'cad-photo' | '3d-simulator'>('cad-photo');
  const [isExploded, setIsExploded] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<SubsystemHotspot>(HOTSPOTS[2]);
  const [dragStartX, setDragStartX] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef(35);
  const bubbleTickRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isAutoRotatingRef = useRef(true);

  // Sync ref with state
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // Decoupled Animation Loop for 3D Simulator
  useEffect(() => {
    if (viewMode !== '3d-simulator') return;

    let animationFrameId: number;

    const render = () => {
      bubbleTickRef.current += 1;
      if (isAutoRotatingRef.current && !isDraggingRef.current) {
        angleRef.current = (angleRef.current + 0.35) % 360;
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawRealisticRig(ctx, canvas.width, canvas.height, angleRef.current, isExploded, bubbleTickRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isExploded, viewMode]);

  // High-Fidelity Realistic Hardware Canvas Renderer
  const drawRealisticRig = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    deg: number,
    exploded: boolean,
    tick: number
  ) => {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2 + 25;
    const rad = (deg * Math.PI) / 180;
    const exp = exploded ? 45 : 0;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // 1. Tech Ground Grid with Perspective
    ctx.save();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.lineWidth = 1;
    for (let x = -260; x <= 260; x += 32) {
      const px1 = cx + x * cos - (-140) * sin;
      const py1 = cy + (x * sin + (-140) * cos) * 0.46 + 110;
      const px2 = cx + x * cos - 140 * sin;
      const py2 = cy + (x * sin + 140 * cos) * 0.46 + 110;
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px2, py2);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Chassis Baseplate (Carbon-fiber texture with brushed aluminum rim)
    drawRealBasePlate(ctx, cx, cy + 95, 270, 160, 16, rad);

    // 3. Solar Photovoltaic Input Panel (Left side)
    const solarX = cx - cos * (90 + exp) + sin * 35;
    const solarY = cy + 40 - sin * (90 + exp) * 0.46;
    drawRealSolarPanel(ctx, solarX, solarY - exp * 0.8, 95, 65, 8, rad);

    // 4. 12V Battery & Relay Buffer (Left Rear)
    const battX = cx - cos * (60 + exp) - sin * 45;
    const battY = cy + 55 - sin * (60 + exp) * 0.46;
    drawRealBattery(ctx, battX, battY, 68, 48, 42, rad);

    // 5. Electrolysis Reactor Chamber (Center Cylindrical Glass)
    const reacX = cx;
    const reacY = cy + 12;
    drawRealElectrolysisCell(ctx, reacX, reacY - exp * 0.4, 40, 72, rad, tick);

    // 6. Insulated Thermal Combustion Core & Copper Plate (Upper Center)
    const heatX = cx + sin * 25;
    const heatY = cy - 45 - exp * 1.1;
    drawRealThermalCore(ctx, heatX, heatY, 64, 64, 38, rad, tick);

    // 7. Quad Seebeck TEG Array Sandwich (Right side)
    const tegX = cx + cos * (85 + exp);
    const tegY = cy + 32 + sin * (85 + exp) * 0.46;
    drawRealTEGArray(ctx, tegX, tegY, 68, 68, 14, rad);

    // 8. Cooling Heatsink Fin Array (Stacked on TEG)
    const sinkX = tegX;
    const sinkY = tegY - 24 - exp * 0.8;
    drawRealHeatsink(ctx, sinkX, sinkY, 78, 78, 40, rad);

    // 9. Arduino Microcontroller PCB (Right Rear)
    const mcuX = cx + cos * (80 + exp) - sin * 55;
    const mcuY = cy - 20 + sin * (80 + exp) * 0.46;
    drawRealArduinoBoard(ctx, mcuX, mcuY - exp * 0.5, 55, 40, 8, rad, tick);

    // 10. Interconnecting Wiring & Gas Tubing
    drawWireLoom(ctx, solarX, solarY, battX, battY, '#3b82f6');
    drawWireLoom(ctx, battX, battY, reacX, reacY, '#10b981');
    drawGasTube(ctx, reacX, reacY - 30, heatX, heatY + 10, 'rgba(56, 189, 248, 0.7)');
    drawWireLoom(ctx, tegX, tegY, mcuX, mcuY, '#f59e0b');
  };

  // Realistic Baseplate with Chamfer & Carbon Texture
  const drawRealBasePlate = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    d: number,
    h: number,
    rad: number
  ) => {
    ctx.save();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const corners = [
      { x: (-w / 2) * cos - (-d / 2) * sin, y: ((-w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (-d / 2) * sin, y: ((w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (d / 2) * sin, y: ((w / 2) * sin + (d / 2) * cos) * 0.46 },
      { x: (-w / 2) * cos - (d / 2) * sin, y: ((-w / 2) * sin + (d / 2) * cos) * 0.46 },
    ];

    // Drop Shadow
    ctx.beginPath();
    ctx.ellipse(cx, cy + h + 8, w * 0.6, d * 0.35, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.filter = 'blur(12px)';
    ctx.fill();
    ctx.filter = 'none';

    // Front/Side Walls (Brushed dark alloy)
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4;
      const grad = ctx.createLinearGradient(cx + corners[i].x, cy + corners[i].y, cx + corners[next].x, cy + corners[next].y + h);
      grad.addColorStop(0, '#131b17');
      grad.addColorStop(1, '#080d0b');
      ctx.fillStyle = grad;
      ctx.strokeStyle = '#10b98144';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(cx + corners[i].x, cy + corners[i].y);
      ctx.lineTo(cx + corners[next].x, cy + corners[next].y);
      ctx.lineTo(cx + corners[next].x, cy + corners[next].y + h);
      ctx.lineTo(cx + corners[i].x, cy + corners[i].y + h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Top Face (Carbon fiber matte with emerald chamfer bevel)
    ctx.beginPath();
    ctx.moveTo(cx + corners[0].x, cy + corners[0].y);
    for (let i = 1; i < 4; i++) {
      ctx.lineTo(cx + corners[i].x, cy + corners[i].y);
    }
    ctx.closePath();
    const topGrad = ctx.createLinearGradient(cx - w / 2, cy - d / 2, cx + w / 2, cy + d / 2);
    topGrad.addColorStop(0, '#1a2420');
    topGrad.addColorStop(0.5, '#0e1713');
    topGrad.addColorStop(1, '#16211d');
    ctx.fillStyle = topGrad;
    ctx.fill();
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  };

  // Realistic Polycrystalline Solar Panel
  const drawRealSolarPanel = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    d: number,
    h: number,
    rad: number
  ) => {
    ctx.save();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const corners = [
      { x: (-w / 2) * cos - (-d / 2) * sin, y: ((-w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (-d / 2) * sin, y: ((w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (d / 2) * sin, y: ((w / 2) * sin + (d / 2) * cos) * 0.46 },
      { x: (-w / 2) * cos - (d / 2) * sin, y: ((-w / 2) * sin + (d / 2) * cos) * 0.46 },
    ];

    // Aluminum Frame
    ctx.beginPath();
    ctx.moveTo(cx + corners[0].x, cy + corners[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(cx + corners[i].x, cy + corners[i].y);
    ctx.closePath();
    ctx.fillStyle = '#1e3a8a';
    ctx.fill();
    ctx.strokeStyle = '#93c5fd';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Solar Silicon Grid Lines (Photovoltaic Wafer Cells)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 0.8;
    for (let i = 1; i <= 3; i++) {
      const fx = -w / 2 + (w / 4) * i;
      const p1x = cx + fx * cos - (-d / 2) * sin;
      const p1y = cy + (fx * sin + (-d / 2) * cos) * 0.46;
      const p2x = cx + fx * cos - (d / 2) * sin;
      const p2y = cy + (fx * sin + (d / 2) * cos) * 0.46;
      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.stroke();
    }

    // Specular Anti-Reflective Glare Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx + corners[0].x + 10, cy + corners[0].y + 4);
    ctx.lineTo(cx + corners[2].x - 10, cy + corners[2].y - 4);
    ctx.stroke();

    ctx.restore();
  };

  // Realistic Battery Pack
  const drawRealBattery = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    d: number,
    h: number,
    rad: number
  ) => {
    ctx.save();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const corners = [
      { x: (-w / 2) * cos - (-d / 2) * sin, y: ((-w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (-d / 2) * sin, y: ((w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (d / 2) * sin, y: ((w / 2) * sin + (d / 2) * cos) * 0.46 },
      { x: (-w / 2) * cos - (d / 2) * sin, y: ((-w / 2) * sin + (d / 2) * cos) * 0.46 },
    ];

    // Case Body (Matte black ABS plastic)
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4;
      ctx.fillStyle = i % 2 === 0 ? '#1f2421' : '#141816';
      ctx.strokeStyle = '#2d3748';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + corners[i].x, cy + corners[i].y);
      ctx.lineTo(cx + corners[next].x, cy + corners[next].y);
      ctx.lineTo(cx + corners[next].x, cy + corners[next].y + h);
      ctx.lineTo(cx + corners[i].x, cy + corners[i].y + h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Top Cap with Red & Black Terminal Lugs
    ctx.beginPath();
    ctx.moveTo(cx + corners[0].x, cy + corners[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(cx + corners[i].x, cy + corners[i].y);
    ctx.closePath();
    ctx.fillStyle = '#2d3748';
    ctx.fill();

    // Red Terminal (+)
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx - 12 * cos, cy - 12 * sin * 0.46 - 4, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Black Terminal (-)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(cx + 12 * cos, cy + 12 * sin * 0.46 - 4, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Realistic Borosilicate Glass Electrolysis Reactor with Animated Bubbles
  const drawRealElectrolysisCell = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    h: number,
    rad: number,
    tick: number
  ) => {
    ctx.save();

    // Transparent Glass Cylinder Backing & Liquid Electrolyte
    ctx.fillStyle = 'rgba(14, 165, 233, 0.28)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.ellipse(cx, cy + h, r, r * 0.46, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - r, cy);
    ctx.lineTo(cx - r, cy + h);
    ctx.ellipse(cx, cy + h, r, r * 0.46, 0, 0, Math.PI, false);
    ctx.lineTo(cx + r, cy);
    ctx.ellipse(cx, cy, r, r * 0.46, 0, 0, Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Stainless Steel Electrodes (Dual Plates)
    ctx.fillStyle = 'rgba(226, 232, 240, 0.75)';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.fillRect(cx - 10, cy + 15, 6, h - 25);
    ctx.strokeRect(cx - 10, cy + 15, 6, h - 25);
    ctx.fillRect(cx + 4, cy + 15, 6, h - 25);
    ctx.strokeRect(cx + 4, cy + 15, 6, h - 25);

    // Rising Gas Micro-Bubbles (H₂ and O₂)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let i = 0; i < 8; i++) {
      const bubbleY = ((tick * 1.5 + i * 14) % (h - 20));
      const bubbleX1 = cx - 7 + Math.sin(tick * 0.1 + i) * 3;
      const bubbleX2 = cx + 7 + Math.cos(tick * 0.1 + i) * 3;
      ctx.beginPath();
      ctx.arc(bubbleX1, cy + h - 10 - bubbleY, 1.8, 0, Math.PI * 2);
      ctx.arc(bubbleX2, cy + h - 10 - bubbleY, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Top Cap & Brass Barb Fitting
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.46, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(cx - 3, cy - 8, 6, 8);

    ctx.restore();
  };

  // Realistic Insulated Thermal Combustion Chamber with Glowing Core
  const drawRealThermalCore = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    d: number,
    h: number,
    rad: number,
    tick: number
  ) => {
    ctx.save();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const corners = [
      { x: (-w / 2) * cos - (-d / 2) * sin, y: ((-w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (-d / 2) * sin, y: ((w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (d / 2) * sin, y: ((w / 2) * sin + (d / 2) * cos) * 0.46 },
      { x: (-w / 2) * cos - (d / 2) * sin, y: ((-w / 2) * sin + (d / 2) * cos) * 0.46 },
    ];

    // Heat Core Glow Effect
    const glowPulse = 0.6 + Math.sin(tick * 0.08) * 0.2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy + h / 2, 45, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(239, 68, 68, ${glowPulse * 0.35})`;
    ctx.filter = 'blur(16px)';
    ctx.fill();
    ctx.restore();

    // Ceramic Insulation Walls (Textured terracotta / alumina)
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4;
      ctx.fillStyle = i % 2 === 0 ? '#7f1d1d' : '#991b1b';
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + corners[i].x, cy + corners[i].y);
      ctx.lineTo(cx + corners[next].x, cy + corners[next].y);
      ctx.lineTo(cx + corners[next].x, cy + corners[next].y + h);
      ctx.lineTo(cx + corners[i].x, cy + corners[i].y + h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Top Polished Pure Copper Heat Spreader Plate
    ctx.beginPath();
    ctx.moveTo(cx + corners[0].x, cy + corners[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(cx + corners[i].x, cy + corners[i].y);
    ctx.closePath();
    ctx.fillStyle = '#b45309';
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  };

  // Realistic Quad SP1848 Seebeck TEG Array
  const drawRealTEGArray = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    d: number,
    h: number,
    rad: number
  ) => {
    ctx.save();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const corners = [
      { x: (-w / 2) * cos - (-d / 2) * sin, y: ((-w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (-d / 2) * sin, y: ((w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (d / 2) * sin, y: ((w / 2) * sin + (d / 2) * cos) * 0.46 },
      { x: (-w / 2) * cos - (d / 2) * sin, y: ((-w / 2) * sin + (d / 2) * cos) * 0.46 },
    ];

    // White Alumina Ceramic Sandwich
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4;
      ctx.fillStyle = '#e2e8f0';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + corners[i].x, cy + corners[i].y);
      ctx.lineTo(cx + corners[next].x, cy + corners[next].y);
      ctx.lineTo(cx + corners[next].x, cy + corners[next].y + h);
      ctx.lineTo(cx + corners[i].x, cy + corners[i].y + h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(cx + corners[0].x, cy + corners[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(cx + corners[i].x, cy + corners[i].y);
    ctx.closePath();
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Red & Black Silicone Lead Wires
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx + corners[1].x, cy + corners[1].y + 4);
    ctx.bezierCurveTo(cx + corners[1].x + 15, cy + corners[1].y, cx + corners[1].x + 25, cy + corners[1].y + 10, cx + corners[1].x + 30, cy + corners[1].y + 20);
    ctx.stroke();

    ctx.strokeStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(cx + corners[1].x, cy + corners[1].y + 8);
    ctx.bezierCurveTo(cx + corners[1].x + 12, cy + corners[1].y + 5, cx + corners[1].x + 22, cy + corners[1].y + 15, cx + corners[1].x + 28, cy + corners[1].y + 25);
    ctx.stroke();

    ctx.restore();
  };

  // Realistic Aluminum Multi-Fin Heatsink with Copper Heatpipes
  const drawRealHeatsink = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    d: number,
    h: number,
    rad: number
  ) => {
    ctx.save();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Multi-Fin Stack (6 Parallel Extruded Fins)
    const finCount = 6;
    for (let f = 0; f < finCount; f++) {
      const fy = cy - f * 6;
      const corners = [
        { x: (-w / 2) * cos - (-d / 2) * sin, y: ((-w / 2) * sin + (-d / 2) * cos) * 0.46 },
        { x: (w / 2) * cos - (-d / 2) * sin, y: ((w / 2) * sin + (-d / 2) * cos) * 0.46 },
        { x: (w / 2) * cos - (d / 2) * sin, y: ((w / 2) * sin + (d / 2) * cos) * 0.46 },
        { x: (-w / 2) * cos - (d / 2) * sin, y: ((-w / 2) * sin + (d / 2) * cos) * 0.46 },
      ];

      ctx.beginPath();
      ctx.moveTo(cx + corners[0].x, fy + corners[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(cx + corners[i].x, fy + corners[i].y);
      ctx.closePath();
      ctx.fillStyle = f === finCount - 1 ? '#3f3f46' : '#27272a';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Sintered Copper Heatpipe Rods passing through center
    ctx.fillStyle = '#d97706';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx - 8, cy - 20, 3, 0, Math.PI * 2);
    ctx.arc(cx + 8, cy - 20, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  };

  // Realistic Arduino Uno PCB with IC Chip & Status LEDs
  const drawRealArduinoBoard = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    d: number,
    h: number,
    rad: number,
    tick: number
  ) => {
    ctx.save();
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const corners = [
      { x: (-w / 2) * cos - (-d / 2) * sin, y: ((-w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (-d / 2) * sin, y: ((w / 2) * sin + (-d / 2) * cos) * 0.46 },
      { x: (w / 2) * cos - (d / 2) * sin, y: ((w / 2) * sin + (d / 2) * cos) * 0.46 },
      { x: (-w / 2) * cos - (d / 2) * sin, y: ((-w / 2) * sin + (d / 2) * cos) * 0.46 },
    ];

    // Classic Teal-Blue Arduino PCB Base
    ctx.beginPath();
    ctx.moveTo(cx + corners[0].x, cy + corners[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(cx + corners[i].x, cy + corners[i].y);
    ctx.closePath();
    ctx.fillStyle = '#0284c7';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Black DIP ATmega328P Chip
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 10, cy - 5, 20, 8);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(cx - 10, cy - 5, 20, 8);

    // Silver USB Port Shield
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(cx - w / 2 * cos - 5, cy - d / 2 * sin * 0.46 - 4, 10, 8);

    // Blinking Status LEDs (Green ON, Orange RX/TX)
    const ledBlink = Math.sin(tick * 0.2) > 0;
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(cx + 6, cy - 8, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = ledBlink ? '#f59e0b' : '#78350f';
    ctx.beginPath();
    ctx.arc(cx + 12, cy - 8, 1.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Wire Loom Curve Helper
  const drawWireLoom = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string
  ) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1 + 10);
    const midX = (x1 + x2) / 2;
    const midY = Math.max(y1, y2) + 20;
    ctx.quadraticCurveTo(midX, midY, x2, y2 + 10);
    ctx.stroke();
    ctx.restore();
  };

  // Pneumatic Gas Tube Helper
  const drawGasTube = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string
  ) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1 + 15, y1 - 25, x2 - 15, y2 - 25, x2, y2);
    ctx.stroke();
    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    setIsAutoRotating(false);
    isAutoRotatingRef.current = false;
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartX;
    angleRef.current = (angleRef.current + delta * 0.5 + 360) % 360;
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      setIsAutoRotating(false);
      isAutoRotatingRef.current = false;
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const delta = e.touches[0].clientX - dragStartX;
    angleRef.current = (angleRef.current + delta * 0.5 + 360) % 360;
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      id="catalyst-interactive-3d-model-stage"
      className="relative w-full rounded-3xl border border-white/15 bg-black/60 p-6 lg:p-8 shadow-2xl overflow-hidden backdrop-blur-xl"
    >
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 z-10 relative">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CAD Subsystem Explorer
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Photorealistic Benchtop Rig
            </span>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white font-syne">
            CATALYST Mk-1 Core Subsystems
          </h3>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="p-1 rounded-2xl bg-black/50 border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setViewMode('cad-photo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'cad-photo'
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Real CAD Render</span>
            </button>

            <button
              onClick={() => setViewMode('3d-simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === '3d-simulator'
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Mesh Simulator</span>
            </button>
          </div>

          {viewMode === '3d-simulator' && (
            <>
              <button
                id="model-view-explode-btn"
                onClick={() => setIsExploded(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isExploded
                    ? 'bg-emerald-500 text-black font-bold shadow-sm'
                    : 'bg-white/10 text-zinc-200 hover:text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isExploded ? 'Assembled' : 'Exploded'}</span>
              </button>

              <button
                id="model-view-autorotate-btn"
                onClick={() => setIsAutoRotating(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isAutoRotating
                    ? 'bg-white text-zinc-950 font-bold'
                    : 'bg-white/10 text-zinc-200 hover:text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
                <span>{isAutoRotating ? 'Pause' : 'Auto Rotate'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Display Stage */}
      {viewMode === 'cad-photo' ? (
        <div className="relative w-full h-80 sm:h-96 md:h-[440px] rounded-2xl overflow-hidden border border-white/10 bg-black group select-none">
          <img
            src="/src/assets/images/catalyst_mk1_cad_render_1787117812674.jpg"
            alt="Photorealistic 3D CAD Render of CATALYST Mk-1 Benchtop Prototype"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Hotspots on CAD Image */}
          {HOTSPOTS.map(spot => {
            const isSelected = selectedHotspot?.id === spot.id;
            return (
              <button
                key={spot.id}
                id={`hotspot-cad-${spot.id}`}
                onClick={() => {
                  setSelectedHotspot(spot);
                  if (onSelectSubsystem) onSelectSubsystem(spot.id);
                }}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all group z-20 ${
                  isSelected
                    ? 'scale-125 ring-4 ring-emerald-400/50 bg-emerald-400 text-black shadow-lg shadow-emerald-500/50 animate-bounce'
                    : 'bg-black/80 text-white border border-white/30 hover:scale-115 shadow-xl backdrop-blur-md'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-current" />
                <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 text-white text-xs font-semibold whitespace-nowrap shadow-2xl z-30 pointer-events-none border border-white/20 backdrop-blur-md">
                  <span>{spot.name}</span>
                  <span className="text-emerald-400 font-mono font-bold">({spot.metric})</span>
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-4 left-4 text-xs font-medium text-zinc-300 pointer-events-none flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>High-Fidelity 8K CAD Render • Click pins to inspect real hardware specs</span>
          </div>
        </div>
      ) : (
        <div
          className="relative w-full h-80 sm:h-96 md:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none rounded-2xl bg-black/80 border border-white/10"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <canvas
            ref={canvasRef}
            width={720}
            height={440}
            className="w-full h-full max-w-full object-contain pointer-events-none"
          />

          {/* Clickable Hotspots overlaying the 3D Stage */}
          {HOTSPOTS.map(spot => {
            const isSelected = selectedHotspot?.id === spot.id;
            return (
              <button
                key={spot.id}
                id={`hotspot-btn-${spot.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHotspot(spot);
                  if (onSelectSubsystem) onSelectSubsystem(spot.id);
                }}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all group z-20 ${
                  isSelected
                    ? 'scale-125 ring-4 ring-emerald-400/50 bg-emerald-400 text-black shadow-lg shadow-emerald-500/40'
                    : 'bg-black/80 text-white border border-white/20 hover:scale-110 shadow'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-current" />
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black text-white text-[11px] font-medium whitespace-nowrap shadow-xl z-30 pointer-events-none border border-white/10">
                  <span>{spot.name}</span>
                  <span className="text-emerald-400 font-mono font-bold">({spot.metric})</span>
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-3 left-4 text-[11px] font-medium text-zinc-400 pointer-events-none flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Click & drag to rotate 360° • Real-time component physics & bubble flow</span>
          </div>
        </div>
      )}

      {/* Selected Component Macro Inspector Card */}
      {selectedHotspot && (
        <div
          id="hotspot-detail-inspector-card"
          className="mt-6 p-6 rounded-2xl border border-white/15 bg-black/70 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-fadeIn"
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-zinc-900">
              <img
                src={selectedHotspot.image}
                alt={selectedHotspot.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {selectedHotspot.category}
                </span>
                <DataLabelBadge label={selectedHotspot.metricType} />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white font-syne">
                {selectedHotspot.name}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-xl">
                {selectedHotspot.detail}
              </p>
              <span className="text-[11px] font-mono text-zinc-400 block">
                Hardware Specs: <strong className="text-zinc-200">{selectedHotspot.specs}</strong>
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto p-4 rounded-2xl bg-black/60 border border-white/10 flex md:flex-col items-center md:items-end justify-between gap-2">
            <span className="text-[10px] text-zinc-400 uppercase font-mono font-bold">
              Telemetry Readout
            </span>
            <span className="text-xl sm:text-2xl font-mono font-black text-emerald-400">
              {selectedHotspot.metric}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
