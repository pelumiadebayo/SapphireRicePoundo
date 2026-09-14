import React, { useState } from 'react';
import { RECIPES } from '../data/mockData';
import { Recipe } from '../types';
import { RecipeModal } from './RecipeModal';
import { Clock, Flame, ChefHat, ArrowRight, Sparkles, Filter } from 'lucide-react';

export const RecipeKitchen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  const categories = [
    { id: 'all', label: 'All Soup Pairings' },
    { id: 'vegetable', label: 'Rich Vegetable (Efo Riro, Afang)' },
    { id: 'draw', label: 'Thick & Draw (Egusi, Ogbono)' },
    { id: 'traditional', label: 'Heritage Soups (Banga, Abula)' },
  ];

  const filteredRecipes = selectedCategory === 'all'
    ? RECIPES
    : RECIPES.filter((r) => r.category === selectedCategory);

  const featuredRecipe = RECIPES.find((r) => r.featured && r.id === 'rice-swallow-eforiro') || RECIPES[0];

  return (
    <section id="recipes" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase mb-2 block flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-emerald-600" /> Swallow & Soup Pairings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
              Sapphire Rice Swallow & Soup Pairings
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              Just like celebrated Semo swallow paired with Nigeria’s most iconic soups, Sapphire Rice Flour Mix creates its own velvety, lump-free swallow made to be eaten with sizzling Efo Riro, rich Egusi, Ogbono, Afang, and Banga.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Signature Recipe Highlight (Sapphire Rice Swallow with Efo Riro) */}
        {selectedCategory === 'all' && (
          <div className="mb-12 bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 rounded-3xl overflow-hidden shadow-xl text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Image side */}
              <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[320px]">
                <img
                  src={featuredRecipe.image}
                  alt={featuredRecipe.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 bg-amber-400 text-stone-950 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md">
                  ★ Signature Swallow Pairing
                </div>
              </div>

              {/* Content side */}
              <div className="lg:col-span-6 p-6 sm:p-10 space-y-4">
                <div className="flex items-center gap-3 text-xs text-amber-300 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Ready in {featuredRecipe.totalTime}
                  </span>
                  <span>•</span>
                  <span>{featuredRecipe.calories}</span>
                  <span>•</span>
                  <span className="text-emerald-300">100% Lump-Free Swallow</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-snug">
                  {featuredRecipe.title}
                </h3>

                <p className="text-stone-300 text-sm leading-relaxed">
                  {featuredRecipe.description}
                </p>

                {/* Micro highlight */}
                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs text-stone-200">
                  <span className="font-bold text-amber-300 block mb-0.5">Digestive Advantage:</span>
                  Unlike heavy cassava or wheat swallows that leave you tired and bloated, Sapphire Rice Swallow is pure, naturally gluten-free, and prepares in just 10 minutes!
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => setActiveRecipe(featuredRecipe)}
                    className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <span>View Step-by-Step Cooking Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-stone-800 shadow-xs">
                    {recipe.difficulty}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-emerald-900/90 text-white px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>{recipe.totalTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    {recipe.soupName || 'Sapphire Swallow Pairing'}
                  </span>
                  <h4 className="text-lg font-bold text-stone-900 font-serif leading-snug group-hover:text-emerald-800 transition-colors">
                    {recipe.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                    {recipe.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs font-semibold text-stone-600 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>{recipe.calories.split(' ')[0]} kcal</span>
                </div>
                <button
                  onClick={() => setActiveRecipe(recipe)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <span>See Recipe & Prep</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Detail Modal */}
      <RecipeModal
        recipe={activeRecipe}
        onClose={() => setActiveRecipe(null)}
      />
    </section>
  );
};
