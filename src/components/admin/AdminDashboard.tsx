import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Order, ContactSubmission } from '../../types';
import { 
  ShieldCheck, 
  Lock, 
  Package, 
  Mail, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  Layers, 
  LogOut, 
  Key, 
  Send,
  Eye,
  RefreshCw,
  Search
} from 'lucide-react';
import { PRODUCTS } from '../../lib/data/products';

export const AdminDashboard: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { orders, updateOrderStatus } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries' | 'inventory'>('orders');

  const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch inquiries from backend
  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setInquiries(data);
      })
      .catch(() => {
        // Fallback mock initial inquiry if server empty
        setInquiries([
          {
            id: 'inq-initial-01',
            name: 'Dr. Ramesh K.',
            email: 'ramesh.k@iitd.ac.in',
            topic: 'Academic Collaboration',
            message: 'Inquiring about acquiring the CATALYST Mk-1 TEG variant for thermodynamic laboratory demonstration.',
            submittedAt: new Date().toISOString(),
            routedTo: 'labsarc76@gmail.com',
            status: 'New'
          }
        ]);
      });
  }, []);

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <div id="admin-dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn text-white">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#131b18] border border-white/15 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow p-0.5 shrink-0">
            <img
              src="/logo.jpg"
              alt="A.R.C. LABS Official Logo"
              className="w-full h-full object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-mono">
                A.R.C. LABS Command Center
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Authorized Session
              </span>
            </div>
            <p className="text-xs text-zinc-300">
              Orders Queue • Inquiries to <code className="text-emerald-400 font-bold">labsarc76@gmail.com</code> • Hardware Dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="admin-exit-btn"
            onClick={onExit}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/10"
          >
            View Public Site
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#131b18] border border-white/15 space-y-1">
          <span className="text-xs font-semibold text-zinc-300">Total Store Revenue</span>
          <div className="text-2xl font-extrabold font-mono text-white">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium font-mono">
            From {orders.length} registered orders
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131b18] border border-white/15 space-y-1">
          <span className="text-xs font-semibold text-zinc-300">Pending Orders</span>
          <div className="text-2xl font-extrabold font-mono text-amber-400">
            {pendingOrders}
          </div>
          <span className="text-[11px] text-zinc-400">Awaiting laboratory packaging</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131b18] border border-white/15 space-y-1">
          <span className="text-xs font-semibold text-zinc-300">Active Inquiries</span>
          <div className="text-2xl font-extrabold font-mono text-white">
            {inquiries.length}
          </div>
          <span className="text-[11px] text-zinc-400">Routed to labsarc76@gmail.com</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131b18] border border-white/15 space-y-1">
          <span className="text-xs font-semibold text-zinc-300">Active Catalog SKUs</span>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            {PRODUCTS.length}
          </div>
          <span className="text-[11px] text-zinc-400">3 Flagships + 12 Components</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'orders', label: `Orders Queue (${orders.length})`, icon: Package },
          { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Mail },
          { id: 'inventory', label: 'Inventory & Rates', icon: Layers },
        ].map(tab => {
          const Icon = tab.icon;
          const isAct = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isAct
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-[#131b18] border border-white/15 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white font-display">
                Customer Hardware Orders
              </h3>
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by order #, name, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-white/15 bg-black/50 text-xs text-white placeholder-zinc-500 w-64 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 text-xs">
                No orders placed yet. Place an order through the Hardware Store to test live synchronization.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider font-semibold">
                      <th className="pb-3 pl-2">Order #</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Total</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders
                      .filter(o => 
                        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (o.customer.name || o.customer.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        o.customer.city.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((ord) => (
                        <tr key={ord.id} className="hover:bg-white/5">
                          <td className="py-3.5 pl-2 font-mono font-bold text-emerald-400">
                            {ord.orderNumber}
                          </td>
                          <td className="py-3.5">
                            <div className="font-semibold text-white">{ord.customer.name || ord.customer.fullName || 'Customer'}</div>
                            <div className="text-zinc-400 text-[11px]">{ord.customer.city}, {ord.customer.phone}</div>
                          </td>
                          <td className="py-3.5">
                            <span className="font-medium text-zinc-200">
                              {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                            </span>
                          </td>
                          <td className="py-3.5 font-mono font-bold text-white">
                            ₹{ord.total.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-zinc-200 border border-white/10">
                              {ord.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3.5">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/60 border border-white/20 text-white cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Waiting">In Waiting</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 text-right pr-2">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
                              title="Inspect Order"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inquiries Tab Content */}
      {activeTab === 'inquiries' && (
        <div className="p-6 rounded-3xl bg-[#131b18] border border-white/15 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Contact Inquiries Routed to labsarc76@gmail.com
              </h3>
              <p className="text-xs text-zinc-300">
                All form submissions are automatically logged and forwarded to the central laboratory inbox
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{inq.name}</span>
                    <span className="text-xs font-mono text-zinc-400">({inq.email})</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    {inq.topic}
                  </span>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed bg-black/60 p-3 rounded-xl border border-white/10">
                  {inq.message}
                </p>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
                  <span>Logged: {new Date(inq.submittedAt).toLocaleString()}</span>
                  <span className="font-mono text-emerald-400">Routed to: {inq.routedTo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory & Rates Tab */}
      {activeTab === 'inventory' && (
        <div className="p-6 rounded-3xl bg-[#131b18] border border-white/15 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white font-display">
            Catalog Inventory & Fixed Rates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map(p => (
              <div key={p.id} className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                  <span className="font-mono font-bold text-sm text-emerald-400">₹{p.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Stock: {p.stock} units</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-zinc-300 font-mono">{p.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
