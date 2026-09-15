import React, { useState } from 'react';
import { STORE_STOCKISTS } from '../data/mockData';
import { Stockist } from '../types';
import { MapPin, Search, Phone, ShoppingCart, ExternalLink, CheckCircle2, Building, Store } from 'lucide-react';

interface StoreLocatorProps {
  isFullPage?: boolean;
  onSeeAll?: () => void;
  onBackHome?: () => void;
}

export const StoreLocator: React.FC<StoreLocatorProps> = ({
  isFullPage = false,
  onSeeAll,
  onBackHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  const states = ['all', 'Lagos', 'Abuja (FCT)', 'Rivers', 'Oyo', 'Ogun', 'Nationwide Delivery'];

  const filteredStockists = STORE_STOCKISTS.filter((stockist) => {
    const matchesSearch =
      stockist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stockist.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stockist.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || stockist.type === selectedType;
    const matchesState = selectedState === 'all' || stockist.state.includes(selectedState);

    return matchesSearch && matchesType && matchesState;
  });
  const displayedStockists = isFullPage ? filteredStockists : filteredStockists.slice(0, 3);

  return (
    <section id="stockists" className="py-16 sm:py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {isFullPage && onBackHome && (
            <button
              onClick={onBackHome}
              className="mb-4 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2"
            >
              &larr; Back to Home
            </button>
          )}
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase mb-2 block flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4 text-emerald-700" /> Nationwide Availability
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
            Where to Buy Sapphire Rice Flour
          </h2>
          <p className="mt-3 text-stone-600 text-base">
            Find the Sapphire 1kg pouch and bulk packs in major supermarket chains, regional open food depots, or have it delivered to your doorstep online.
          </p>
        </div>

        {/* Online Instant Delivery Strip */}
        <div className="mb-10 bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-stone-900 font-serif">
                Prefer Fast Doorstep Home Delivery?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                Order directly from our verified flagship stores on top e-commerce platforms.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => window.open('https://www.jumia.com.ng', '_blank')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-2xs flex items-center gap-2 transition-colors"
            >
              <span>Order on Jumia</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => window.open('https://www.konga.com', '_blank')}
              className="px-4 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow-2xs flex items-center gap-2 transition-colors"
            >
              <span>Order on Konga</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-2xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search supermarket, market, or city (e.g. Shoprite, Ikeja, Abuja)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 transition-all text-stone-900"
              />
            </div>

            {/* Type Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-800"
              >
                <option value="all">All Store Types</option>
                <option value="supermarket">Retail Supermarkets</option>
                <option value="wholesale">Wholesale Food Depots</option>
                <option value="online">Online Express Stores</option>
              </select>
            </div>

            {/* State Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-800"
              >
                <option value="all">All States / Regions</option>
                <option value="Lagos">Lagos State</option>
                <option value="Abuja">Abuja (FCT)</option>
                <option value="Rivers">Rivers (Port Harcourt)</option>
                <option value="Oyo">Oyo (Ibadan)</option>
                <option value="Ogun">Ogun State</option>
              </select>
            </div>

          </div>
        </div>

        {/* Stockists Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedStockists.length > 0 ? (
            displayedStockists.map((stockist) => (
              <div
                key={stockist.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 flex items-center gap-1">
                      {stockist.type === 'supermarket' ? (
                        <Store className="w-3.5 h-3.5 text-emerald-700" />
                      ) : (
                        <Building className="w-3.5 h-3.5 text-amber-700" />
                      )}
                      <span>{stockist.type}</span>
                    </span>

                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 font-serif mb-1">
                    {stockist.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800 mb-2">
                    {stockist.city} • {stockist.state}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {stockist.address}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">Packs Available:</span>
                    <div className="flex gap-1">
                      {stockist.availablePacks.map((p, idx) => (
                        <span key={idx} className="bg-stone-100 px-1.5 py-0.5 rounded font-bold text-stone-700 text-[10px]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-stone-500 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-stone-400" /> {stockist.phone}
                    </span>
                    <button
                      onClick={() => alert(`Directions for ${stockist.name} have been opened in your navigation app.`)}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2"
                    >
                      Directions &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-stone-200">
              <p className="text-sm font-semibold text-stone-700">No stockists match your search filter.</p>
              <p className="text-xs text-stone-500 mt-1">Try resetting the state or store type filter to see nationwide outlets.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                  setSelectedState('all');
                }}
                className="mt-3 px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {!isFullPage && filteredStockists.length > 0 && onSeeAll && (
          <div className="mt-8 text-center">
            <button
              onClick={onSeeAll}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
            >
              See All Stockists ({filteredStockists.length})
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
