import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    tax, 
    shipping, 
    total, 
    isCartOpen, 
    setIsCartOpen,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-content"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#131b18] text-white h-full shadow-2xl border-l border-white/15 flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white font-display">
              Hardware Cart ({items.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            id="cart-drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-zinc-400 border border-white/10">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-white">
                Your cart is empty
              </p>
              <p className="text-xs text-zinc-300 max-w-xs mx-auto">
                Explore the A.R.C. LABS store catalog to order experimental hardware, kits, and lab components.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <span className="text-zinc-300">Selected Components</span>
                <button
                  onClick={clearCart}
                  className="text-xs text-red-400 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  id={`cart-drawer-item-${product.id}`}
                  className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex gap-3 items-center"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate font-display">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-zinc-300 font-mono block">
                      ₹{product.price.toLocaleString('en-IN')} each
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-white/20 rounded-lg bg-black/50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 text-xs text-zinc-300 hover:text-white hover:bg-white/10"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 text-xs text-zinc-300 hover:text-white hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-1 rounded text-zinc-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold font-mono text-white">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-black/40 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>Subtotal:</span>
                <span className="font-mono text-white">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Laboratory GST (18%):</span>
                <span className="font-mono text-white">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Lab Freight & Packaging:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold">
                <span className="text-white">Total Order Value:</span>
                <span className="font-mono text-base text-emerald-400">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              id="cart-drawer-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Bank Wire / UPI Dispatch</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
