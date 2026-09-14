import React from 'react';
import { ShieldCheck, Heart, Zap, Sparkles, Check, X, AlertCircle } from 'lucide-react';

export const HealthAndNutrition: React.FC = () => {
  const comparisonItems = [
    {
      metric: 'Cooking Time',
      sapphire: '12 Minutes (Effortless)',
      traditionalPounded: '90 - 120 Minutes (Heavy)',
      wheatSemolina: '15 - 20 Minutes',
      winner: true,
    },
    {
      metric: 'Gluten Content',
      sapphire: '0% Naturally Gluten-Free',
      traditionalPounded: '0% Gluten-Free',
      wheatSemolina: 'Contains High Gluten',
      winner: true,
    },
    {
      metric: 'Lump Formation Risk',
      sapphire: 'Near Zero (Micronized Mesh)',
      traditionalPounded: 'Frequent Rice Clumps',
      wheatSemolina: 'Prone to Gluey Lumps',
      winner: true,
    },
    {
      metric: 'Digestibility & Gut Feel',
      sapphire: 'Gentle, Light, Non-Bloating',
      traditionalPounded: 'Very Heavy on Stomach',
      wheatSemolina: 'Can cause heavy fatigue',
      winner: true,
    },
    {
      metric: 'Frying Oil Absorption',
      sapphire: '50% Lower Oil Uptake',
      traditionalPounded: 'Not suitable for frying',
      wheatSemolina: 'High Oil Absorption',
      winner: true,
    },
    {
      metric: 'Essential Fortification',
      sapphire: 'Fortified with Iron & Vitamin B1',
      traditionalPounded: 'Lost in boiling wash',
      wheatSemolina: 'Variable',
      winner: true,
    },
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: '100% Celiac & Allergy Safe',
      description: 'Zero wheat, rye, or barley contamination. Perfect for children, adults with IBS, and health-conscious eaters.',
    },
    {
      icon: Heart,
      title: 'Cardio & Blood Sugar Friendly',
      description: 'Contains zero cholesterol, zero trans fat, and provides clean complex carbohydrates with steady energy burn.',
    },
    {
      icon: Zap,
      title: 'Rapid Starch Hydration',
      description: 'Micronized milling allows rice starch granules to swell instantly, producing a supple swallow without sticky gumminess.',
    },
    {
      icon: Sparkles,
      title: 'Easy on Sensitive Stomachs',
      description: 'Unlike heavy pounded yam or cassava garri, rice flour digests cleanly without post-meal fatigue or acid reflux.',
    },
  ];

  return (
    <section id="nutrition" className="py-16 sm:py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase mb-2 block">
            Nutritional Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
            Wholesome Goodness in Every Single Grain
          </h2>
          <p className="mt-3 text-stone-600 text-base">
            Modern families need nutrition that tastes deeply familiar without the heavy digestive toll of unprocessed starches.
          </p>
        </div>

        {/* 4 Health Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs hover:border-emerald-300 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2 font-serif">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-900 to-emerald-950 text-white">
            <h3 className="text-xl sm:text-2xl font-bold font-serif">
              How Sapphire Outperforms Conventional Staples
            </h3>
            <p className="text-emerald-200 text-xs sm:text-sm mt-1">
              Scientific side-by-side comparison across cooking speed, digestive health, and preparation consistency.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-100/80 text-stone-700 text-xs uppercase font-bold border-b border-stone-200">
                <tr>
                  <th className="py-4 px-6">Nutritional & Cooking Attribute</th>
                  <th className="py-4 px-6 bg-emerald-50 text-emerald-900 font-extrabold">
                    ★ Sapphire Rice Flour (1kg)
                  </th>
                  <th className="py-4 px-6 text-stone-600">Raw Rice (Traditional Pounding)</th>
                  <th className="py-4 px-6 text-stone-600">Wheat / Semolina Swallow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-stone-800">
                      {item.metric}
                    </td>
                    <td className="py-4 px-6 bg-emerald-50/50 font-bold text-emerald-900">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item.sapphire}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      <span>{item.traditionalPounded}</span>
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      <span>{item.wheatSemolina}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
            Certified safe for weaning infants from 12+ months, elderly dietary diets, and athletes seeking lean complex carbohydrates.
          </div>
        </div>

      </div>
    </section>
  );
};
