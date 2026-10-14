import React from 'react';
import { Sparkles, Heart, ArrowRight, Dices, Music } from 'lucide-react';
import { IMG_HERO_VANITY } from '../data/blogData';

interface Y2KHeroProps {
  onExploreClick: () => void;
  onGRWMClick: () => void;
  onLipSpinnerClick: () => void;
  onOpenAudioPlayer: () => void;
}

export const Y2KHero: React.FC<Y2KHeroProps> = ({
  onExploreClick,
  onGRWMClick,
  onLipSpinnerClick,
  onOpenAudioPlayer
}) => {
  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-10 xl:px-16 bg-gradient-to-b from-[#FFE4EE] via-[#FFF0F5] to-[#FFF0F5] border-b-3 border-[#FF2A85]">
      
      {/* Decorative floating cute doodles & sparkles in background */}
      <div className="absolute top-4 left-6 text-2xl sm:text-3xl select-none pointer-events-none animate-sparkle">✨</div>
      <div className="absolute top-12 right-10 text-2xl sm:text-3xl select-none pointer-events-none animate-bounce">💖</div>
      <div className="absolute bottom-8 left-12 text-2xl sm:text-3xl select-none pointer-events-none">🎀</div>
      <div className="absolute bottom-16 right-16 text-2xl sm:text-3xl select-none pointer-events-none animate-sparkle">⭐</div>

      <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
        
        {/* Left Column: Energetic Gen Z Beauty Intro */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          
          {/* Cute Sticker Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#FF2A85] text-[#FF1493] text-xs font-black shadow-sticker-sm">
            <span className="text-sm">🌸</span>
            <span>NO BORING MAKEUP ALLOWED</span>
            <span className="text-yellow-400">✨</span>
          </div>

          {/* Main Playful Headline */}
          <h1 className="font-bubbly text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FF1493] leading-[1.08] tracking-tight">
            Glowy Skin, Juicy Lips & Zero Gatekeeping! <span className="inline-block hover:rotate-12 transition-transform">💄</span>
          </h1>

          {/* Warm, Relatable Teen Intro */}
          <p className="text-base sm:text-lg text-stone-700 font-body leading-relaxed max-w-xl">
            Hey besties! I’m <strong>Allie (19)</strong> 🎀 — your internet big sister who spends 90% of her allowance on strawberry blush, shiny lip oils, and finding drugstore dupes so you don’t waste your money. Welcome to my personal vanity diary! 💕✨
          </p>

          {/* Fun Quick Vanity Stats Badges */}
          <div className="flex flex-wrap gap-2 pt-1 font-body text-xs font-bold text-[#854D0E]">
            <div className="bg-[#FEF08A] border-2 border-yellow-400 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <span>💋 37 Lip Oils Owned</span>
            </div>
            <div className="bg-[#E9D5FF] border-2 border-purple-400 text-purple-900 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <span>🍓 100% Unfiltered Reviews</span>
            </div>
            <div className="bg-[#BAE6FD] border-2 border-sky-400 text-sky-900 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <span>✨ Glazed Pop Princess Vibes</span>
            </div>
            <button
              onClick={onOpenAudioPlayer}
              className="bg-[#DCFCE7] border-2 border-emerald-400 text-emerald-900 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 hover:bg-emerald-200 transition-colors cursor-pointer"
            >
              <Music className="w-3.5 h-3.5 text-emerald-600" />
              <span>🎵 Play Full Vanity Tunes</span>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white font-bubbly font-bold text-sm shadow-sticker hover:scale-104 transition-all cursor-pointer"
            >
              <span>Explore Makeup & Articles 💖</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGRWMClick}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-pink-50 text-[#FF2A85] font-bubbly font-bold text-sm border-2 border-[#FF2A85] shadow-sticker-sm hover:scale-103 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Watch My GRWM Routine ✨</span>
            </button>

            <button
              onClick={onLipSpinnerClick}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full bg-[#FEF08A] hover:bg-yellow-300 text-stone-900 font-bold text-xs border-2 border-amber-400 shadow-sticker-sm cursor-pointer"
            >
              <Dices className="w-4 h-4 text-[#FF2A85]" />
              <span>Spin Lip Combo 💋</span>
            </button>
          </div>

        </div>

        {/* Right Column: Cute Polaroid Vanity Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative rotate-2 hover:rotate-0 transition-transform duration-300">
            
            {/* Cute Tape Sticker at Top */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#FEF08A]/90 backdrop-blur-xs border border-yellow-400/80 -rotate-2 z-20 shadow-xs flex items-center justify-center text-[10px] font-handwriting font-bold text-stone-700 tracking-wider">
              ALLIE'S VANITY 🎀
            </div>

            {/* Polaroid Container */}
            <div className="bg-white p-4 pb-8 rounded-sm shadow-sticker border-3 border-pink-200 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-pink-100 border-2 border-pink-100">
                <img
                  src={IMG_HERO_VANITY}
                  alt="Allie's Makeup Vanity Table"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating cute stickers inside photo */}
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span>💗 bedroom vanity tour</span>
                </div>
              </div>

              {/* Handwritten Polaroid Caption */}
              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="font-handwriting text-2xl text-[#FF1493] font-bold block leading-none">
                    "My happy place 💄✨"
                  </span>
                  <span className="text-[11px] font-body text-stone-400 block mt-1">
                    Lip oils, glitter & fairy lights
                  </span>
                </div>
                <div className="text-2xl animate-pulse">
                  🎀
                </div>
              </div>
            </div>

            {/* Corner Decorative Heart Sticker */}
            <div className="absolute -bottom-3 -left-3 bg-[#FF2A85] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white shadow-sticker-sm -rotate-12">
              💖
            </div>

            <div className="absolute -top-4 -right-3 bg-[#A855F7] text-white px-2.5 py-1 rounded-full text-xs font-bold border-2 border-white shadow-sticker-sm rotate-12">
              SLAYS! 🔥
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
