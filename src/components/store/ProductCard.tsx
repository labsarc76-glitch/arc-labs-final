import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Eye, Zap, ShieldAlert, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addItem, setIsCheckoutOpen } = useCart();

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group relative rounded-3xl glass-panel glass-panel-hover p-5 sm:p-6 flex flex-col justify-between cursor-pointer border border-white/15 shadow-xl"
    >
      <div className="space-y-4">
        {/* Top Badges & Product Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {product.isFlagship ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-black shadow-lg shadow-emerald-500/30">
                Flagship Module
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-black/75 text-white backdrop-blur-md border border-white/20">
                {product.category}
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-medium bg-black/75 text-zinc-200 backdrop-blur-md border border-white/10">
              {product.imageSource === 'ai-render' ? 'AI Render' : 'Lab Photo'}
            </span>
          </div>
        </div>

        {/* Product Title & Descriptions */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-white font-display group-hover:text-emerald-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Application in CATALYST Mk-1 */}
        {product.catalystApplication && (
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-[11px] text-zinc-300 space-y-0.5">
            <span className="font-semibold text-emerald-400 block">
              CATALYST Mk-1 Role:
            </span>
            <p className="line-clamp-1 text-zinc-300">{product.catalystApplication}</p>
          </div>
        )}

        {/* Specs Highlights */}
        {product.specifications && (
          <div className="flex flex-wrap gap-1 pt-1">
            {Object.entries(product.specifications).slice(0, 3).map(([key, val]) => (
              <span
                key={key}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-200 border border-white/10"
              >
                {key}: <strong className="text-white">{val}</strong>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pricing and Action Buttons */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
            Laboratory Rate
          </span>
          <div className="text-lg sm:text-xl font-extrabold font-mono text-white">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleAddToCart}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30 transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          <button
            id={`order-now-btn-${product.id}`}
            onClick={handleOrderNow}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1 hover:scale-105"
          >
            <span>Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
