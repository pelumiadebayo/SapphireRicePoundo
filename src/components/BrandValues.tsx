import React from 'react';
import { Wheat, Sparkles, ShieldCheck, HeartHandshake, Check, ChevronRight } from 'lucide-react';

interface BrandValuesProps {
  onLearnQuality: () => void;
}

export const BrandValues: React.FC<BrandValuesProps> = ({ onLearnQuality }) => {
  const pillars = [
    {
      icon: Wheat,
      title: 'Direct Paddy Sourcing',
      subtitle: 'Premium Long-Grain Harvest',
      description: 'We partner directly with sustainable rice farming clusters across the river basins. Only mature, pristine whole paddy grains are selected for milling.',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      tag: 'Farm Direct',
    },
    {
      icon: Sparkles,
      title: 'Ultra-Fine Micronized Milling',
      subtitle: 'Zero Lumps Guaranteed',
      description: 'State-of-the-art multi-stage cool roller mills reduce whole grains into velvet-fine flour that disperses seamlessly in water without stubborn clumps.',
      color: 'bg-amber-50 text-amber-900 border-amber-200',
      tag: 'Micro-Mesh Tech',
    },
    {
      icon: ShieldCheck,
      title: '100% Naturally Gluten-Free',
      subtitle: 'Zero Additives or Fillers',
      description: 'Never mixed with cheap cassava starch, wheat flour, or chemical bleaches. Guaranteed stomach-friendly, hypoallergenic, and celiac-safe.',
      color: 'bg-blue-50 text-blue-900 border-blue-200',
      tag: 'Pure & Clean',
    },
    {
      icon: HeartHandshake,
      title: 'Universal Soup Compatibility',
      subtitle: 'Pairs with Any Nigerian Soup',
      description: 'Engineered to create its own velvety, elastic swallow that pairs effortlessly with rich soups — from leafy Efo Riro and Afang to draw soups like Ogbono and hearty Egusi.',
      color: 'bg-stone-100 text-stone-900 border-stone-300',
      tag: 'Soup Pairing',
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold text-emerald-700 tracking-widest uppercase mb-2">
            The Sapphire Foods Difference
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 font-serif">
            Why West African Families & Chefs Choose Sapphire
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Inspired by highest industrial standards of quality, hygiene, and wholesome nutrition.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200/90 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${pillar.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mb-3">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center text-xs font-medium text-stone-500 group-hover:text-emerald-700">
                  <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  <span>NAFDAC Regulated Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Banner Link */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold font-serif">Have questions about our hygienic packaging & purity?</h4>
            <p className="text-emerald-200 text-sm">
              Discover how Sapphire Rice Flour goes from sustainable river basin paddies directly to your pantry.
            </p>
          </div>
          <button
            onClick={onLearnQuality}
            className="shrink-0 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <span>Explore Farm to Plate</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
