import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  onOpenDistributor: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenDistributor }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase mb-2 block flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-700" /> Consumer & Culinary Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Everything you need to know about cooking with Sapphire Rice Flour, storage, and health benefits.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen ? 'bg-emerald-50/40 border-emerald-300 shadow-2xs' : 'bg-white border-stone-200'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-base font-serif"
                >
                  <span className="flex-1">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform shrink-0 ${
                      isOpen ? 'bg-emerald-800 text-white rotate-180' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-stone-700 text-sm leading-relaxed border-t border-emerald-100 pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Card */}
        <div className="mt-12 bg-stone-50 rounded-2xl p-6 border border-stone-200 text-center sm:flex sm:items-center sm:justify-between sm:text-left gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-stone-900 font-serif">Have a commercial or custom query?</h4>
            <p className="text-xs text-stone-600">
              Our quality assurance food scientists and sales managers are ready to assist you.
            </p>
          </div>
          <button
            onClick={onOpenDistributor}
            className="mt-4 sm:mt-0 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 transition-colors"
          >
            Contact Sapphire Commercial Desk
          </button>
        </div>

      </div>
    </section>
  );
};
