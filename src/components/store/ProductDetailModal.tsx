import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  ShoppingBag, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addItem, setIsCheckoutOpen } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleOrderNow = () => {
    addItem(product, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl border border-white/20 bg-[#131b18] text-white shadow-2xl overflow-hidden my-8 animate-fadeIn"
      >
        {/* Close Button */}
        <button
          id="product-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors border border-white/15"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/15 relative">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white backdrop-blur-sm border border-white/10">
                {product.imageSource === 'ai-render' ? 'AI Realistic Hardware Render' : 'Laboratory Photo'}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    id={`thumb-img-${idx}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx ? 'border-emerald-400 ring-2 ring-emerald-400/40' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* In-Stock & Transparency Notice */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2 font-bold text-white">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Laboratory Stock & Verification Status</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Every unit is calibrated on benchtop rigs and packaged with calibration test sheets and pinout diagrams.
              </p>
            </div>
          </div>

          {/* Right Column: Specs, Role, Pricing, and Cart Controls */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  {product.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
                  {product.name}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                {product.fullDescription}
              </p>

              {/* Role in CATALYST Mk-1 */}
              {product.catalystApplication && (
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 block">
                    CATALYST Mk-1 Role & Function:
                  </span>
                  <p className="text-xs text-zinc-200">
                    {product.catalystApplication}
                  </p>
                </div>
              )}

              {/* Technical Specifications */}
              {product.specifications && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-display">
                    Hardware Specifications
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div
                        key={key}
                        className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-xs"
                      >
                        <span className="text-[10px] text-zinc-400 block uppercase font-mono">{key}</span>
                        <strong className="text-xs font-mono text-white">{val}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Buy Actions */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                    Fixed Price (Inclusive of Taxes)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-300 font-semibold">Qty:</span>
                  <div className="flex items-center border border-white/20 rounded-xl bg-black/40 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-mono font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  id="modal-order-now-btn"
                  onClick={handleOrderNow}
                  className="py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
