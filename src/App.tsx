import React, { useEffect, useState } from 'react';
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
  const [isDistributorPage, setIsDistributorPage] = useState(
    () => window.location.hash === '#distributors',
  );
  const [isStockistPage, setIsStockistPage] = useState(
    () => window.location.hash === '#stockists',
  );

  useEffect(() => {
    const handleHashChange = () => {
      setIsDistributorPage(window.location.hash === '#distributors');
      setIsStockistPage(window.location.hash === '#stockists');
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenDistributor = () => {
    window.location.hash = 'distributors';
    setIsDistributorPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'distributors') {
      handleOpenDistributor();
      return;
    }

    if (isDistributorPage || isStockistPage) {
      window.history.pushState({}, '', window.location.pathname + window.location.search);
      setIsDistributorPage(false);
      setIsStockistPage(false);
      window.setTimeout(() => scrollToSection(sectionId), 0);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStockist = () => {
    if (isDistributorPage || isStockistPage) {
      window.history.pushState({}, '', window.location.pathname + window.location.search);
      setIsDistributorPage(false);
      setIsStockistPage(false);
      window.setTimeout(() => scrollToSection('stockists'), 0);
      return;
    }

    scrollToSection('stockists');
  };

  const handleOpenStockistPage = () => {
    window.location.hash = 'stockists';
    setIsStockistPage(true);
    setIsDistributorPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {isDistributorPage ? (
            <DistributorPortal />
          ) : isStockistPage ? (
            <StoreLocator isFullPage onBackHome={handleOpenStockist} />
          ) : (
            <>
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

              {/* Product Showcase (1kg Packshot, Specs, Nutrition, 10-Min Sapphire Rice Swallow Guide) */}
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
              <StoreLocator onSeeAll={handleOpenStockistPage} />

              {/* Customer Testimonials & Home Cook Reviews */}
              <CustomerStories />

              {/* Frequently Asked Questions */}
              <FAQSection
                onOpenDistributor={handleOpenDistributor}
              />
            </>
          )}
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

