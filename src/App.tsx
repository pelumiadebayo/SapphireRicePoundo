import React from 'react';
import { ProductImageProvider } from './context/ProductImageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandValues } from './components/BrandValues';
import { ProductShowcase } from './components/ProductShowcase';
import { RecipeKitchen } from './components/RecipeKitchen';
import { HealthAndNutrition } from './components/HealthAndNutrition';
import { FarmToTable } from './components/FarmToTable';
import { StoreLocator } from './components/StoreLocator';
import { DistributorPortal } from './components/DistributorPortal';
import { CustomerStories } from './components/CustomerStories';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDistributor = () => {
    scrollToSection('distributors');
  };

  const handleOpenStockist = () => {
    scrollToSection('stockists');
  };

  return (
    <ProductImageProvider>
      <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-emerald-700 selection:text-white">
        {/* Sticky Header & Navigation */}
        <Navbar
          onNavigate={scrollToSection}
          onOpenDistributor={handleOpenDistributor}
          onOpenStockist={handleOpenStockist}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onExploreProduct={() => scrollToSection('product')}
            onExploreRecipes={() => scrollToSection('recipes')}
            onFindRetailer={handleOpenStockist}
          />

          {/* 4 Brand Pillars (Inspired by FMN Quality Standards) */}
          <BrandValues
            onLearnQuality={() => scrollToSection('quality')}
          />

          {/* Product Showcase (1kg Packshot, Specs, Nutrition, 12-Min Tuwo Swallow Guide) */}
          <ProductShowcase
            onGoToRecipes={() => scrollToSection('recipes')}
            onOpenDistributor={handleOpenDistributor}
            onFindRetailer={handleOpenStockist}
          />

          {/* The Sapphire Recipe Kitchen (Interactive Hub with Portions & Ingredients) */}
          <RecipeKitchen />

          {/* Nutritional Superiority & Side-by-Side Comparison */}
          <HealthAndNutrition />

          {/* Farm to Table & Community Story */}
          <FarmToTable />

          {/* Where to Buy / Store Locator & E-commerce Hub */}
          <StoreLocator />

          {/* B2B Wholesale & Distributor Portal with Live Tier Estimator */}
          <DistributorPortal />

          {/* Customer Testimonials & Home Cook Reviews */}
          <CustomerStories />

          {/* Frequently Asked Questions */}
          <FAQSection
            onOpenDistributor={handleOpenDistributor}
          />
        </main>

        {/* Corporate FMCG Footer */}
        <Footer
          onNavigate={scrollToSection}
          onOpenDistributor={handleOpenDistributor}
        />
      </div>
    </ProductImageProvider>
  );
}

