import React from 'react';
import { Sparkles, Dices, Trash2, Wand2, RotateCcw } from 'lucide-react';
import { CardStickerId } from '../types/cardStickers';
import { Y2K_CARD_STICKERS } from '../data/cardStickersData';

interface StickerToolbarProps {
  onToggleStickerForAll: (stickerId: CardStickerId) => void;
  onRandomizeAll: () => void;
  onClearAll: () => void;
  onResetDefaults: () => void;
  activeStickerCounts: Record<CardStickerId, number>;
  totalDecoratedCards: number;
  totalCards: number;
}

export const StickerToolbar: React.FC<StickerToolbarProps> = ({
  onToggleStickerForAll,
  onRandomizeAll,
  onClearAll,
  onResetDefaults,
  activeStickerCounts,
  totalDecoratedCards,
  totalCards,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-xs rounded-3xl border-3 border-[#FF2A85] p-3.5 sm:p-4 shadow-sticker space-y-3 select-none">
      
      {/* Top Row: Title, Stats & Global Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-pink-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎨</span>
          <div>
            <h3 className="font-bubbly text-xs sm:text-sm font-bold text-[#FF1493] flex items-center gap-1.5">
              <span>Y2K DIGITAL STICKER VAULT</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-current animate-pulse" />
            </h3>
            <p className="text-[11px] font-body text-stone-500">
              Tap any sticker to toggle across diary cards, or click the <Sparkles className="w-3 h-3 inline text-[#FF2A85]" /> icon on any card to style it individually!
            </p>
          </div>
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onRandomizeAll}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FEF08A] hover:bg-yellow-200 text-[#854D0E] font-bubbly font-bold text-[11px] border border-yellow-400 shadow-xs hover:scale-104 transition-all cursor-pointer"
            title="Randomize digital stickers across all diary cards"
          >
            <Dices className="w-3 h-3" />
            <span>Glam All Cards 🎲</span>
          </button>

          <button
            onClick={onResetDefaults}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-[#FF1493] font-bubbly font-bold text-[11px] border border-pink-200 shadow-xs hover:scale-104 transition-all cursor-pointer"
            title="Reset to default cute sticker arrangements"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset 🎀</span>
          </button>

          {totalDecoratedCards > 0 && (
            <button
              onClick={onClearAll}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bubbly font-bold text-[11px] border border-rose-200 shadow-xs hover:scale-104 transition-all cursor-pointer"
              title="Remove stickers from all cards"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear 🧼</span>
            </button>
          )}
        </div>
      </div>

      {/* Stickers Quick Tray */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {Y2K_CARD_STICKERS.map((item) => {
          const count = activeStickerCounts[item.id] || 0;
          const isActiveOnAll = count === totalCards && totalCards > 0;

          return (
            <button
              key={item.id}
              onClick={() => onToggleStickerForAll(item.id)}
              className={`p-2 sm:p-2.5 rounded-2xl border-2 transition-all flex items-center gap-2.5 cursor-pointer text-left group ${
                count > 0
                  ? 'bg-[#FFF0F5] border-[#FF2A85] shadow-xs hover:scale-103'
                  : 'bg-white border-pink-200 hover:border-pink-300 hover:bg-pink-50/60'
              }`}
              title={`Click to toggle ${item.name} on all cards (${count} cards currently have this)`}
            >
              {/* Sticker Thumbnail */}
              <div className="relative w-10 h-10 rounded-xl bg-white border border-pink-300 p-0.5 shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Name & Count */}
              <div className="min-w-0 flex-1">
                <div className="font-bubbly text-xs font-bold text-[#2D1226] truncate group-hover:text-[#FF1493]">
                  {item.name}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-stone-500 font-mono mt-0.5">
                  <span className={`px-1.5 py-0.2 rounded-full font-bold ${
                    count > 0 ? 'bg-[#FF2A85] text-white' : 'bg-pink-100 text-[#FF2A85]'
                  }`}>
                    {count}/{totalCards}
                  </span>
                  <span className="text-[9px] text-stone-400">
                    {isActiveOnAll ? 'On all' : count > 0 ? 'Active' : '+ Add all'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
