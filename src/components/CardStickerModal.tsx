import React, { useState } from 'react';
import { X, Sparkles, Check, Trash2, Dices, RotateCw, Wand2 } from 'lucide-react';
import { CardStickerId, PlacedSticker, StickerCorner } from '../types/cardStickers';
import { Y2K_CARD_STICKERS } from '../data/cardStickersData';
import { BlogArticle } from '../types/blog';
import { triggerY2KConfetti } from './Y2KConfettiBurst';

interface CardStickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: BlogArticle;
  stickers: PlacedSticker[];
  onSaveStickers: (articleId: string, stickers: PlacedSticker[]) => void;
}

const CORNERS: { id: StickerCorner; label: string }[] = [
  { id: 'top-left', label: 'Top Left' },
  { id: 'top-right', label: 'Top Right' },
  { id: 'bottom-left', label: 'Bottom Left' },
  { id: 'bottom-right', label: 'Bottom Right' },
];

export const CardStickerModal: React.FC<CardStickerModalProps> = ({
  isOpen,
  onClose,
  article,
  stickers,
  onSaveStickers,
}) => {
  const [activeStickers, setActiveStickers] = useState<PlacedSticker[]>(stickers || []);

  if (!isOpen) return null;

  const isStickerActive = (id: CardStickerId) => {
    return activeStickers.some((s) => s.stickerId === id);
  };

  const getStickerPlacement = (id: CardStickerId) => {
    return activeStickers.find((s) => s.stickerId === id);
  };

  const handleToggleSticker = (id: CardStickerId) => {
    setActiveStickers((prev) => {
      const exists = prev.find((s) => s.stickerId === id);
      if (exists) {
        return prev.filter((s) => s.stickerId !== id);
      } else {
        // Find default position that is not yet taken, or cycle
        const takenPositions = prev.map((s) => s.position);
        const freeCorner =
          CORNERS.find((c) => !takenPositions.includes(c.id))?.id || 'top-right';
        const defaultRotation = Math.floor(Math.random() * 24) - 12; // -12 to +12 deg
        return [...prev, { stickerId: id, position: freeCorner, rotation: defaultRotation }];
      }
    });
  };

  const handleChangePosition = (id: CardStickerId, newPosition: StickerCorner) => {
    setActiveStickers((prev) =>
      prev.map((s) => (s.stickerId === id ? { ...s, position: newPosition } : s))
    );
  };

  const handleChangeRotation = (id: CardStickerId, rotation: number) => {
    setActiveStickers((prev) =>
      prev.map((s) => (s.stickerId === id ? { ...s, rotation } : s))
    );
  };

  const handleRandomize = () => {
    const allIds: CardStickerId[] = ['flip-phone', 'butterfly', 'glitter-heart', 'chrome-star'];
    // pick 2 to 3 random stickers
    const shuffled = [...allIds].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const selected = shuffled.slice(0, count);

    const availablePositions: StickerCorner[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    const shuffledPositions = [...availablePositions].sort(() => 0.5 - Math.random());

    const newPlaced: PlacedSticker[] = selected.map((stickerId, idx) => ({
      stickerId,
      position: shuffledPositions[idx],
      rotation: Math.floor(Math.random() * 30) - 15,
    }));

    setActiveStickers(newPlaced);
    triggerY2KConfetti({ count: 40, mode: 'quiz' });
  };

  const handleClear = () => {
    setActiveStickers([]);
  };

  const handleApplyAll = () => {
    const allIds: CardStickerId[] = ['flip-phone', 'butterfly', 'glitter-heart', 'chrome-star'];
    const corners: StickerCorner[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    const all: PlacedSticker[] = allIds.map((id, i) => ({
      stickerId: id,
      position: corners[i],
      rotation: [-12, 14, -8, 10][i],
    }));
    setActiveStickers(all);
    triggerY2KConfetti({ count: 50, mode: 'quiz' });
  };

  const handleSave = () => {
    onSaveStickers(article.id, activeStickers);
    triggerY2KConfetti({ count: 50, mode: 'bookmarks' });
    onClose();
  };

  // Helper position classes for live preview
  const getPositionClasses = (position: StickerCorner) => {
    switch (position) {
      case 'top-left':
        return '-top-3 -left-3';
      case 'top-right':
        return '-top-3 -right-3';
      case 'bottom-left':
        return '-bottom-3 -left-3';
      case 'bottom-right':
      default:
        return '-bottom-3 -right-3';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white border-4 border-[#FF2A85] shadow-[8px_8px_0px_#FF2A85] rounded-3xl p-5 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 bg-pink-100 hover:bg-pink-200 rounded-full border border-pink-300 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E] font-bubbly text-xs font-bold border border-yellow-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Y2K DIGITAL STICKER VAULT</span>
          </div>
          <h3 className="font-bubbly text-2xl font-bold text-[#FF1493] leading-snug">
            Decorate Diary Card 🎨✨
          </h3>
          <p className="text-xs text-stone-600 font-body truncate">
            Card: <strong className="text-stone-900">"{article.title}"</strong>
          </p>
        </div>

        {/* Live Card Preview Box */}
        <div className="bg-[#FFF0F5] border-2 border-pink-200 rounded-2xl p-4 text-center">
          <span className="text-[11px] font-bubbly font-bold text-[#FF1493] block mb-2">
            👀 LIVE CARD PREVIEW
          </span>

          <div className="relative mx-auto max-w-[280px] sm:max-w-[320px] aspect-[16/10] rounded-2xl overflow-visible border-3 border-[#FF2A85] shadow-sticker-sm bg-white">
            {/* Background image preview */}
            <div className="w-full h-full rounded-[13px] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlaid Placed Digital Stickers */}
            {activeStickers.map((st) => {
              const stickerData = Y2K_CARD_STICKERS.find((s) => s.id === st.stickerId);
              if (!stickerData) return null;
              return (
                <div
                  key={st.stickerId}
                  style={{ transform: `rotate(${st.rotation || 0}deg)` }}
                  className={`absolute z-30 pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.28)] transition-all duration-200 ${getPositionClasses(
                    st.position
                  )}`}
                >
                  <img
                    src={stickerData.image}
                    alt={stickerData.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-sm"
                  />
                </div>
              );
            })}

            {activeStickers.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-xs rounded-[13px] text-white font-bubbly text-xs font-bold">
                Tap any sticker below to place it! 💖
              </div>
            )}
          </div>
        </div>

        {/* Quick Bulk Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-pink-100">
          <span className="text-xs font-bubbly font-bold text-stone-700">
            Choose Stickers: ({activeStickers.length}/4 Active)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleRandomize}
              className="inline-flex items-center gap-1 text-[11px] font-bubbly font-bold px-2.5 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-[#FF1493] border border-pink-300 transition-colors cursor-pointer"
              title="Randomize sticker arrangement"
            >
              <Dices className="w-3 h-3" />
              <span>Surprise Me 🎲</span>
            </button>

            <button
              onClick={handleApplyAll}
              className="inline-flex items-center gap-1 text-[11px] font-bubbly font-bold px-2.5 py-1 rounded-full bg-[#FEF08A] hover:bg-yellow-200 text-[#854D0E] border border-yellow-400 transition-colors cursor-pointer"
              title="Add all 4 stickers to this card"
            >
              <Wand2 className="w-3 h-3" />
              <span>Glam All 4 ✨</span>
            </button>

            {activeStickers.length > 0 && (
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-[11px] font-bubbly font-bold px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                title="Remove all stickers"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Sticker Cards List with Position & Tilt Controls */}
        <div className="space-y-3">
          {Y2K_CARD_STICKERS.map((item) => {
            const active = isStickerActive(item.id);
            const currentPlacement = getStickerPlacement(item.id);

            return (
              <div
                key={item.id}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  active
                    ? 'bg-[#FFF0F5] border-[#FF2A85] shadow-xs ring-2 ring-pink-200'
                    : 'bg-white border-pink-200 hover:bg-pink-50/50'
                }`}
              >
                {/* Left: Sticker Image & Title */}
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => handleToggleSticker(item.id)}
                    className="relative w-14 h-14 rounded-xl bg-white border-2 border-pink-300 shadow-sticker-sm flex items-center justify-center p-1 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                    {active && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF2A85] text-white rounded-full flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bubbly text-sm font-bold text-[#2D1226] flex items-center gap-1">
                      <span>{item.name}</span>
                      <span>{item.emoji}</span>
                    </h4>
                    <p className="text-[11px] text-stone-500 font-body">
                      {item.tagline}
                    </p>
                    <button
                      onClick={() => handleToggleSticker(item.id)}
                      className={`mt-1 text-[10px] font-bubbly font-bold px-2 py-0.5 rounded-full border cursor-pointer transition-colors ${
                        active
                          ? 'bg-[#FF2A85] text-white border-[#FF2A85]'
                          : 'bg-pink-100 text-[#FF1493] border-pink-300 hover:bg-pink-200'
                      }`}
                    >
                      {active ? 'Sticker Placed ✓' : '+ Stick on Card'}
                    </button>
                  </div>
                </div>

                {/* Right: Position & Angle controls (if active) */}
                {active && currentPlacement && (
                  <div className="flex flex-col gap-1.5 sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-pink-200">
                    {/* Corner selector pills */}
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-[10px] font-bold text-stone-500 mr-1">
                        Corner:
                      </span>
                      {CORNERS.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleChangePosition(item.id, c.id)}
                          className={`text-[9px] font-bubbly font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                            currentPlacement.position === c.id
                              ? 'bg-[#FEF08A] text-[#854D0E] border-yellow-400 shadow-xs'
                              : 'bg-white text-stone-600 border-pink-200 hover:bg-pink-100'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>

                    {/* Rotation Tilt Control */}
                    <div className="flex items-center gap-2 text-[10px] text-stone-500">
                      <RotateCw className="w-3 h-3 text-[#FF2A85]" />
                      <span>Tilt:</span>
                      <input
                        type="range"
                        min="-25"
                        max="25"
                        value={currentPlacement.rotation || 0}
                        onChange={(e) =>
                          handleChangeRotation(item.id, parseInt(e.target.value, 10))
                        }
                        className="w-20 h-1.5 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-[#FF2A85]"
                      />
                      <span className="font-mono text-[9px] w-6">
                        {currentPlacement.rotation || 0}°
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t-2 border-pink-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bubbly text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF2A85] hover:bg-[#E0176F] text-white font-bubbly text-xs font-bold shadow-sticker-sm hover:scale-104 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Sticker Layout 💖</span>
          </button>
        </div>
      </div>
    </div>
  );
};
