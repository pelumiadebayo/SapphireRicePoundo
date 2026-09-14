import React, { useState } from 'react';
import { Recipe } from '../types';
import { X, Clock, Users, ChefHat, Check, Flame, Share2, Printer, Sparkles, Utensils } from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  if (!recipe) return null;

  const baseServings = recipe.servings;
  const currentServings = baseServings * servingMultiplier;

  const toggleIngredient = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
              Sapphire Kitchen Series
            </span>
            <span className="text-xs text-stone-500">• {recipe.difficulty}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-stone-600 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
              title="Share Recipe"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-stone-600 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
              title="Print Recipe"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Top Hero Banner */}
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {recipe.category === 'swallow' ? 'Signature Swallow' : recipe.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif leading-tight mt-1">
                {recipe.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-1">
                {recipe.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Stats Bar & Servings Scaler */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>
                  Prep: <strong>{recipe.prepTime}</strong> | Cook: <strong>{recipe.cookTime}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>{recipe.calories}</span>
              </div>
            </div>

            {/* Serving Size Scaler Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-stone-500" /> Servings:
              </span>
              <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5">
                {[0.5, 1, 2].map((mult) => (
                  <button
                    key={mult}
                    onClick={() => setServingMultiplier(mult)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                      servingMultiplier === mult
                        ? 'bg-emerald-800 text-white'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {baseServings * mult}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            {recipe.description}
          </p>

          {/* Ingredients Section */}
          <div className="border-t border-stone-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-700" />
                <span>Ingredients for {currentServings} People</span>
              </h3>
              <span className="text-xs text-stone-500">Tick items as you cook</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recipe.ingredients.map((ing, i) => {
                const numericAmount = parseFloat(ing.amount);
                const scaledAmount = !isNaN(numericAmount)
                  ? (numericAmount * servingMultiplier).toFixed(
                      Number.isInteger(numericAmount * servingMultiplier) ? 0 : 1
                    )
                  : ing.amount;

                const isChecked = checkedIngredients[ing.name];

                return (
                  <button
                    key={i}
                    onClick={() => toggleIngredient(ing.name)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300 opacity-60 line-through'
                        : ing.isKeySapphire
                        ? 'bg-emerald-50/70 border-emerald-300 font-semibold'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-emerald-700 border-emerald-700 text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-xs text-stone-800 flex-1">
                      <span className="font-bold text-emerald-900 mr-1">
                        {scaledAmount} {ing.unit}
                      </span>
                      <span>{ing.name}</span>
                      {ing.isKeySapphire && (
                        <span className="ml-2 inline-flex text-[10px] bg-emerald-200/70 text-emerald-900 font-bold px-1.5 py-0.2 rounded">
                          Key Product
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instructions Step-by-Step */}
          <div className="border-t border-stone-200 pt-6">
            <h3 className="text-lg font-bold text-stone-900 font-serif mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              <span>Step-by-Step Preparation</span>
            </h3>

            <div className="space-y-4">
              {recipe.instructions.map((ins) => (
                <div key={ins.step} className="bg-stone-50 p-4 rounded-xl border border-stone-200/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {ins.step}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900">{ins.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 ml-8 leading-relaxed">
                    {ins.text}
                  </p>
                  {ins.tip && (
                    <div className="ml-8 mt-2 text-xs text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200/60 font-medium">
                      💡 <strong>Pro-Tip:</strong> {ins.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chef's Secret & Perfect Pairing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-200 pt-6">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-1">
                ⭐ Chef’s Secret Touch
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {recipe.chefTip}
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                🍲 Perfect Soup / Beverage Pairing
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                {recipe.perfectPairing}
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            Sapphire Foods Authentic Home Culinary Series
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors"
          >
            Close Recipe
          </button>
        </div>

      </div>
    </div>
  );
};
