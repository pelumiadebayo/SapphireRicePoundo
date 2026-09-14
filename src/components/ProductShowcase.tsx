import React, { useState, useRef } from 'react';
import { PRODUCT_PACKS, NUTRITION_FACTS } from '../data/mockData';
import { Check, Sparkles, ChefHat, Package, Flame, Clock, Info, ArrowRight, Upload, RefreshCw } from 'lucide-react';
import { useProductImage } from '../context/ProductImageContext';

interface ProductShowcaseProps {
  onGoToRecipes: () => void;
  onOpenDistributor: () => void;
  onFindRetailer: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onGoToRecipes,
  onOpenDistributor,
  onFindRetailer,
}) => {
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

  const [selectedPackId, setSelectedPackId] = useState('pack-1kg');
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'prepGuide'>('overview');
  const [activePrepStep, setActivePrepStep] = useState(1);

  const selectedPack = PRODUCT_PACKS.find((p) => p.id === selectedPackId) || PRODUCT_PACKS[0];

  const prepSteps = [
    {
      step: 1,
      title: 'Blend the Cold Slurry',
      time: '1 Min',
      description: 'Measure 1 cup of Sapphire Rice Flour into a bowl with 1 cup of cold water. Stir with a whisk or spoon until completely runny and silky.',
      secret: 'Never dump dry flour straight into boiling water — cold slurry guarantees zero lumps.',
      badge: 'Golden Rule',
    },
    {
      step: 2,
      title: 'Boil & Introduce Slurry',
      time: '3 Mins',
      description: 'Bring 2.5 cups of water to a vigorous boil. Slowly pour in the cold slurry while stirring continuously on medium flame.',
      secret: 'The water will quickly turn into a translucent, velvety custard base.',
      badge: 'Base Thickening',
    },
    {
      step: 3,
      title: 'Fold Remaining Flour',
      time: '4 Mins',
      description: 'Gradually add the remaining 1 cup of Sapphire Rice Flour while turning and pressing firmly against the pot wall with a wooden turning stick (omorogun / muçiya).',
      secret: 'The swallow will form an elastic, pliable ball that pulls cleanly from the pot.',
      badge: 'Turning & Structure',
    },
    {
      step: 4,
      title: 'Steam & Shape',
      time: '4 Mins',
      description: 'Splash 2 tablespoons of warm water, cover the pot tightly, and steam on low heat for 4 minutes. Turn once more, portion, and roll into smooth mounds.',
      secret: 'Resting for 3 minutes before serving locks in the soft, pillow-like bounce.',
      badge: 'Final Perfection',
    },
  ];

  return (
    <section id="product" className="py-16 sm:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> The Sapphire Range
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
            Sapphire Rice Flour Mix (1kg)
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Engineered for African household kitchens, commercial caterers, and gluten-free bakers who refuse to compromise on texture, hygiene, and authentic taste.
          </p>
        </div>

        {/* Main Product Showcase Box */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden mb-12">
          
          {/* Top Sub-Navigation Tabs */}
          <div className="border-b border-stone-200 bg-stone-50/70 px-4 sm:px-8 flex items-center gap-2 sm:gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'border-emerald-700 text-emerald-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Pack Specifications & Features</span>
            </button>

            <button
              onClick={() => setActiveTab('nutrition')}
              className={`py-4 px-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'nutrition'
                  ? 'border-emerald-700 text-emerald-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Nutritional Facts Panel</span>
            </button>

            <button
              onClick={() => setActiveTab('prepGuide')}
              className={`py-4 px-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'prepGuide'
                  ? 'border-emerald-700 text-emerald-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span>12-Min Lump-Free Swallow Masterclass</span>
            </button>
          </div>

          {/* Tab 1: Overview & Pack Selection */}
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Pack Image with Callout Annotations */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`lg:col-span-6 flex flex-col items-center justify-center relative bg-emerald-50/40 rounded-2xl p-6 border transition-all ${
                    isDragging ? 'border-emerald-500 ring-4 ring-emerald-200' : 'border-emerald-100'
                  }`}
                >
                  {/* Photo bar */}
                  <div className="w-full flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-stone-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      {isCustom ? 'Authentic Product Pack' : '1kg Flagship Pouch'}
                    </span>
                    <div className="flex items-center gap-2">
                      {isCustom && (
                        <button
                          onClick={resetToDefault}
                          className="text-[10px] text-stone-400 hover:text-stone-700 flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[11px] font-bold text-emerald-800 bg-white hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs flex items-center gap-1.5 transition-colors"
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

                  <div className="relative group">
                    <img
                      src={productImage}
                      alt="Sapphire Foods Rice Flour Mix 1kg"
                      className="w-72 sm:w-80 h-auto object-contain drop-shadow-xl transition-transform group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />

                    {/* Interactive Annotation 1: Raw Rice Window */}
                    <div className="hidden sm:block absolute left-2 top-1/3 bg-white/95 border border-emerald-200 rounded-lg p-2 shadow-md max-w-[150px] text-left pointer-events-none">
                      <p className="text-[10px] font-bold text-emerald-800">Clear Window</p>
                      <p className="text-[10px] text-stone-600">Inspect the pure white whole rice grains before milling.</p>
                    </div>

                    {/* Interactive Annotation 2: Tuwo Swallow Serving */}
                    <div className="hidden sm:block absolute right-2 bottom-1/4 bg-white/95 border border-emerald-200 rounded-lg p-2 shadow-md max-w-[150px] text-left pointer-events-none">
                      <p className="text-[10px] font-bold text-emerald-800">Tuwo Shinkafa</p>
                      <p className="text-[10px] text-stone-600">Ready in 12 mins with rich savory stew.</p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 mt-4 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-emerald-600" />
                    Hermetically sealed multi-layer moisture barrier pouch
                  </p>
                </div>

                {/* Right: Pack Details & Selector */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      {selectedPack.tagline}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mt-1">
                      {selectedPack.name}
                    </h3>
                    <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
                      {selectedPack.description}
                    </p>
                  </div>

                  {/* Size Switcher Pills */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                      Available Pack Sizes:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {PRODUCT_PACKS.map((pack) => (
                        <button
                          key={pack.id}
                          onClick={() => setSelectedPackId(pack.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedPackId === pack.id
                              ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                          }`}
                        >
                          <span className={`text-xs font-bold block ${selectedPackId === pack.id ? 'text-amber-300' : 'text-stone-900'}`}>
                            {pack.weight.split(' ')[0]}
                          </span>
                          <span className="text-[11px] truncate block opacity-90">
                            {pack.id === 'pack-1kg' ? 'Household' : pack.id === 'pack-2kg' ? 'Family' : pack.id === 'pack-5kg' ? 'Caterer' : 'Bulk Sack'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pack Key Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <div>
                      <span className="text-[11px] text-stone-500 font-medium block">Servings per Pack</span>
                      <span className="text-base font-bold text-stone-900">~{selectedPack.servings} Servings</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-stone-500 font-medium block">SKU Code</span>
                      <span className="text-base font-bold text-stone-900">{selectedPack.sku}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[11px] text-stone-500 font-medium block">Shelf Life</span>
                      <span className="text-base font-bold text-emerald-800">18 Months</span>
                    </div>
                  </div>

                  {/* Recommended Kitchen Applications */}
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                      Ideal Culinary Applications:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPack.bestFor.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-700 shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick CTAs */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={onFindRetailer}
                      className="px-5 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                    >
                      Find Retail Stockists
                    </button>
                    <button
                      onClick={onOpenDistributor}
                      className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm rounded-xl transition-colors"
                    >
                      Request Wholesale Quote
                    </button>
                    <button
                      onClick={onGoToRecipes}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 underline underline-offset-4 ml-auto"
                    >
                      <span>View Tuwo Recipes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Nutritional Facts */}
          {activeTab === 'nutrition' && (
            <div className="p-6 sm:p-10">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                      Official Nutritional Information
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm">
                      Standard Reference per 100g serving | Values certified by NAFDAC compliant lab analysis
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
                      0% Gluten
                    </span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-md">
                      Iron Fortified
                    </span>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden border border-stone-200 rounded-xl">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-stone-100 text-stone-700 text-xs uppercase font-bold">
                      <tr>
                        <th className="py-3 px-4">Nutrient Element</th>
                        <th className="py-3 px-4">Amount per 100g</th>
                        <th className="py-3 px-4 text-right">% Daily Value*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
                      {NUTRITION_FACTS.map((fact, idx) => (
                        <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                          <td className="py-2.5 px-4 font-semibold text-stone-800">{fact.nutrient}</td>
                          <td className="py-2.5 px-4 text-stone-600 font-mono">{fact.amountPer100g}</td>
                          <td className="py-2.5 px-4 text-right font-medium text-emerald-800">{fact.dailyValuePercentage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 bg-stone-50 rounded-lg text-xs text-stone-500 leading-relaxed">
                  *Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs. Contains zero cholesterol, zero trans fat, zero artificial preservatives.
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive 12-Min Preparation Guide */}
          {activeTab === 'prepGuide' && (
            <div className="p-6 sm:p-10">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Culinary Masterclass
                  </span>
                  <h3 className="text-2xl font-bold text-stone-900 font-serif mt-1">
                    How to Make Lump-Free Tuwo Shinkafa in 12 Minutes
                  </h3>
                  <p className="text-stone-600 text-sm mt-1">
                    Follow Sapphire’s proven 4-step technique for supple, cloud-soft swallow every single time.
                  </p>
                </div>

                {/* Step Navigation Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                  {prepSteps.map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setActivePrepStep(s.step)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        activePrepStep === s.step
                          ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                          : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${activePrepStep === s.step ? 'text-amber-300' : 'text-emerald-700'}`}>
                          Step 0{s.step}
                        </span>
                        <span className="text-[10px] opacity-80">{s.time}</span>
                      </div>
                      <span className="text-xs font-bold block truncate">{s.title}</span>
                    </button>
                  ))}
                </div>

                {/* Active Step Card */}
                {(() => {
                  const curr = prepSteps.find((s) => s.step === activePrepStep)!;
                  return (
                    <div className="bg-gradient-to-br from-emerald-50/60 to-amber-50/30 rounded-2xl p-6 sm:p-8 border border-emerald-200/80">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 bg-emerald-700 text-white text-xs font-bold rounded-lg">
                          Step {curr.step} of 4 • {curr.badge}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-stone-600 bg-white px-2.5 py-1 rounded-md border border-stone-200">
                          <Clock className="w-3.5 h-3.5 text-amber-600" /> Duration: {curr.time}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-stone-900 font-serif mb-3">
                        {curr.title}
                      </h4>
                      <p className="text-stone-700 text-base leading-relaxed mb-6">
                        {curr.description}
                      </p>

                      <div className="bg-white p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                        <ChefHat className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-amber-900 block">Chef’s Pro-Tip:</span>
                          <p className="text-xs text-stone-600 mt-0.5">{curr.secret}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <button
                          disabled={activePrepStep === 1}
                          onClick={() => setActivePrepStep((prev) => Math.max(1, prev - 1))}
                          className={`px-4 py-2 text-xs font-semibold rounded-lg ${
                            activePrepStep === 1
                              ? 'text-stone-400 bg-stone-100 cursor-not-allowed'
                              : 'text-stone-700 bg-white border border-stone-300 hover:bg-stone-50'
                          }`}
                        >
                          &larr; Previous Step
                        </button>
                        <button
                          onClick={() => {
                            if (activePrepStep < 4) {
                              setActivePrepStep((prev) => prev + 1);
                            } else {
                              onGoToRecipes();
                            }
                          }}
                          className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
                        >
                          {activePrepStep === 4 ? 'Explore Full Recipe Kitchen →' : 'Next Step →'}
                        </button>
                      </div>
                    </div>
                  );
                })()}

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
