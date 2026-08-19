import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Order, OrderCustomer } from '../../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Building2, 
  FileCheck,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    items, 
    subtotal, 
    tax, 
    shipping, 
    total, 
    placeOrder 
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'Lab Invoice'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const [customer, setCustomer] = useState<OrderCustomer>({
    name: '',
    email: '',
    phone: '',
    institution: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customer.name.trim()) errs.name = 'Full name is required';
    if (!customer.email.trim() || !customer.email.includes('@')) errs.email = 'Valid email is required';
    if (!customer.phone.trim() || customer.phone.length < 8) errs.phone = 'Valid phone number is required';
    if (!customer.address.trim()) errs.address = 'Delivery address is required';
    if (!customer.city.trim()) errs.city = 'City is required';
    if (!customer.postalCode.trim()) errs.postalCode = 'Postal PIN code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const order = await placeOrder(customer, paymentMethod);
      setCompletedOrder(order);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti effect', err);
      }
    } catch (err) {
      console.error('Order placement error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
    >
      <div
        id="checkout-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl border border-white/20 bg-[#131b18] text-white shadow-2xl overflow-hidden my-8 animate-fadeIn"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {completedOrder ? 'Order Confirmed' : 'A.R.C. LABS Hardware Checkout'}
              </h3>
              <p className="text-xs text-zinc-300">
                {completedOrder ? 'Logged in dispatch system' : 'Fixed website lab rates & verified dispatch'}
              </p>
            </div>
          </div>
          <button
            id="checkout-close-btn"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Order Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                Order Logged & Authenticated
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Thank you, {completedOrder.customer.name}!
              </h2>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Your order reference is <span className="font-mono font-bold text-emerald-400">{completedOrder.orderNumber}</span>. A dispatch confirmation has been routed to the A.R.C. LABS fulfillment queue.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between font-medium">
                <span className="text-zinc-400">Items Ordered:</span>
                <span className="text-white">{completedOrder.items.length} SKUs</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-zinc-400">Total Value:</span>
                <span className="font-mono font-bold text-emerald-400">₹{completedOrder.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-zinc-400">Payment Channel:</span>
                <span className="font-mono text-zinc-200">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-zinc-400">Shipping To:</span>
                <span className="text-zinc-200 truncate max-w-[200px]">{completedOrder.customer.city}, {completedOrder.customer.postalCode}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                id="checkout-complete-done-btn"
                onClick={handleClose}
                className="py-3 px-8 rounded-xl font-bold text-sm bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl transition-all"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer & Shipping Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  1. Shipping & Contact Details
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-200 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      placeholder="e.g. Dr. Aryan Sharma"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/40 text-sm text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-0.5">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-200 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        required
                        placeholder="you@lab.edu"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/40 text-sm text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-200 mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/40 text-sm text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-200 mb-1">
                      Academic Lab / Institution (Optional)
                    </label>
                    <input
                      id="checkout-institution"
                      type="text"
                      placeholder="e.g. Dept of Physics, IIT Bombay"
                      value={customer.institution}
                      onChange={(e) => setCustomer({ ...customer, institution: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/40 text-sm text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-200 mb-1">
                      Shipping Street Address *
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      required
                      placeholder="Room 402, Engineering Block B..."
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/40 text-sm text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-200 mb-1">City *</label>
                      <input
                        id="checkout-city"
                        type="text"
                        required
                        placeholder="Mumbai"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full px-2.5 py-2 rounded-xl border border-white/15 bg-black/40 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-200 mb-1">State</label>
                      <input
                        id="checkout-state"
                        type="text"
                        placeholder="Maharashtra"
                        value={customer.state}
                        onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                        className="w-full px-2.5 py-2 rounded-xl border border-white/15 bg-black/40 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-200 mb-1">PIN Code *</label>
                      <input
                        id="checkout-pin"
                        type="text"
                        required
                        placeholder="400076"
                        value={customer.postalCode}
                        onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                        className="w-full px-2.5 py-2 rounded-xl border border-white/15 bg-black/40 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment & Order Summary */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  2. Payment Method
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'UPI', label: 'UPI / QR Code', icon: QrCode },
                    { id: 'Card', label: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'NetBanking', label: 'Direct Bank Wire', icon: Building2 },
                    { id: 'Lab Invoice', label: 'Institutional Invoice', icon: FileCheck },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-500/20 text-white font-bold ring-2 ring-emerald-400/40'
                            : 'border-white/10 bg-black/40 text-zinc-300 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-zinc-400'}`} />
                        <span className="text-xs">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Items Mini-Summary */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
                  <span className="font-bold text-white block">Order Summary</span>
                  <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex justify-between text-[11px] text-zinc-300">
                        <span className="truncate max-w-[170px]">{quantity}x {product.name}</span>
                        <span className="font-mono text-white">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal:</span>
                      <span className="font-mono text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>GST (18%):</span>
                      <span className="font-mono text-white">₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Lab Freight:</span>
                      <span className="font-mono text-emerald-400 font-bold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-white pt-1">
                      <span>Total:</span>
                      <span className="font-mono text-base text-emerald-400">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <button
                  id="checkout-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isSubmitting ? 'Authenticating Order...' : `Confirm & Order (₹${total.toLocaleString('en-IN')})`}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
