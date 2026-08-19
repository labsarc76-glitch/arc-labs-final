import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../lib/data/products';
import { ProductCard } from '../components/store/ProductCard';
import { Product, ProductCategory } from '../types';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ShieldCheck, 
  Sparkles, 
  SlidersHorizontal, 
  Layers, 
  ArrowUpDown 
} from 'lucide-react';

interface StorePageProps {
  onSelectProduct: (product: Product) => void;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'Flagship System', label: 'Flagship Systems' },
  { id: 'Energy Conversion', label: 'Energy Conversion' },
  { id: 'Thermoelectrics', label: 'Thermoelectrics' },
  { id: 'Electrolysis', label: 'Electrolysis' },
  { id: 'Electronics', label: 'Sensors & Interlocks' },
  { id: 'Electrical', label: 'Power & Relays' },
  { id: 'Mechanical', label: 'Chassis & Cooling' },
];

export const StorePage: React.FC<StorePageProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'Flagship System' ? product.isFlagship : product.category === selectedCategory);

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.catalystApplication && product.catalystApplication.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (a.isFlagship && !b.isFlagship) return -1;
      if (!a.isFlagship && b.isFlagship) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div id="store-page-root" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full glow-orb-blue filter blur-3xl opacity-40 -z-10 pointer-events-none" />

      {/* Header Banner */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
            A.R.C. LABS Hardware Procurement
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          Hardware & Component Catalog
        </h1>
        <p className="text-sm sm:text-base text-zinc-200 max-w-3xl leading-relaxed">
          Order benchmark hardware modules, solid-state TEGs, electrochemical reactors, and embedded safety sensors for laboratory research and prototyping.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              id="store-search-input"
              type="text"
              placeholder="Search components, specs, CATALYST roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-panel text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 border border-white/15 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sort:</span>
            </div>
            <select
              id="store-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl glass-panel text-xs font-semibold text-white bg-zinc-900/80 border border-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-pill-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/25 scale-105 font-bold'
                    : 'glass-panel text-zinc-200 hover:text-white hover:bg-white/15 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Results Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-white/15 space-y-4">
          <ShoppingBag className="w-12 h-12 text-zinc-400 mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-white font-display">
            No hardware components match your search
          </h3>
          <p className="text-xs text-zinc-300 max-w-sm mx-auto">
            Try adjusting your search query or selecting "All Items" to browse our complete inventory.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
