export type DataLabelType = 'MEASURED' | 'CALCULATED' | 'ESTIMATED' | 'THEORETICAL';

export interface DataMetricValue {
  label: string;
  value: string | number;
  unit?: string;
  type: DataLabelType;
  description?: string;
}

export type ProductAvailability = 'available' | 'coming-soon' | 'discontinued';
export type ProductCategory = 
  | 'Flagship Modules'
  | 'Energy System'
  | 'TEG System'
  | 'Electrolysis System'
  | 'Smart Monitoring / Electronics'
  | 'Electrical & Control Parts'
  | 'Mechanical & Thermal Parts';

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription?: string;
  price: number;
  currency: 'INR';
  category: ProductCategory;
  compatibility?: string;
  images: string[];
  imageSource: 'ai-render' | 'photo' | 'cad-schematic';
  availability: ProductAvailability;
  stock: number | null;
  catalystApplication?: string;
  quantityInCatalyst?: string;
  specifications: Record<string, string>;
  features: string[];
  includedItems?: string[];
  safetyWarning?: string;
  documentationUrl?: string;
  isFlagship?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Accepted' | 'In Waiting' | 'Dispatched' | 'Completed' | 'Cancelled';

export interface OrderCustomer {
  name: string;
  fullName?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  institution?: string;
  organization?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: OrderCustomer;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    category: ProductCategory;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: 'INR';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Lab Invoice' | 'Test Mode';
  paymentStatus: 'Paid (Simulated)' | 'Pending Verification' | 'Direct Transfer';
  status: OrderStatus;
  notes?: string;
}

export type InquiryRoute = 
  | 'General' 
  | 'Project Collaboration' 
  | 'Product Support' 
  | 'Research Collaboration' 
  | 'Business';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryRoute: InquiryRoute;
  createdAt: string;
  routedTo: string;
  status: 'New' | 'Replied' | 'Archived';
  aiDraftResponse?: string;
}

export interface SubsystemComponent {
  id: string;
  name: string;
  category: string;
  role: string;
  specs: string;
  metric?: DataMetricValue;
  lossFactor?: string;
  safetyNote?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  classification: string;
  status: 'Prototype Stage' | 'In Development' | 'Concept Phase';
  description: string;
  scientificPrinciple: string;
  energyFlow: {
    step: number;
    title: string;
    from: string;
    to: string;
    efficiencyEstimate: string;
    description: string;
    metricLabel: DataLabelType;
  }[];
  subsystems: SubsystemComponent[];
  prototypeMetrics: DataMetricValue[];
  challenges: {
    title: string;
    description: string;
    mitigation: string;
  }[];
  lessonsLearned: {
    number: number;
    lesson: string;
    insight: string;
  }[];
}

export interface ResearchArea {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  currentScope: string;
  futureScope: string;
  relatedProjects: string[];
  iconName: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: string;
  bio?: string;
  areasOfInterest: string[];
  photoUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
  relatedProject?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
}
