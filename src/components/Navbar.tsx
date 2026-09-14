import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, PhoneCall, ChevronRight, Sparkles, MapPin, Award } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenDistributor: () => void;
  onOpenStockist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenDistributor, onOpenStockist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'The Sapphire Pack', id: 'product' },
    { name: 'Recipe Kitchen', id: 'recipes' },
    { name: 'Nutrition & Health', id: 'nutrition' },
    { name: 'Farm to Plate', id: 'quality' },
    { name: 'Where to Buy', id: 'stockists' },
    { name: 'B2B Distribution', id: 'distributors' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> 100% Naturally Gluten-Free
            </span>
            <span className="hidden sm:inline">Sapphire Rice Flour Mix (1kg) — Silky Lump-Free Swallow for Nigeria's Iconic Soups</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200 text-[11px]">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Certified Quality Assured
            </span>
            <button
              onClick={onOpenDistributor}
              className="text-amber-300 hover:text-amber-200 underline font-semibold transition-colors"
            >
              Distributor Hotline: +234 (0) 800 727 7447
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200 py-3'
            : 'bg-white border-b border-stone-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-left group"
            id="brand-logo-btn"
          >
            <BrandLogo size="md" withText theme="light" allowUpload />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-stone-700 hover:text-emerald-700 font-medium text-sm transition-colors relative py-1 hover:font-semibold"
                id={`nav-link-${link.id}`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenStockist}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              id="header-stockist-btn"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Find Retailer</span>
            </button>
            <button
              onClick={onOpenDistributor}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
              id="header-b2b-btn"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Wholesale / Order</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenStockist}
              className="p-2 text-emerald-800 bg-emerald-50 rounded-lg sm:hidden"
              aria-label="Find Retailer"
            >
              <MapPin className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="w-full text-left px-3 py-2.5 text-base font-medium text-stone-800 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              ))}
            </div>
            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStockist();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <MapPin className="w-4 h-4" /> Find Stores Near Me
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDistributor();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-emerald-700 rounded-lg shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" /> Become a Distributor / Bulk Order
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
