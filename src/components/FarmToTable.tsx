import React from 'react';
import { Sprout, Factory, CheckCircle2, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const FarmToTable: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Farmer Partnerships & Ethical Sourcing',
      subtitle: 'Sustainable River Basin Paddies',
      description: 'We collaborate with over 2,500 smallholder rice farming families, providing agronomic training, premium certified seed stock, and guaranteed fair purchase prices.',
      icon: Sprout,
    },
    {
      step: '02',
      title: 'Multi-Stage Destoning & Laser Sorting',
      subtitle: 'Zero Sand, Pebbles or Husk',
      description: 'Before milling, every grain passes through high-velocity gravity destoners and optical RGB color sorters that inspect every single rice kernel.',
      icon: CheckCircle2,
    },
    {
      step: '03',
      title: 'Cool-Roller Micronized Milling',
      subtitle: 'Preserving Natural Nutrients',
      description: 'Using European-grade stainless roller mills calibrated to maintain sub-ambient temperatures, we mill to micro-mesh consistency without burning vital starch bonds.',
      icon: Factory,
    },
    {
      step: '04',
      title: 'Automated Hermetic Packaging',
      subtitle: 'Untouched by Human Hands',
      description: 'Packaged in a sterile clean-room facility into our signature moisture-barrier pouches, heat-sealed instantly to lock in farm-fresh aroma for 18 months.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="quality" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8">
            <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase mb-2 block">
              The Sapphire Quality Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
              From Fertile River Basin Paddies to Your Dining Table
            </h2>
            <p className="mt-3 text-stone-600 text-base leading-relaxed">
              At Sapphire Foods, we believe true food security and nourishment starts by honoring the land, respecting local farmers, and applying world-class industrial hygiene to every package of rice flour.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
            <div className="bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-200 flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-700" />
              <div>
                <span className="text-xs font-bold text-emerald-950 block">NAFDAC Certified</span>
                <span className="text-[11px] text-emerald-700">Reg No: 01-9482L</span>
              </div>
            </div>
            <div className="bg-amber-50 px-4 py-3 rounded-2xl border border-amber-200 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-700" />
              <div>
                <span className="text-xs font-bold text-amber-950 block">ISO 22000 Ready</span>
                <span className="text-[11px] text-amber-700">HACCP Food Safety</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 relative flex flex-col justify-between group hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold font-serif text-emerald-800/40 group-hover:text-emerald-800 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-800 shadow-2xs group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mb-1 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-200/60 text-[11px] font-semibold text-stone-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Strict Quality Control Point</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Story Card */}
        <div className="mt-12 bg-gradient-to-r from-stone-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Community & Sustainability Commitment
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
              Championing Local Rice Farmers Across the Nation
            </h4>
            <p className="text-stone-300 text-sm leading-relaxed">
              By purchasing Sapphire Rice Flour, you directly empower indigenous agrarian families, boost domestic grain production, and reduce reliance on imported food starches. Every pouch carries the pride of our harvest.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0 w-full sm:w-auto text-center">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15">
              <span className="text-2xl font-extrabold text-amber-300 font-serif">2,500+</span>
              <span className="block text-[11px] text-stone-300 mt-0.5">Partner Farmers</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15">
              <span className="text-2xl font-extrabold text-emerald-300 font-serif">100%</span>
              <span className="block text-[11px] text-stone-300 mt-0.5">Locally Sourced</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
