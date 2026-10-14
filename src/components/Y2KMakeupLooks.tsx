import React, { useState } from 'react';
import { MAKEUP_LOOKS } from '../data/blogData';
import { MakeupLook } from '../types/blog';

export const Y2KMakeupLooks: React.FC = () => {
  const [selectedLook, setSelectedLook] = useState<MakeupLook>(MAKEUP_LOOKS[0]);

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-10 xl:px-16 w-full max-w-[1720px] mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BAE6FD] text-[#0369A1] font-bubbly text-xs font-bold border-2 border-sky-400 shadow-sticker-sm">
          <span>🦋 MOODBOARD & AESTHETICS</span>
        </div>
        <h2 className="font-bubbly text-3xl sm:text-4xl font-bold text-[#FF1493]">
          Signature Aesthetic Makeup Looks ✨
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-body max-w-xl mx-auto">
          Need inspo for Friday night, school pictures, or just taking cute mirror selfies? Tap any aesthetic below to get the full step guide!
        </p>
      </div>

      {/* Looks Carousel / Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MAKEUP_LOOKS.map((look) => {
          const isSelected = selectedLook.id === look.id;

          return (
            <div
              key={look.id}
              onClick={() => setSelectedLook(look)}
              className={`rounded-3xl p-4 border-3 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#FF2A85] shadow-sticker scale-102 ring-2 ring-pink-300'
                  : 'bg-white/80 border-pink-200 hover:border-pink-300 hover:bg-white'
              }`}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-pink-100 border border-pink-200">
                <img src={look.image} alt={look.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold text-[#A855F7] bg-purple-100 px-2 py-0.5 rounded-full inline-block">
                {look.tag}
              </span>
              <h3 className="font-bubbly font-bold text-base text-[#2D1226] mt-1 line-clamp-1">
                {look.title}
              </h3>
              <p className="text-xs text-stone-500 font-body line-clamp-2 mt-1">
                {look.vibe}
              </p>
            </div>
          );
        })}
      </div>

      {/* Detailed Spotlight of Selected Look */}
      <div className="bg-white rounded-3xl border-3 border-[#FF2A85] p-6 sm:p-8 shadow-sticker">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual on Left */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-pink-300 shadow-md">
              <img
                src={selectedLook.image}
                alt={selectedLook.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#FF2A85] text-white text-xs font-bubbly font-bold px-3 py-1 rounded-full shadow-sm">
                {selectedLook.difficulty}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#2D1226] text-xs font-bold px-3 py-1 rounded-full border border-pink-200">
                ⏱️ {selectedLook.time}
              </div>
            </div>
          </div>

          {/* Details on Right */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#A855F7] uppercase tracking-wider font-body">
                {selectedLook.vibe}
              </span>
              <h3 className="font-bubbly text-2xl sm:text-3xl font-bold text-[#FF1493]">
                {selectedLook.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-body leading-relaxed">
                {selectedLook.description}
              </p>
            </div>

            {/* Products Used */}
            <div className="bg-[#FFF0F5] border-2 border-pink-200 rounded-2xl p-4 space-y-1.5">
              <span className="text-xs font-bold text-[#FF1493] block">
                Products Needed in Your Pouch 👛:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedLook.productsUsed.map((prod, i) => (
                  <span key={i} className="bg-white border border-pink-300 text-stone-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
                    💄 {prod}
                  </span>
                ))}
              </div>
            </div>

            {/* Step by step */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-stone-900 block font-body">
                How to Recreate It:
              </span>
              <div className="space-y-1.5">
                {selectedLook.stepGuide.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 font-body">
                    <span className="w-5 h-5 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly font-bold flex items-center justify-center shrink-0 text-xs border border-yellow-400">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
