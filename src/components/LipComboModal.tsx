import React, { useState } from 'react';
import { X, Dices, Sparkles, Heart } from 'lucide-react';
import { LIP_COMBOS } from '../data/blogData';

interface LipComboModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LipComboModal: React.FC<LipComboModalProps> = ({ isOpen, onClose }) => {
  const [currentCombo, setCurrentCombo] = useState(LIP_COMBOS[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  if (!isOpen) return null;

  const handleSpin = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * LIP_COMBOS.length);
      setCurrentCombo(LIP_COMBOS[randomIndex]);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 120);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-[#FFF0F5] border-4 border-[#FF2A85] shadow-[8px_8px_0px_#FF2A85] rounded-3xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 bg-white rounded-full border border-pink-300 shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border-2 border-yellow-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DAILY LIP INSPIRATION</span>
          </div>
          <h3 className="font-bubbly text-2xl sm:text-3xl font-bold text-[#FF1493]">
            Vanity Lip Combo Generator 💄
          </h3>
          <p className="text-xs text-stone-600 font-body">
            Can’t decide what lip combo to wear today? Hit spin and let the vanity gods decide!
          </p>
        </div>

        {/* Result Card */}
        <div className={`bg-white rounded-3xl border-3 border-[#FF2A85] p-6 text-center space-y-4 shadow-sm transition-all ${isSpinning ? 'scale-98 opacity-70' : 'scale-100 opacity-100'}`}>
          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full inline-block">
            {currentCombo.vibe}
          </span>

          <h4 className="font-bubbly text-xl font-bold text-[#2D1226]">
            {currentCombo.name}
          </h4>

          <div className="space-y-2 pt-2 text-xs font-body text-left">
            <div className="bg-[#FFF0F5] p-3 rounded-2xl border border-pink-200">
              <span className="font-bold text-[#FF1493] block">Step 1 — Lip Liner:</span>
              <span className="text-stone-800 font-semibold">{currentCombo.liner}</span>
            </div>
            <div className="bg-[#FFF0F5] p-3 rounded-2xl border border-pink-200">
              <span className="font-bold text-[#A855F7] block">Step 2 — Gloss Center:</span>
              <span className="text-stone-800 font-semibold">{currentCombo.gloss}</span>
            </div>
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white font-bubbly font-bold text-sm shadow-sticker hover:scale-102 transition-all cursor-pointer disabled:opacity-50"
        >
          <Dices className="w-4 h-4 animate-spin" />
          <span>{isSpinning ? 'Spinning...' : 'Spin Another Combo! 💋'}</span>
        </button>

      </div>
    </div>
  );
};
