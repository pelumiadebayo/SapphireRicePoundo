import React, { useState } from 'react';
import { ShoppingBag, Truck, Award, Calculator, CheckCircle2, Send, PhoneCall, Mail } from 'lucide-react';

export const DistributorPortal: React.FC = () => {
  const [packSize, setPackSize] = useState<'1kg' | '2kg' | '5kg' | '25kg'>('1kg');
  const [cartons, setCartons] = useState<number>(50);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    state: 'Lagos',
    channel: 'Supermarket Chain',
    notes: '',
  });

  // Base price estimations per carton (in NGN Naira or generic currency)
  const cartonConfigs = {
    '1kg': { unitsPerCarton: 24, basePricePerCarton: 24000, label: '1kg Pouch (24 pcs / carton)' },
    '2kg': { unitsPerCarton: 12, basePricePerCarton: 23500, label: '2kg Family (12 pcs / carton)' },
    '5kg': { unitsPerCarton: 4, basePricePerCarton: 19500, label: '5kg Catering (4 pcs / carton)' },
    '25kg': { unitsPerCarton: 1, basePricePerCarton: 23000, label: '25kg Commercial (1 sack)' },
  };

  const selectedConfig = cartonConfigs[packSize];

  // Tier calculation
  let discountPct = 0;
  let tierName = 'Standard Wholesale Tier';
  let shippingBenefit = 'Standard Depot Pickup / Freight Assist';

  if (cartons >= 200) {
    discountPct = 10;
    tierName = 'Tier 3: Master Regional Distributor';
    shippingBenefit = 'Free Dedicated Truck Logistics Delivery';
  } else if (cartons >= 50) {
    discountPct = 5;
    tierName = 'Tier 2: Super-Stockist Wholesale';
    shippingBenefit = 'Priority Regional Depot Loading & Marketing POS Kit';
  }

  const grossTotal = cartons * selectedConfig.basePricePerCarton;
  const discountAmount = (grossTotal * discountPct) / 100;
  const netTotal = grossTotal - discountAmount;
  const totalUnits = cartons * selectedConfig.unitsPerCarton;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="distributors" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase mb-2 block flex items-center justify-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-emerald-700" /> B2B Commercial & Trade Partnerships
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
            Become a Sapphire Foods Trade Distributor
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Join our nationwide distribution network. We supply top supermarket groups, open market wholesalers, hotel chains, and event caterers with high-margin, fast-moving rice flour staples.
          </p>
        </div>

        {/* 2-Column Layout: Left Calculator, Right Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Interactive Wholesale Volume Calculator */}
          <div className="lg:col-span-6 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-700" />
                  <span>Interactive Wholesale Estimator</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">Calculate carton pricing, tier discounts, and batch delivery</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
                Direct Mill Rates
              </span>
            </div>

            {/* Pack Size Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Select Package Specification:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['1kg', '2kg', '5kg', '25kg'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPackSize(size)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      packSize === size
                        ? 'bg-emerald-800 text-white border-emerald-900 shadow-2xs'
                        : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <span className="block text-sm">{size} Specification</span>
                    <span className={`text-[10px] block font-normal opacity-85 ${packSize === size ? 'text-amber-200' : 'text-stone-500'}`}>
                      {cartonConfigs[size].unitsPerCarton} units / carton
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Carton Quantity Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Order Volume (Cartons / Sacks):
                </label>
                <span className="text-sm font-extrabold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-md">
                  {cartons} Cartons ({totalUnits.toLocaleString()} units)
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={cartons}
                onChange={(e) => setCartons(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1.5">
                <span>10 Cartons (Min Wholesale)</span>
                <span>50 Cartons (Super-Stockist)</span>
                <span>200+ Cartons (Master)</span>
              </div>
            </div>

            {/* Calculation Breakdown Card */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Tier Status:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {tierName}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Volume Discount:</span>
                <span className="font-bold text-emerald-700">
                  {discountPct > 0 ? `${discountPct}% OFF (-₦${discountAmount.toLocaleString()})` : 'Standard Tier'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Logistics Benefit:</span>
                <span className="font-medium text-stone-800 text-right max-w-[200px] truncate">
                  {shippingBenefit}
                </span>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">Estimated Net Trade Value:</span>
                  <span className="text-xs text-stone-400">Ex-factory Mill rate</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-stone-900 font-serif">
                    ₦{netTotal.toLocaleString()}
                  </span>
                  <span className="block text-[11px] text-emerald-700 font-semibold">
                    ~₦{Math.round(netTotal / totalUnits).toLocaleString()} per unit
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-stone-500 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Dedicated delivery available across North, South-West, and South-South geopolitical zones.</span>
            </div>
          </div>

          {/* Right: Distributor Lead Submission Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-md">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 font-serif">
                  Distributor Application Received!
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.contactPerson}</strong> from <strong>{formData.businessName || 'your company'}</strong>. Our Regional Commercial Manager for <strong>{formData.state}</strong> will contact you via phone within 24 business hours with official trade price catalogs and delivery schedules.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-emerald-800 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="pb-3 border-b border-stone-100">
                  <h3 className="text-xl font-bold text-stone-900 font-serif">
                    Trade Partnership & Stockist Registration
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Fill out this form to receive our official price catalog and credit-terms brochure.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Zenith Stores Ltd"
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Alh. Ibrahim Garba"
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +234 803 000 0000"
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. orders@zenithstores.com"
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      State of Operation *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja (FCT)">Abuja (FCT)</option>
                      <option value="Kano">Kano</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="Enugu">Enugu</option>
                      <option value="Delta">Delta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Business Category *
                    </label>
                    <select
                      value={formData.channel}
                      onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="Supermarket Chain">Supermarket / Retail Chain</option>
                      <option value="Open Market Wholesaler">Open Commodity Market Wholesaler</option>
                      <option value="Hotel & Catering">Hotel, Restaurant & Event Catering</option>
                      <option value="Commercial Bakery">Commercial Bakery / Food Processor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Estimated Monthly Requirement or Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Provide details about your storage capacity or specific delivery locations..."
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Submit Trade Application for {cartons} Cartons</span>
                </button>

                <div className="pt-2 text-center text-xs text-stone-400">
                  Direct B2B Hotline: <strong className="text-stone-700">09036600814</strong> (Mon-Fri 8AM-5PM) · <a href="mailto:sales@sapphirefoods.ng" className="text-emerald-800 hover:underline">sales@sapphirefoods.ng</a>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
