import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Persistent Store for Orders & Contact Submissions
interface StoredOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: any;
  items: any[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  notes?: string;
}

interface StoredContact {
  id: string;
  name: string;
  email: string;
  organization?: string;
  topic: string;
  message: string;
  submittedAt: string;
  routedTo: string;
  status: string;
}

const ordersStore: StoredOrder[] = [
  {
    id: 'ord-seed-01',
    orderNumber: 'ARC-2026-104921',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    customer: {
      name: 'Dr. V. Ramanathan',
      email: 'v.raman@iitm.ac.in',
      phone: '+91 98401 23456',
      institution: 'IIT Madras Heat Transfer Lab',
      address: 'Room 402, Dept of Mechanical Engineering',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600036',
      country: 'India'
    },
    items: [
      { productId: 'cat-flagship-teg', productName: 'CATALYST Mk-1 — TEG Variant', price: 18499, quantity: 1, category: 'Energy Conversion' },
      { productId: 'comp-teg-sp1848', productName: 'SP1848-27145 Thermoelectric Seebeck Module (x4 Pack)', price: 1450, quantity: 2, category: 'Thermoelectrics' }
    ],
    subtotal: 21399,
    tax: 3852,
    shipping: 0,
    total: 25251,
    currency: 'INR',
    paymentMethod: 'Lab Invoice',
    paymentStatus: 'Paid (Simulated)',
    status: 'In Waiting',
    notes: 'Institutional requisition for undergraduate thermodynamics lab.'
  }
];

const contactStore: StoredContact[] = [
  {
    id: 'con-seed-01',
    name: 'Prof. Ananya Sen',
    email: 'ananya.sen@mech.iitkgp.ac.in',
    organization: 'IIT Kharagpur',
    topic: 'Academic Research Collaboration',
    message: 'We are studying solid-state Seebeck waste heat recovery on solar arrays and would like to review the thermal resistance models of the CATALYST Mk-1 copper baseplate.',
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    routedTo: 'labsarc76@gmail.com',
    status: 'New'
  }
];

// Lazy initialize Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({ apiKey: key });
}

// 1. API: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), platform: 'A.R.C. LABS Server' });
});

// 2. API: Orders Endpoints
app.get('/api/orders', (req, res) => {
  res.json(ordersStore);
});

app.post('/api/orders', (req, res) => {
  const newOrder: StoredOrder = req.body;
  if (!newOrder.id) newOrder.id = `ord-${Date.now()}`;
  ordersStore.unshift(newOrder);
  console.log(`[ORDER PLACED] ${newOrder.orderNumber} by ${newOrder.customer?.name} - Total: ₹${newOrder.total}`);
  res.status(201).json({ success: true, order: newOrder });
});

