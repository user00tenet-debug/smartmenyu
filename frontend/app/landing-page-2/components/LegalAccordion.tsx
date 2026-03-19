'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { legalData } from './legalData';

const LegalAccordion = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white/50 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-softblack mb-4">
            Legal Information
          </h2>
          <div className="restaurant-divider mx-auto"></div>
          <p className="text-mutedgray max-w-lg mx-auto mt-4 text-sm">
            Everything you need to know about our service, privacy, and responsibilities.
          </p>
        </div>

        <div className="space-y-4">
          {legalData.map((item) => (
            <div 
              key={item.id} 
              className="glass rounded-2xl border border-gold-200/50 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between p-6 text-left group transition-colors hover:bg-gold-50/50"
              >
                <div>
                  <h3 className="text-xl font-heading font-semibold text-softblack group-hover:text-gold-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-mutedgray mt-1">Last Updated: {item.lastUpdated}</p>
                </div>
                <motion.div
                  animate={{ rotate: openId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gold-600"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-6 pt-0 border-t border-gold-100/50 bg-white/30">
                      <div className="prose prose-sm max-w-none text-mutedgray space-y-6 py-4">
                        {item.sections.map((section, idx) => (
                          <div key={idx} className="space-y-2">
                            <h4 className="font-semibold text-softblack text-base border-l-2 border-gold-500 pl-3">
                              {section.heading}
                            </h4>
                            <p className="leading-relaxed pl-4">
                              {section.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalAccordion;
