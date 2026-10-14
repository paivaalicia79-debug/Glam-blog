import React, { useState } from 'react';
import { MAKEUP_TIPS } from '../data/blogData';
import { Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';

export const Y2KMakeupTips: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Base' | 'Blush' | 'Eyes' | 'Lips'>('All');

  const filtered = activeCategory === 'All' 
    ? MAKEUP_TIPS 
    : MAKEUP_TIPS.filter((t) => t.category === activeCategory);

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-10 xl:px-16 w-full max-w-[1720px] mx-auto space-y-8">
      
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border-2 border-yellow-400 shadow-sticker-sm">
          <span>💡 PRO TIPS FROM YOUR BEAUTY SIS</span>
        </div>
        <h2 className="font-bubbly text-3xl sm:text-4xl font-bold text-[#FF1493]">
          Beginner-Friendly Makeup Hacks ✨
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-body max-w-xl mx-auto">
          No 20-step contour math here! Just quick, easy tricks that actually work when you’re getting ready for school or hanging out with the girlies.
        </p>

        {/* Category Pill Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          {(['All', 'Base', 'Blush', 'Eyes', 'Lips'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bubbly font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FF2A85] text-white shadow-sticker-sm scale-105'
                  : 'bg-white text-stone-700 hover:bg-pink-100 border border-pink-200'
              }`}
            >
              {cat === 'All' ? 'All Tips 🌟' : cat === 'Base' ? 'Base Makeup 🍩' : cat === 'Blush' ? 'Blush 🍓' : cat === 'Eyes' ? 'Eyes ✨' : 'Lips 💋'}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-3xl border-3 border-[#FF2A85] p-6 shadow-sticker space-y-4 hover:translate-y-[-2px] transition-transform"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl p-2 bg-[#FFF0F5] rounded-2xl border border-pink-200">{tip.emoji}</span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#A855F7] bg-purple-100 px-2 py-0.5 rounded-full">
                    {tip.category} HACK
                  </span>
                  <h3 className="font-bubbly text-lg font-bold text-[#2D1226] mt-0.5">
                    {tip.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Quick Hack Sticker Box */}
            <div className="bg-[#FFF0F5] border-2 border-pink-200 rounded-2xl p-3 text-xs font-bold text-[#FF1493] flex items-center gap-2">
              <Lightbulb className="w-4 h-4 shrink-0 text-yellow-500" />
              <span>Quick Hack: {tip.quickHack}</span>
            </div>

            {/* The Full Explanation */}
            <p className="text-xs sm:text-sm text-stone-700 font-body leading-relaxed">
              {tip.fullTip}
            </p>

            {/* Common Mistake Alert */}
            <div className="bg-[#FEF08A]/70 border-2 border-yellow-400/80 rounded-2xl p-3 text-xs text-[#713F12] font-body flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <strong>Common mistake to avoid:</strong> {tip.commonMistake}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
