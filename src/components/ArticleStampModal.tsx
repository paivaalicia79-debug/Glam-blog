import React, { useState } from 'react';
import { Sparkles, X, Check, Trash2, Award } from 'lucide-react';
import { Y2K_STAMPS, StampId, UserStamp } from '../types/stamps';

interface ArticleStampModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  currentStamp?: UserStamp;
  onApplyStamp: (stampId: StampId) => void;
  onRemoveStamp: () => void;
}

export const ArticleStampModal: React.FC<ArticleStampModalProps> = ({
  isOpen,
  onClose,
  articleTitle,
  currentStamp,
  onApplyStamp,
  onRemoveStamp,
}) => {
  const [justStampedId, setJustStampedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelect = (stampId: StampId) => {
    setJustStampedId(stampId);
    onApplyStamp(stampId);
    setTimeout(() => {
      setJustStampedId(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl border-3 border-[#FF2A85] p-5 sm:p-7 shadow-sticker relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cute Sparkly Background accents */}
        <div className="absolute -top-6 -right-6 text-6xl opacity-10 select-none pointer-events-none">
          🎀
        </div>
        <div className="absolute -bottom-6 -left-6 text-6xl opacity-10 select-none pointer-events-none">
          ⭐
        </div>

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b-2 border-pink-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#FEF08A] text-[#854D0E] flex items-center justify-center text-lg border border-yellow-400 shadow-sticker-sm">
              🏷️
            </div>
            <div>
              <h3 className="font-bubbly text-lg sm:text-xl font-bold text-[#FF1493] flex items-center gap-1.5">
                <span>Stamp This Post!</span>
                <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </h3>
              <p className="text-[11px] text-stone-500 font-body line-clamp-1 max-w-xs">
                "{articleTitle}"
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-pink-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Stamp Banner if any */}
        {currentStamp && (
          <div className="mb-4 p-3 rounded-2xl bg-[#FFF0F5] border-2 border-pink-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-600 font-body">Current Stamp:</span>
              <span className="font-bubbly text-xs font-bold text-[#FF1493]">
                {Y2K_STAMPS.find((s) => s.id === currentStamp.stampId)?.name || 'Custom Stamp'}
              </span>
              <span className="text-[10px] text-stone-400 font-body">
                ({currentStamp.stampedAt})
              </span>
            </div>

            <button
              onClick={() => {
                onRemoveStamp();
                onClose();
              }}
              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-bold bg-white px-2 py-1 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Remove stamp from this article"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        )}

        {/* Stamp Options Grid */}
        <p className="text-xs text-stone-600 font-body font-bold mb-3 flex items-center gap-1">
          <span>Choose your digital Y2K seal:</span>
          <span className="text-[11px] text-stone-400 font-normal">(Saves to your diary)</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
          {Y2K_STAMPS.map((stamp) => {
            const isSelected = currentStamp?.stampId === stamp.id;
            const isJustStamped = justStampedId === stamp.id;

            return (
              <button
                key={stamp.id}
                onClick={() => handleSelect(stamp.id)}
                className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'border-[#FF2A85] bg-pink-50/70 shadow-sticker-sm scale-[1.02]'
                    : 'border-pink-200 bg-white hover:border-pink-300 hover:bg-pink-50/40 hover:scale-[1.02]'
                } ${isJustStamped ? 'scale-95 ring-4 ring-[#FF2A85]' : ''}`}
              >
                {/* Stamp Preview Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-bubbly font-black uppercase tracking-wider bg-gradient-to-r ${stamp.bgGradient} shadow-xs transition-transform group-hover:rotate-0`}
                    style={{
                      borderColor: stamp.borderColor,
                      color: stamp.textColor,
                      transform: `rotate(${stamp.rotation})`,
                    }}
                  >
                    <span>{stamp.emoji}</span>
                    <span>{stamp.badgeText}</span>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#FF2A85] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Stamp Description */}
                <div>
                  <h4 className="font-bubbly text-xs font-bold text-[#2D1226] group-hover:text-[#FF1493] transition-colors">
                    {stamp.name}
                  </h4>
                  <p className="text-[10px] text-stone-500 font-body">
                    {stamp.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-[11px] text-stone-400 font-body">
          <span>Stamps show up on the article card and header 🎀</span>
          <button
            onClick={onClose}
            className="text-stone-600 hover:text-stone-900 font-bold px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
