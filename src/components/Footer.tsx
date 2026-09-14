import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Award, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDistributor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDistributor }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="bg-emerald-950 rounded-3xl p-8 sm:p-10 border border-emerald-900/80 mb-14 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                The Sapphire Kitchen Gazette
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-snug">
                Receive Weekly Heritage Recipes & Kitchen Secrets
              </h3>
              <p className="text-stone-300 text-sm max-w-xl">
                Join 25,000+ home cooks and chefs receiving our free downloadable recipe books, swallow masterclass videos, and regional retail discount alerts.
              </p>
            </div>

            <div className="lg:col-span-5">
              {newsletterSubscribed ? (
                <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-700/60 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="text-xs font-medium text-emerald-100">
                    Welcome to the Sapphire Kitchen! Check your inbox for our <strong>Free 15-Minute Rice Swallow Recipe Guide</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3 bg-stone-900/80 border border-emerald-700/50 rounded-xl text-sm text-white placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Columns Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" withText theme="dark" allowUpload />

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Sapphire Rice Flour Mix is West Africa's benchmark in pure grain milling. Milled from sun-ripened river basin paddies, our mission is to make nutritious, authentic, lump-free swallow accessible to every household to enjoy with diverse traditional soups.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Sapphire Industrial Food Complex, Ikeja Industrial Estate, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Consumer Helpline: +234 (0) 800 727 7447 (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>inquiries@sapphirefoods.com.ng</span>
              </div>
            </div>
          </div>

          {/* Col 2: The Range */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-serif">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-emerald-400 transition-colors">
                  Sapphire Rice Flour Mix (1kg Pouch)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-emerald-400 transition-colors">
                  Family Economy Saver (2kg)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-emerald-400 transition-colors">
                  Chef & Caterer Special (5kg)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-emerald-400 transition-colors">
                  Commercial Banquet & Caterer Sack (25kg)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nutrition')} className="hover:text-emerald-400 transition-colors">
                  Nutritional Fact Sheets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Recipe Kitchen */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-serif">
              Soup Pairings
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-emerald-400 transition-colors">
                  Sapphire Swallow & Efo Riro
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-emerald-400 transition-colors">
                  Sapphire Swallow & Rich Egusi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-emerald-400 transition-colors">
                  Sapphire Swallow & Ogbono Draw
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-emerald-400 transition-colors">
                  Sapphire Swallow & Calabar Afang
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-emerald-400 transition-colors">
                  Sapphire Swallow & Delta Banga
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & B2B */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-serif">
              Trade & Governance
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={onOpenDistributor} className="text-amber-400 font-bold hover:underline">
                  Wholesale Distributor Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stockists')} className="hover:text-emerald-400 transition-colors">
                  Find Supermarket Stockists
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quality')} className="hover:text-emerald-400 transition-colors">
                  Farm to Plate Agronomy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quality')} className="hover:text-emerald-400 transition-colors">
                  Food Safety Standards (HACCP)
                </button>
              </li>
              <li>
                <button onClick={onOpenDistributor} className="hover:text-emerald-400 transition-colors">
                  Institutional & School Catering
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Quality Certifications Strip */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 border-b border-stone-800/80">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Award className="w-4 h-4" /> NAFDAC Reg. No: 01-9482L
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> 100% Gluten-Free Tested
            </span>
            <span className="flex items-center gap-1.5 text-stone-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ISO 22000 Food Safety System
            </span>
          </div>

          <div className="flex items-center gap-3 text-stone-400">
            <span>Powered by domestic sustainable agriculture</span>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Sapphire Foods Manufacturing Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Commercial Supply</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Quality Assurance Charter</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
