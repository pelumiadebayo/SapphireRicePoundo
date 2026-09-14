import React, { useRef, useState } from 'react';
import { Sparkles, CheckCircle2, Clock, ShieldCheck, ArrowRight, Flame, HeartHandshake, Eye, Upload, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { useProductImage } from '../context/ProductImageContext';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onExploreProduct: () => void;
  onExploreRecipes: () => void;
  onFindRetailer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProduct, onExploreRecipes, onFindRetailer }) => {
  const { productImage, isCustom, setProductImageFromDataUrl, resetToDefault } = useProductImage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProductImageFromDataUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProductImageFromDataUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-stone-50 to-white pt-8 pb-16 lg:py-20">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-20 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Brand Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-300/60 text-xs sm:text-sm font-semibold shadow-xs">
              <BrandLogo size="sm" />
              <span>Sapphire Foods • The Rice Flour Standard</span>
              <span className="text-emerald-500 hidden sm:inline">|</span>
              <span className="text-emerald-800 font-bold hidden sm:inline">100% Gluten-Free</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15] font-serif">
              Silky Smooth Swallow.{' '}
              <span className="text-emerald-800 italic block mt-1">Guaranteed Lump-Free.</span>
            </h1>

            {/* Value Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Meet <strong className="text-stone-900 font-semibold">Sapphire Rice Flour Mix (1kg)</strong> — crafted from select sun-ripened river basin paddies and cool-milled to an ultra-fine micronized texture. Specially formulated to make its own signature Sapphire Rice Swallow: velvety, lump-free, and delightfully light to pair with Egusi, Efo Riro, Ogbono, Afang, and all your favorite soups.
            </p>

            {/* Quick Benefits Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-stone-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-semibold text-stone-800">Zero Lumps Always</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-stone-200/80 shadow-2xs">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-semibold text-stone-800">Ready in 10 Mins</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-lg border border-stone-200/80 shadow-2xs col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-semibold text-stone-800">100% Pure Grains</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onExploreProduct}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                id="hero-explore-pack-btn"
              >
                <span>Explore 1kg Pack Details</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
              <button
                onClick={onExploreRecipes}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-emerald-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl shadow-xs transition-colors"
                id="hero-view-recipes-btn"
              >
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Soup Pairing Recipes</span>
              </button>
              <button
                onClick={onFindRetailer}
                className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-semibold text-stone-700 hover:text-emerald-800 py-2.5 px-3 transition-colors"
                id="hero-find-stores-link"
              >
                <span>Find in Supermarkets &rarr;</span>
              </button>
            </div>

            {/* Social Trust Line */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-500">
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-emerald-700 text-white text-[10px] font-bold text-center leading-6">★</span>
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-amber-600 text-white text-[10px] font-bold text-center leading-6">★</span>
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-emerald-800 text-white text-[10px] font-bold text-center leading-6">★</span>
              </div>
              <p>
                <strong className="text-stone-800 font-semibold">50,000+ meals cooked</strong> across homes, caterers, and food service partners.
              </p>
            </div>
          </div>

          {/* Right Column: Hero Product Packshot Presentation */}
          <div className="order-first lg:order-none lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md">
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 via-amber-300/20 to-emerald-200/10 rounded-3xl blur-2xl transform scale-95 -z-10" />

              {/* Main Product Card Container */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`bg-gradient-to-b from-emerald-900/5 via-white to-white p-6 rounded-3xl border shadow-xl relative overflow-visible group transition-all ${
                  isDragging ? 'border-emerald-500 ring-4 ring-emerald-200' : 'border-emerald-200/60'
                }`}
              >
                {/* Photo Source Bar */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span className="text-[11px] font-semibold text-stone-600">
                      {isCustom ? 'Authentic Product Photo' : 'Sapphire Rice Flour (1kg)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCustom && (
                      <button
                        onClick={resetToDefault}
                        title="Reset to default placeholder"
                        className="text-[10px] text-stone-400 hover:text-stone-700 flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isCustom ? 'Change Photo' : 'Upload Product Photo'}</span>
                    </button>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {/* Pack Image Container */}
                <div className="relative flex items-center justify-center py-4 min-h-[360px]">
                  <img
                    src={productImage}
                    alt="Sapphire Foods Rice Flour Mix 1kg Packaging Pouch"
                    className="w-72 sm:w-80 h-auto max-h-[480px] object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Floating Badge 0: Official Seal */}
                  <div className="absolute top-4 left-2 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-xl shadow-lg border border-emerald-100 flex items-center gap-2">
                    <BrandLogo size="sm" />
                    <div className="text-left">
                      <p className="text-[9px] text-stone-400 uppercase tracking-wider font-semibold">Official Seal</p>
                      <p className="text-[11px] font-bold text-emerald-900">Sapphire Brand</p>
                    </div>
                  </div>

                  {/* Floating Badge 1: Net Wt 1kg */}
                  <div className="absolute top-4 right-2 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl shadow-lg border border-emerald-100 flex items-center gap-2 animate-bounce-slow">
                    <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                      1kg
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Net Weight</p>
                      <p className="text-xs font-bold text-stone-900">Family Size</p>
                    </div>
                  </div>

                  {/* Floating Badge 2: Sapphire Swallow Serving */}
                  <div className="absolute bottom-6 left-2 bg-white/95 backdrop-blur-xs px-3.5 py-2.5 rounded-xl shadow-lg border border-stone-200 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-bold">
                      🍲
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider">Perfect Swallow</p>
                      <p className="text-xs font-bold text-stone-900">Sapphire Rice Swallow</p>
                    </div>
                  </div>
                </div>

                {/* Pack Feature Badges Under Image */}
                <div className="mt-2 pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50/80 border border-emerald-100">
                    <span className="block font-bold text-emerald-900 text-sm">100%</span>
                    <span className="text-[10px] text-emerald-700 font-medium">Pure Rice</span>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-100">
                    <span className="block font-bold text-amber-900 text-sm">12 Mins</span>
                    <span className="text-[10px] text-amber-700 font-medium">Cook Time</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="block font-bold text-stone-800 text-sm">0g Lumps</span>
                    <span className="text-[10px] text-stone-600 font-medium">Micro-Milled</span>
                  </div>
                </div>

                {/* Inspect Button */}
                <button
                  onClick={onExploreProduct}
                  className="mt-3 w-full py-2 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Pack Details & Nutrition Breakdown</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
