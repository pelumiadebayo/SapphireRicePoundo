import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const CustomerStories: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase mb-2 block">
            Real Kitchen Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
            Loved in Homes, Trusted by Master Chefs
          </h2>
          <p className="mt-3 text-stone-600 text-base">
            See how Sapphire Rice Flour makes everyday cooking faster, lighter, and undeniably delicious.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                  </span>
                </div>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 font-serif">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {item.role} • {item.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-stone-400 block uppercase tracking-wider">
                    Prepared Dish:
                  </span>
                  <span className="text-xs font-bold text-emerald-900">
                    {item.dishPrepared}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