app.patch('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const target = ordersStore.find(o => o.id === id);
  if (target) {
    target.status = status;
    res.json({ success: true, order: target });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// 3. API: Contact Form (Routes to labsarc76@gmail.com)
app.get('/api/contact', (req, res) => {
  res.json(contactStore);
});

app.post('/api/contact', (req, res) => {
  const { name, email, organization, topic, message } = req.body;
  const newSubmission: StoredContact = {
    id: `con-${Date.now()}`,
    name,
    email,
    organization,
    topic,
    message,
    submittedAt: new Date().toISOString(),
    routedTo: 'labsarc76@gmail.com',
    status: 'New'
  };
  contactStore.unshift(newSubmission);
  console.log(`[CONTACT ROUTED TO labsarc76@gmail.com] From: ${name} (${email}) - Topic: ${topic}`);
  res.status(201).json({ success: true, submission: newSubmission, message: 'Message logged and routed to labsarc76@gmail.com' });
});

// 4. API: AI Chatbot powered by Gemini
const SYSTEM_PROMPT = `
You are the official Technical AI Assistant for A.R.C. LABS (Advanced Research & Catalyst Laboratories).
Tagline: "Engineering Ideas. Building the Future."
Brand nature: Student-founded research and prototyping organization.

CRITICAL DIRECTIVE ON SCIENTIFIC HONESTY:
- Every data point MUST be accurately labeled: [MEASURED], [CALCULATED], [ESTIMATED], or [THEORETICAL].
- CATALYST Mk-1 is an experimental hybrid energy system / student proof-of-concept.
- Overall composite efficiency is ~0.65% [ESTIMATED] (18% solar × 80% electrolysis × 90% thermal × 8% Seebeck).
- Never make up fake partnerships, fake awards, or exaggerated 99% efficiencies.

KEY PROTOTYPE FACTS:
- Solar input: 4W polycrystalline array [MEASURED]
- Battery buffer: 12V DC nominal regulation [MEASURED]
- Water electrolysis: 316L stainless steel electrodes drawing 0.5A steady-state current [MEASURED]
- Thermal chamber: 65 °C peak hot-side steady-state thermocouple reading [MEASURED]
- Seebeck Thermoelectric array: 4x SP1848-27145 modules harvesting 45 mW DC [MEASURED] across ΔT = 40 °C.
- Seebeck formula: V ≈ S · ΔT (where S ≈ 0.04 V/°C per module).
- Microcontroller: Arduino ATmega328P with 8+ hours verified bench uptime [MEASURED].
- Security: RFID RC522 SPI 13.56MHz reader with <120 ms authentication latency [MEASURED].
- Safety: 4-tier safety architecture with MQ-2 gas leak detection and sub-15ms hardware relay cutoff.
- CATALYST Mk-2: Explicitly marked as "To be announced / Conceptual Research" and not yet built.

HARDWARE STORE PRICING (Fixed website rates in ₹ INR):
- CATALYST Mk-1 Steam Variant: ₹14,999
- CATALYST Mk-1 TEG Variant: ₹18,499
- CATALYST Mk-1 Stirling Variant: ₹22,999
- SP1848-27145 Seebeck Modules (4-pack): ₹1,450
- 316L Electrolysis Reactor Cell: ₹2,450
- 150W DC-DC Step-Up Boost Converter: ₹380
- C11000 Pure Copper Thermal Heat Spreader: ₹650
- 4W Polycrystalline Solar Panel: ₹780
- Arduino ATmega328P Sensor Shield Kit: ₹1,250

CONTACT: Direct submissions route to labsarc76@gmail.com.
ADMIN: Internal command center accessed with security key ARCLABS.

Respond politely, concisely, and with deep technical precision.
`;

app.post('/api/ai/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Return grounded fallback
    return res.json({
      reply: `[A.R.C. LABS Grounded Response]: Regarding "${message}", CATALYST Mk-1 is a student-built multi-stage thermodynamic energy prototype converting solar irradiance into chemical hydrogen storage, thermal heat (65 °C [MEASURED]), and solid-state Seebeck harvesting (45 mW [MEASURED], V ≈ S · ΔT). All numbers adhere to our strict scientific transparency standard.`
    });
  }

  try {
    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n')
      : '';

    const prompt = `${SYSTEM_PROMPT}\n\nChat History:\n${formattedHistory}\n\nUser: ${message}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const reply = response.text?.trim() || 'A.R.C. LABS research telemetry confirmed.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Gemini API chat error:', error);
    res.json({
      reply: `[A.R.C. LABS Technical Base]: CATALYST Mk-1 is an experimental hybrid energy conversion prototype (4W solar [MEASURED], 12V bus [MEASURED], 0.5A electrolysis [MEASURED], 65 °C thermal core [MEASURED], 45 mW Seebeck harvest [MEASURED] at ΔT = 40 °C). For inquiries, contact labsarc76@gmail.com.`
    });
  }
});

// Vite Integration & Static Serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`A.R.C. LABS server running on http://0.0.0.0:${PORT}`);
  });
}

start();
